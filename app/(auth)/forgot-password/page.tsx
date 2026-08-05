'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Leaf, Mail, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setSent(true);
        toast.success('Check your email for reset instructions');
      } else {
        const data = await res.json();
        toast.error(data.error || 'Failed to send reset email');
      }
    } catch {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="card p-8 md:p-10">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-sage-gradient rounded-2xl shadow-soft mb-4">
              <Leaf className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-sage-900" style={{ fontFamily: 'var(--font-playfair)' }}>
              Reset Password
            </h1>
            <p className="text-sage-500 text-sm mt-1">Enter your email and we&apos;ll send you reset instructions</p>
          </div>

          {sent ? (
            <div className="text-center">
              <div className="w-16 h-16 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-sage-600" />
              </div>
              <p className="text-sage-700 font-medium mb-2">Email Sent!</p>
              <p className="text-sage-500 text-sm mb-6">Please check your inbox and follow the link to reset your password.</p>
              <Link href="/login" className="text-sage-600 text-sm font-semibold hover:text-sage-700">
                Back to Sign In
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="label" htmlFor="email">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-sage-400" />
                  <input id="email" type="email" required value={email} onChange={e => setEmail(e.target.value)} className="input pl-10" placeholder="you@example.com" />
                </div>
              </div>
              <button type="submit" disabled={loading} className="btn-primary w-full py-3">
                {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto" /> : 'Send Reset Link'}
              </button>
            </form>
          )}

          <div className="text-center mt-6">
            <Link href="/login" className="inline-flex items-center gap-1 text-sm text-sage-600 hover:text-sage-700">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
