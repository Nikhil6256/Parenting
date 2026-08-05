'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Global Error Boundary caught:', error);
  }, [error]);

  return (
    <html lang="en">
      <body className="bg-sage-50 min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center bg-white p-8 rounded-2xl shadow-lg border border-sage-100">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Application Error</h2>
          <p className="text-slate-600 text-sm mb-6">
            A critical error occurred. Please refresh or try again.
          </p>
          <button
            onClick={() => reset()}
            className="px-6 py-2.5 bg-emerald-600 text-white font-medium rounded-xl hover:bg-emerald-700 transition"
          >
            Refresh Application
          </button>
        </div>
      </body>
    </html>
  );
}
