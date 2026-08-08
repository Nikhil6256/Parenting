'use client';

import { useState, Suspense } from 'react';
import { signIn, getSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { Eye, EyeOff, Leaf, Mail, Lock, LogIn } from 'lucide-react';

const schema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(1, 'Password is required'),
});

type FormData = z.infer<typeof schema>;

function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '';
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const result = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        toast.error('Invalid email or password');
        setLoading(false);
      } else {
        toast.success('Welcome back! 🌱');
        // getSession() reads JWT cookie directly — no extra HTTP round-trip
        const session = await getSession();
        const targetPath =
          session?.user?.role === 'owner'
            ? '/admin'
            : callbackUrl && callbackUrl !== '/login'
            ? callbackUrl
            : '/my-courses';
        window.location.href = targetPath;
      }
    } catch {
      toast.error('Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Email */}
      <div>
        <label className="label" htmlFor="email">ईमेल पत्ता</label>
        <div className="relative">
          <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-sage-400" />
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            className={`input pl-10 ${errors.email ? 'border-red-300 focus:ring-red-400' : ''}`}
            {...register('email')}
          />
        </div>
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
      </div>

      {/* Password */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="label mb-0" htmlFor="password">पासवर्ड</label>
          <Link href="/forgot-password" className="text-xs text-sage-500 hover:text-sage-700">
            पासवर्ड विसरलात?
          </Link>
        </div>
        <div className="relative">
          <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-sage-400" />
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            placeholder="••••••••"
            className={`input pl-10 pr-10 ${errors.password ? 'border-red-300 focus:ring-red-400' : ''}`}
            {...register('password')}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-sage-400 hover:text-sage-600"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="btn-primary w-full py-3 text-base flex items-center justify-center gap-2"
      >
        {loading ? (
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          <>
            <LogIn className="w-4 h-4" /> लॉगिन करा
          </>
        )}
      </button>
    </form>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="card p-8 md:p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-sage-gradient rounded-2xl shadow-soft mb-4">
              <Leaf className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-sage-900" style={{ fontFamily: 'var(--font-playfair)' }}>
              पुन्हा स्वागत आहे!
            </h1>
            <p className="text-sage-500 text-sm mt-1">तुमचा शिकण्याचा प्रवास सुरू ठेवण्यासाठी लॉगिन करा</p>
          </div>

          <Suspense fallback={<div className="text-center py-8 text-sage-500 text-sm">लोड होत आहे...</div>}>
            <LoginForm />
          </Suspense>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-sage-100" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-3 text-xs text-sage-400">किंवा</span>
            </div>
          </div>

          <p className="text-center text-sm text-sage-600">
            अजून खाते नाही?{' '}
            <Link href="/signup" className="font-semibold text-sage-600 hover:text-sage-800 underline underline-offset-2">
              नवीन खाते तयार करा
            </Link>
          </p>
        </div>

        {/* Trust */}
        <p className="text-center text-xs text-sage-400 mt-4">
          🔒 तुमची माहिती १००% सुरक्षित आहे
        </p>
      </div>
    </div>
  );
}
