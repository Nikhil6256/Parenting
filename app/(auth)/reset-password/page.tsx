'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { Leaf, Lock, Eye, EyeOff, CheckCircle } from 'lucide-react';

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!token) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500 mb-4">Invalid or missing reset link.</p>
        <Link href="/forgot-password" className="btn-primary text-sm">
          Request New Link
        </Link>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    if (password !== confirm) {
      toast.error('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || 'Failed to reset password');
      } else {
        setSuccess(true);
        toast.success('Password reset successfully!');
        setTimeout(() => router.push('/login'), 2500);
      }
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="text-center py-6">
        <div className="inline-flex items-center justify-center w-14 h-14 bg-sage-100 rounded-2xl mb-4">
          <CheckCircle className="w-7 h-7 text-sage-600" />
        </div>
        <h2 className="text-xl font-bold text-sage-900 mb-2">Password Updated!</h2>
        <p className="text-sage-500 text-sm">Redirecting you to sign in...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="label" htmlFor="password">New Password</label>
        <div className="relative">
          <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-sage-400" />
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Min. 6 characters"
            className="input pl-10 pr-10"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-sage-400 hover:text-sage-600"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <div>
        <label className="label" htmlFor="confirm">Confirm New Password</label>
        <div className="relative">
          <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-sage-400" />
          <input
            id="confirm"
            type={showPassword ? 'text' : 'password'}
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="Repeat your new password"
            className="input pl-10"
            required
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="btn-primary w-full py-3 text-base flex items-center justify-center gap-2"
      >
        {loading ? (
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          'Set New Password'
        )}
      </button>

      <p className="text-center text-sm text-sage-500">
        <Link href="/login" className="text-sage-600 hover:underline">Back to Sign In</Link>
      </p>
    </form>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="card p-8 md:p-10">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-sage-gradient rounded-2xl shadow-soft mb-4">
              <Leaf className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-sage-900" style={{ fontFamily: 'var(--font-playfair)' }}>
              Set New Password
            </h1>
            <p className="text-sage-500 text-sm mt-1">Enter your new secure password below</p>
          </div>

          <Suspense fallback={<div className="text-center py-8 text-sage-500 text-sm">Loading...</div>}>
            <ResetPasswordForm />
          </Suspense>
        </div>
        <p className="text-center text-xs text-sage-400 mt-4">🔒 Your data is secure and never shared</p>
      </div>
    </div>
  );
}
