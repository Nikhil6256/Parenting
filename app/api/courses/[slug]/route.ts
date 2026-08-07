import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/mongoose';
import Course from '@/models/Course';
import { formatBunnyVideoUrl } from '@/lib/utils';

export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const byId = searchParams.get('byId') === 'true';

    let course;
    if (byId) {
      course = await Course.findById(params.slug).lean();
    } else {
      course = await Course.findOne({ slug: params.slug }).lean();
    }

    if (!course) return NextResponse.json({ error: 'Course not found' }, { status: 404 });

    const session = await getServerSession(authOptions);
    if ((course as any).status === 'draft' && (!session || session.user.role !== 'owner')) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }

    return NextResponse.json({ course: JSON.parse(JSON.stringify(course)) });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch course' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'owner') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await req.json();
    await dbConnect();

    // Format curriculum video URLs
    if (body.curriculum && Array.isArray(body.curriculum)) {
      body.curriculum = body.curriculum.map((mod: any) => ({
        ...mod,
        lessons: (mod.lessons || []).map((lesson: any) => ({
          ...lesson,
          videoUrl: formatBunnyVideoUrl(lesson.videoUrl || ''),
        })),
      }));
    }

    // Keep thumbnail as-is if valid; clear if not a URL (UI shows emoji fallback)
    if (body.thumbnail && !body.thumbnail.startsWith('http')) {
      body.thumbnail = '';
    }

    // Recalculate totals
    let totalLessons = 0;
    let totalDuration = 0;
    for (const mod of body.curriculum || []) {
      totalLessons += mod.lessons?.length || 0;
      for (const lesson of mod.lessons || []) {
        totalDuration += Number(lesson.duration) || 0;
      }
    }

    const { searchParams } = new URL(req.url);
    const byId = searchParams.get('byId') === 'true';
    const filter = byId ? { _id: params.slug } : { slug: params.slug };

    const course = await Course.findOneAndUpdate(
      filter,
      { ...body, totalLessons, totalDuration },
      { new: true, runValidators: true }
    );

    if (!course) return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    return NextResponse.json({ course: JSON.parse(JSON.stringify(course)) });
  } catch (error: any) {
    console.error('Course update error:', error);
    return NextResponse.json({ error: error?.message || 'Failed to update course' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'owner') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    await dbConnect();
    const course = await Course.findOneAndDelete({ slug: params.slug });
    if (!course) return NextResponse.json({ error: 'Course not found' }, { status: 404 });

    return NextResponse.json({ message: 'Course deleted successfully' });
  } catch (error: any) {
    console.error('Course delete error:', error);
    return NextResponse.json({ error: error?.message || 'Failed to delete course' }, { status: 500 });
  }
}
