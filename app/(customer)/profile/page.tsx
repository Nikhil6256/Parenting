'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { User, Lock, Save, Camera } from 'lucide-react';
import { getInitials } from '@/lib/utils';

const schema = z.object({
  name: z.string().min(2, 'Name required'),
  currentPassword: z.string().optional(),
  newPassword: z.string().optional(),
  confirmPassword: z.string().optional(),
}).refine(d => !d.newPassword || d.newPassword === d.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

type FormData = z.infer<typeof schema>;

export default function ProfilePage() {
  const { data: session, update } = useSession();
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { name: session?.user?.name || '' },
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const res = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (res.ok) {
        await update({ name: data.name });
        toast.success('Profile updated! 🌱');
      } else {
        toast.error(json.error || 'Update failed');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 md:p-8 max-w-2xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-sage-900 mb-1" style={{ fontFamily: 'var(--font-playfair)' }}>My Profile</h1>
        <p className="text-sage-500 text-sm">Manage your account details</p>
      </div>

      {/* Avatar */}
      <div className="card p-6 mb-6">
        <div className="flex items-center gap-5">
          <div className="relative">
            <div className="w-20 h-20 bg-sage-gradient rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-soft">
              {getInitials(session?.user?.name || 'U')}
            </div>
            <button className="absolute -bottom-2 -right-2 w-7 h-7 bg-white border border-sage-100 rounded-full flex items-center justify-center shadow-soft hover:bg-sage-50 transition-colors">
              <Camera className="w-3.5 h-3.5 text-sage-500" />
            </button>
          </div>
          <div>
            <p className="font-bold text-sage-900 text-lg">{session?.user?.name}</p>
            <p className="text-sage-500 text-sm">{session?.user?.email}</p>
            <span className="badge badge-green text-xs mt-1">Student</span>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Personal Info */}
        <div className="card p-6">
          <h2 className="font-bold text-slate-700 mb-4 flex items-center gap-2">
            <User className="w-4 h-4 text-sage-500" /> Personal Information
          </h2>
          <div className="space-y-4">
            <div>
              <label className="label">Full Name</label>
              <input className={`input ${errors.name ? 'border-red-300' : ''}`} {...register('name')} />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
            </div>
            <div>
              <label className="label">Email Address</label>
              <input
                type="email"
                value={session?.user?.email || ''}
                disabled
                className="input bg-sage-50 text-sage-400 cursor-not-allowed"
              />
              <p className="text-xs text-sage-400 mt-1">Email cannot be changed</p>
            </div>
          </div>
        </div>

        {/* Password Change */}
        <div className="card p-6">
          <h2 className="font-bold text-slate-700 mb-4 flex items-center gap-2">
            <Lock className="w-4 h-4 text-sage-500" /> Change Password
          </h2>
          <p className="text-sage-500 text-sm mb-4">Leave blank to keep current password</p>
          <div className="space-y-4">
            <div>
              <label className="label">Current Password</label>
              <input type="password" className="input" placeholder="••••••••" {...register('currentPassword')} />
            </div>
            <div>
              <label className="label">New Password</label>
              <input type="password" className="input" placeholder="Min. 6 characters" {...register('newPassword')} />
            </div>
            <div>
              <label className="label">Confirm New Password</label>
              <input type="password" className={`input ${errors.confirmPassword ? 'border-red-300' : ''}`} placeholder="Repeat new password" {...register('confirmPassword')} />
              {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
            </div>
          </div>
        </div>

        <button type="submit" disabled={loading} className="btn-primary">
          {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <><Save className="w-4 h-4" /> Save Changes</>}
        </button>
      </form>
    </div>
  );
}
