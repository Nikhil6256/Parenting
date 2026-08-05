import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import {
  createBunnyVideo,
  uploadBunnyVideoFile,
  getBunnyVideo,
  listBunnyVideos,
  deleteBunnyVideo,
  getBunnyEmbedUrl,
} from '@/lib/bunny';

// GET /api/admin/bunny?videoId=xxx or ?page=1&search=xxx
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'owner') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const videoId = searchParams.get('videoId');

    if (videoId) {
      const video = await getBunnyVideo(videoId);
      const embedUrl = await getBunnyEmbedUrl(videoId);
      return NextResponse.json({ video, embedUrl });
    }

    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '25', 10);
    const search = searchParams.get('search') || '';

    const listData = await listBunnyVideos(page, limit, search);
    return NextResponse.json(listData);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to communicate with Bunny.net API' },
      { status: 500 }
    );
  }
}

// POST /api/admin/bunny
// Accepts JSON { title: "Lesson Name" } to create video metadata slot on Bunny.net
// OR FormData with file + title to upload binary video directly.
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'owner') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const contentType = req.headers.get('content-type') || '';

    if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData();
      const file = formData.get('file') as File | null;
      const title = (formData.get('title') as string) || file?.name || 'Untitled Video';

      if (!file) {
        return NextResponse.json({ error: 'No video file provided' }, { status: 400 });
      }

      // 1. Create video entry on Bunny
      const createdVideo = await createBunnyVideo(title);

      // 2. Upload file buffer to Bunny
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      await uploadBunnyVideoFile(createdVideo.guid, buffer);

      const embedUrl = await getBunnyEmbedUrl(createdVideo.guid);

      return NextResponse.json({
        success: true,
        videoId: createdVideo.guid,
        embedUrl,
        title: createdVideo.title,
        message: 'Video successfully uploaded to Bunny.net',
      });
    }

    // JSON body case: Create video entry slot for direct client upload
    const body = await req.json();
    const { title } = body;

    if (!title) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    }

    const video = await createBunnyVideo(title);
    const embedUrl = await getBunnyEmbedUrl(video.guid);
    const libraryId = process.env.BUNNY_LIBRARY_ID;

    return NextResponse.json({
      success: true,
      videoId: video.guid,
      libraryId,
      embedUrl,
      title: video.title,
      uploadUrl: `https://video.bunnycdn.com/library/${libraryId}/videos/${video.guid}`,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to process Bunny video operation' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/bunny?videoId=xxx
export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'owner') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const videoId = searchParams.get('videoId');

    if (!videoId) {
      return NextResponse.json({ error: 'videoId query parameter is required' }, { status: 400 });
    }

    await deleteBunnyVideo(videoId);
    return NextResponse.json({ success: true, message: `Video ${videoId} deleted successfully` });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to delete Bunny video' },
      { status: 500 }
    );
  }
}
