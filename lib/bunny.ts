/**
 * Bunny.net Video Stream & Storage API helper
 * Documentation: https://docs.bunny.net/reference/bunnynet-api-overview
 */

const BUNNY_LIBRARY_ID = process.env.BUNNY_LIBRARY_ID || '';
const BUNNY_API_KEY = process.env.BUNNY_API_KEY || '';
const BUNNY_CDN_HOSTNAME = process.env.BUNNY_CDN_HOSTNAME || 'iframe.mediadelivery.net';

const BUNNY_STREAM_BASE_URL = 'https://video.bunnycdn.com';

export interface BunnyVideo {
  videoLibraryId: number;
  guid: string;
  title: string;
  dateUploaded: string;
  views: number;
  isPublic: boolean;
  length: number; // in seconds
  status: number; // 0 = Created, 1 = Uploading, 2 = Processing, 3 = Transcoding, 4 = Finished, 5 = Error
  framerate: number;
  width: number;
  height: number;
  availableResolutions?: string;
  thumbnailFileName?: string;
  averageWatchTime?: number;
  totalWatchTime?: number;
  category?: string;
}

/**
 * Creates a video entry in Bunny Stream library.
 * Returns the video object containing guid and upload authorization details.
 */
export async function createBunnyVideo(title: string, collectionId?: string): Promise<BunnyVideo> {
  if (!BUNNY_LIBRARY_ID || !BUNNY_API_KEY) {
    throw new Error('BUNNY_LIBRARY_ID and BUNNY_API_KEY must be configured in environment variables');
  }

  const url = `${BUNNY_STREAM_BASE_URL}/library/${BUNNY_LIBRARY_ID}/videos`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'AccessKey': BUNNY_API_KEY,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      title,
      collectionId: collectionId || undefined,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to create video on Bunny.net: ${response.status} ${response.statusText} - ${errorText}`);
  }

  return response.json();
}

/**
 * Uploads a video binary buffer/file to Bunny Stream library for a given video ID (guid).
 */
export async function uploadBunnyVideoFile(videoId: string, fileBuffer: Buffer | ArrayBuffer): Promise<{ success: boolean; message: string }> {
  if (!BUNNY_LIBRARY_ID || !BUNNY_API_KEY) {
    throw new Error('BUNNY_LIBRARY_ID and BUNNY_API_KEY must be configured in environment variables');
  }

  const url = `${BUNNY_STREAM_BASE_URL}/library/${BUNNY_LIBRARY_ID}/videos/${videoId}`;
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'AccessKey': BUNNY_API_KEY,
      'Content-Type': 'application/octet-stream',
    },
    body: fileBuffer as any,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to upload video to Bunny.net: ${response.status} ${response.statusText} - ${errorText}`);
  }

  return response.json();
}

/**
 * Get video details from Bunny Stream.
 */
export async function getBunnyVideo(videoId: string): Promise<BunnyVideo> {
  if (!BUNNY_LIBRARY_ID || !BUNNY_API_KEY) {
    throw new Error('BUNNY_LIBRARY_ID and BUNNY_API_KEY must be configured in environment variables');
  }

  const url = `${BUNNY_STREAM_BASE_URL}/library/${BUNNY_LIBRARY_ID}/videos/${videoId}`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'AccessKey': BUNNY_API_KEY,
      'Accept': 'application/json',
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to fetch video from Bunny.net: ${response.status} ${response.statusText} - ${errorText}`);
  }

  return response.json();
}

/**
 * List videos in Bunny Stream library.
 */
export async function listBunnyVideos(page = 1, itemsPerPage = 25, search = ''): Promise<{ items: BunnyVideo[]; totalItems: number; currentPage: number }> {
  if (!BUNNY_LIBRARY_ID || !BUNNY_API_KEY) {
    throw new Error('BUNNY_LIBRARY_ID and BUNNY_API_KEY must be configured in environment variables');
  }

  const queryParams = new URLSearchParams({
    page: page.toString(),
    itemsPerPage: itemsPerPage.toString(),
  });
  if (search) queryParams.append('search', search);

  const url = `${BUNNY_STREAM_BASE_URL}/library/${BUNNY_LIBRARY_ID}/videos?${queryParams.toString()}`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'AccessKey': BUNNY_API_KEY,
      'Accept': 'application/json',
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to list videos from Bunny.net: ${response.status} ${response.statusText} - ${errorText}`);
  }

  return response.json();
}

/**
 * Delete a video from Bunny Stream library.
 */
export async function deleteBunnyVideo(videoId: string): Promise<{ success: boolean }> {
  if (!BUNNY_LIBRARY_ID || !BUNNY_API_KEY) {
    throw new Error('BUNNY_LIBRARY_ID and BUNNY_API_KEY must be configured in environment variables');
  }

  const url = `${BUNNY_STREAM_BASE_URL}/library/${BUNNY_LIBRARY_ID}/videos/${videoId}`;
  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      'AccessKey': BUNNY_API_KEY,
      'Accept': 'application/json',
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to delete video from Bunny.net: ${response.status} ${response.statusText} - ${errorText}`);
  }

  return response.json();
}

/**
 * Formats the responsive embed iframe URL for a Bunny video.
 */
export async function getBunnyEmbedUrl(videoId: string): Promise<string> {
  const libId = BUNNY_LIBRARY_ID || 'LIBRARY_ID';
  if (BUNNY_CDN_HOSTNAME && !BUNNY_CDN_HOSTNAME.includes('iframe.mediadelivery.net')) {
    return `https://${BUNNY_CDN_HOSTNAME}/embed/${videoId}`;
  }
  return `https://iframe.mediadelivery.net/embed/${libId}/${videoId}`;
}
