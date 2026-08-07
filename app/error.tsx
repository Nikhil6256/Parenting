'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const isChunkError =
    error?.name === 'ChunkLoadError' ||
    error?.message?.includes('Loading chunk') ||
    error?.message?.includes('chunk');

  useEffect(() => {
    console.error('App Error Boundary caught:', error);

    // Auto-reload on ChunkLoadError (happens when a new Vercel deployment replaces JS chunks)
    if (isChunkError && typeof window !== 'undefined') {
      const storageKey = 'last_chunk_reload';
      const lastReload = sessionStorage.getItem(storageKey);
      const now = Date.now();

      // Only auto-reload once per 10 seconds to avoid infinite reload loops
      if (!lastReload || now - parseInt(lastReload, 10) > 10000) {
        sessionStorage.setItem(storageKey, now.toString());
        window.location.reload();
      }
    }
  }, [error, isChunkError]);

  const handleReset = () => {
    if (isChunkError && typeof window !== 'undefined') {
      window.location.reload();
    } else {
      reset();
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full text-center bg-white p-8 rounded-2xl shadow-soft border border-sage-100">
        <div className="inline-flex items-center justify-center w-14 h-14 bg-red-50 text-red-500 rounded-2xl mb-4">
          <AlertCircle className="w-7 h-7" />
        </div>

        <h2 className="text-2xl font-bold text-slate-800 mb-2">
          {isChunkError ? 'New Update Available' : 'Something went wrong'}
        </h2>

        <p className="text-slate-600 text-sm mb-6 leading-relaxed">
          {isChunkError
            ? 'The app was recently updated. Please refresh to load the latest version.'
            : error.message || 'An unexpected error occurred. Please try again.'}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={handleReset}
            className="btn-primary w-full sm:w-auto px-5 py-2.5 text-sm"
          >
            <RefreshCw className="w-4 h-4" /> {isChunkError ? 'Refresh Page' : 'Try Again'}
          </button>

          <Link
            href="/"
            className="btn-ghost border border-sage-200 w-full sm:w-auto px-5 py-2.5 text-sm text-slate-700"
          >
            <Home className="w-4 h-4" /> Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
