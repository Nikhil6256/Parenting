import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/mongoose';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

const updateSchema = z.object({
  name: z.string().min(2),
  currentPassword: z.string().optional(),
  newPassword: z.string().min(6).optional().or(z.literal('')),
});

export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    const result = updateSchema.safeParse(body);
    if (!result.success) return NextResponse.json({ error: result.error.issues[0].message }, { status: 400 });

    await dbConnect();
    const user = await User.findById(session.user.id).select('+password');
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

    user.name = result.data.name;

    if (result.data.newPassword) {
      if (!result.data.currentPassword) return NextResponse.json({ error: 'Current password required' }, { status: 400 });
      const valid = await bcrypt.compare(result.data.currentPassword, user.password);
      if (!valid) return NextResponse.json({ error: 'Current password is incorrect' }, { status: 400 });
      user.password = result.data.newPassword; // pre-save hook hashes it
    }

    await user.save();
    return NextResponse.json({ message: 'Profile updated successfully' });
  } catch {
    return NextResponse.json({ error: 'Update failed' }, { status: 500 });
  }
}
