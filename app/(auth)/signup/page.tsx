'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { Eye, EyeOff, Leaf, Mail, Lock, User, UserPlus } from 'lucide-react';

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((d) => d.password === d.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

type FormData = z.infer<typeof schema>;

export default function SignupPage() {
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
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: data.name, email: data.email, password: data.password }),
      });

      const json = await res.json();
      if (!res.ok) {
        toast.error(json.error || 'Signup failed');
        setLoading(false);
        return;
      }

      toast.success('Account created! Signing you in... 🌱');
      const signInRes = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (signInRes?.error) {
        toast.error('Registered successfully. Please sign in.');
        window.location.href = '/login';
      } else {
        window.location.href = '/my-courses';
      }
    } catch {
      toast.error('Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="card p-8 md:p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-sage-gradient rounded-2xl shadow-soft mb-4">
              <Leaf className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-sage-900" style={{ fontFamily: 'var(--font-playfair)' }}>
              Start Your Journey
            </h1>
            <p className="text-sage-500 text-sm mt-1">Create your free account today</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name */}
            <div>
              <label className="label" htmlFor="name">Full Name</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-sage-400" />
                <input
                  id="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Your full name"
                  className={`input pl-10 ${errors.name ? 'border-red-300' : ''}`}
                  {...register('name')}
                />
              </div>
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="label" htmlFor="email">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-sage-400" />
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  className={`input pl-10 ${errors.email ? 'border-red-300' : ''}`}
                  {...register('email')}
                />
              </div>
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="label" htmlFor="password">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-sage-400" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  placeholder="Min. 6 characters"
                  className={`input pl-10 pr-10 ${errors.password ? 'border-red-300' : ''}`}
                  {...register('password')}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-sage-400">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="label" htmlFor="confirmPassword">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-sage-400" />
                <input
                  id="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  placeholder="Repeat your password"
                  className={`input pl-10 ${errors.confirmPassword ? 'border-red-300' : ''}`}
                  {...register('confirmPassword')}
                />
              </div>
              {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3 text-base mt-2 flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <UserPlus className="w-4 h-4" /> Create Account
                </>
              )}
            </button>
          </form>

          <p className="text-center text-xs text-sage-400 mt-4">
            By signing up, you agree to our{' '}
            <Link href="/terms" className="text-sage-600 hover:underline">Terms</Link> and{' '}
            <Link href="/privacy" className="text-sage-600 hover:underline">Privacy Policy</Link>
          </p>

          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-sage-100" /></div>
            <div className="relative flex justify-center"><span className="bg-white px-3 text-xs text-sage-400">already have an account?</span></div>
          </div>

          <p className="text-center text-sm">
            <Link href="/login" className="font-semibold text-sage-600 hover:text-sage-800 underline underline-offset-2">
              Sign In Instead
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
