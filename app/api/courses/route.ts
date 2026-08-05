import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/mongoose';
import Course from '@/models/Course';
import { z } from 'zod';
import { generateSlug, formatBunnyVideoUrl } from '@/lib/utils';

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const category = searchParams.get('category');
    const limit = parseInt(searchParams.get('limit') || '20');

    const filter: Record<string, string> = {};
    if (status) filter.status = status;
    if (category) filter.category = category;

    // Non-admins only see published courses
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'owner') {
      filter.status = 'published';
    }

    const courses = await Course.find(filter)
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();

    return NextResponse.json({ courses: JSON.parse(JSON.stringify(courses)) });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch courses' }, { status: 500 });
  }
}

const courseSchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters'),
  description: z.string().min(5, 'Description must be at least 5 characters'),
  shortDescription: z.string().min(5, 'Short description must be at least 5 characters').max(300),
  price: z.number().min(0),
  discountPrice: z.number().optional(),
  thumbnail: z.string().optional().or(z.literal('')),
  category: z.string().default('Parenting Basics'),
  status: z.enum(['draft', 'published']).default('draft'),
  level: z.enum(['Beginner', 'Intermediate', 'Advanced']).default('Beginner'),
  language: z.string().default('English'),
  tags: z.array(z.string()).default([]),
  curriculum: z.array(z.any()).default([]),
});

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'owner') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await req.json();
    const result = courseSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ error: result.error.issues[0].message }, { status: 400 });
    }

    await dbConnect();
    const data = result.data;
    const slug = generateSlug(data.title);

    // Use provided thumbnail or leave empty — UI shows emoji fallback when empty
    const finalThumbnail = data.thumbnail?.trim() || '';

    // Process curriculum lessons: format Bunny video URLs automatically
    const formattedCurriculum = (data.curriculum || []).map((mod: any) => ({
      ...mod,
      lessons: (mod.lessons || []).map((lesson: any) => ({
        ...lesson,
        videoUrl: formatBunnyVideoUrl(lesson.videoUrl || ''),
      })),
    }));

    // Calculate totals from curriculum
    let totalLessons = 0;
    let totalDuration = 0;
    for (const mod of formattedCurriculum) {
      totalLessons += mod.lessons?.length || 0;
      for (const lesson of mod.lessons || []) {
        totalDuration += Number(lesson.duration) || 0;
      }
    }

    const course = await Course.create({
      ...data,
      thumbnail: finalThumbnail,
      curriculum: formattedCurriculum,
      slug,
      totalLessons,
      totalDuration,
    });

    return NextResponse.json({ course: JSON.parse(JSON.stringify(course)) }, { status: 201 });
  } catch (error: any) {
    if (error.code === 11000) {
      return NextResponse.json({ error: 'A course with this title already exists' }, { status: 409 });
    }
    return NextResponse.json({ error: 'Failed to create course' }, { status: 500 });
  }
}
