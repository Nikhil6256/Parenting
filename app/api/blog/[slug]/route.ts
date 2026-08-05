import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/mongoose';
import BlogPost from '@/models/BlogPost';

export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const byId = searchParams.get('byId') === 'true';
    const filter = byId ? { _id: params.slug } : { slug: params.slug };
    const post = await BlogPost.findOne(filter).lean();
    if (!post) return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    const session = await getServerSession(authOptions);
    if ((post as any).status === 'draft' && (!session || session.user.role !== 'owner')) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }
    return NextResponse.json({ post: JSON.parse(JSON.stringify(post)) });
  } catch { return NextResponse.json({ error: 'Failed' }, { status: 500 }); }
}

export async function PUT(req: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'owner') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    const body = await req.json();
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const byId = searchParams.get('byId') === 'true';
    const filter = byId ? { _id: params.slug } : { slug: params.slug };
    const post = await BlogPost.findOneAndUpdate(
      filter,
      { ...body, publishedAt: body.status === 'published' ? new Date() : undefined },
      { new: true }
    );
    if (!post) return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    return NextResponse.json({ post: JSON.parse(JSON.stringify(post)) });
  } catch { return NextResponse.json({ error: 'Failed' }, { status: 500 }); }
}

export async function DELETE(req: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'owner') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    await dbConnect();
    await BlogPost.findOneAndDelete({ slug: params.slug });
    return NextResponse.json({ message: 'Deleted' });
  } catch { return NextResponse.json({ error: 'Failed' }, { status: 500 }); }
}
