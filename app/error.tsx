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
  useEffect(() => {
    console.error('App Error Boundary caught:', error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full text-center bg-white p-8 rounded-2xl shadow-soft border border-sage-100">
        <div className="inline-flex items-center justify-center w-14 h-14 bg-red-50 text-red-500 rounded-2xl mb-4">
          <AlertCircle className="w-7 h-7" />
        </div>
        
        <h2 className="text-2xl font-bold text-slate-800 mb-2">
          Something went wrong
        </h2>
        
        <p className="text-slate-600 text-sm mb-6 leading-relaxed">
          {error.message || 'An unexpected error occurred. Please try again.'}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => reset()}
            className="btn-primary w-full sm:w-auto px-5 py-2.5 text-sm"
          >
            <RefreshCw className="w-4 h-4" /> Try Again
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
