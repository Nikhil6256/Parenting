export function cn(...inputs: string[]) {
  return inputs.filter(Boolean).join(' ');
}

export function formatPrice(amount: number, currency = 'INR') {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(date: string | Date) {
  return new Date(date).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

export function generateSlug(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export function truncate(str: string, length: number) {
  return str.length > length ? str.slice(0, length) + '...' : str;
}

export function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function formatDuration(minutes: number) {
  if (minutes < 60) return `${minutes}m`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}

/**
 * Automatically converts any Bunny.net play URL or video GUID into a responsive iframe embed URL.
 * Example: https://player.mediadelivery.net/embed/716980/7b97e007-a52c-4597-83df-e64e4fd45319
 * Converted to: https://iframe.mediadelivery.net/embed/716980/7b97e007-a52c-4597-83df-e64e4fd45319
 */
export function formatBunnyVideoUrl(url: string, defaultLibraryId?: string): string {
  if (!url || typeof url !== 'string') return '';
  let trimmed = url.trim();
  if (!trimmed) return '';

  // Always replace player.mediadelivery.net -> iframe.mediadelivery.net
  if (trimmed.includes('player.mediadelivery.net')) {
    trimmed = trimmed.replace('player.mediadelivery.net', 'iframe.mediadelivery.net');
  }

  // Ensure /play/ is replaced with /embed/
  if (trimmed.includes('/play/')) {
    trimmed = trimmed.replace('/play/', '/embed/');
  }

  if (trimmed.includes('iframe.mediadelivery.net')) {
    return trimmed;
  }

  if (trimmed.includes('youtube.com/watch?v=')) {
    const videoId = trimmed.split('v=')[1]?.split('&')[0];
    return `https://www.youtube.com/embed/${videoId}`;
  }

  if (trimmed.includes('youtu.be/')) {
    const videoId = trimmed.split('youtu.be/')[1]?.split('?')[0];
    return `https://www.youtube.com/embed/${videoId}`;
  }

  const parts = trimmed.split('/');
  if (parts.length === 2) {
    return `https://iframe.mediadelivery.net/embed/${parts[0]}/${parts[1]}`;
  }

  const libId = defaultLibraryId || process.env.BUNNY_LIBRARY_ID || '';
  if (parts.length === 1 && libId) {
    return `https://iframe.mediadelivery.net/embed/${libId}/${trimmed}`;
  }

  return trimmed;
}
