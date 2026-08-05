import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/mongoose';
import BlogPost from '@/models/BlogPost';
import { generateSlug } from '@/lib/utils';
import { z } from 'zod';

const postSchema = z.object({
  title: z.string().min(5),
  content: z.string().min(20),
  excerpt: z.string().min(10).max(300),
  coverImage: z.string().default(''),
  author: z.string().default('Rupali'),
  tags: z.array(z.string()).default([]),
  status: z.enum(['draft', 'published']).default('draft'),
  readingTime: z.number().optional(),
});

export async function GET(_req: NextRequest) {
  try {
    await dbConnect();
    const session = await getServerSession(authOptions);
    const isOwner = session?.user?.role === 'owner';

    const filter: Record<string, string> = {};
    if (!isOwner) filter.status = 'published';
    const posts = await BlogPost.find(filter).sort({ createdAt: -1 }).limit(50).lean();
    return NextResponse.json({ posts: JSON.parse(JSON.stringify(posts)) });
  } catch { return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 }); }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'owner') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

    const body = await req.json();
    const result = postSchema.safeParse(body);
    if (!result.success) return NextResponse.json({ error: result.error.issues[0].message }, { status: 400 });

    await dbConnect();
    const slug = generateSlug(result.data.title);
    const post = await BlogPost.create({
      ...result.data,
      slug,
      publishedAt: result.data.status === 'published' ? new Date() : undefined,
    });

    return NextResponse.json({ post: JSON.parse(JSON.stringify(post)) }, { status: 201 });
  } catch (error: any) {
    if (error.code === 11000) return NextResponse.json({ error: 'A post with this title already exists' }, { status: 409 });
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
  }
}
