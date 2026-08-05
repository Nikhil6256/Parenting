import Link from 'next/link';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full text-center bg-white p-8 rounded-2xl shadow-soft border border-sage-100">
        <div className="text-6xl font-extrabold text-sage-300 mb-2">404</div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Page Not Found</h2>
        <p className="text-slate-600 text-sm mb-6">
          The page you are looking for does not exist or has been moved.
        </p>
        <div className="flex justify-center gap-3">
          <Link href="/" className="btn-primary text-sm px-5 py-2.5">
            <Home className="w-4 h-4" /> Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
