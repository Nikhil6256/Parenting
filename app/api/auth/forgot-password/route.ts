import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import dbConnect from '@/lib/mongoose';
import User from '@/models/User';
import { sendPasswordResetEmail } from '@/lib/mail';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    await dbConnect();
    const user = await User.findOne({ email: email.toLowerCase() }).select('+resetPasswordToken +resetPasswordExpiry');

    // Always return success to prevent email enumeration
    if (!user) {
      return NextResponse.json({ message: 'If this email exists, a reset link has been sent.' });
    }

    // Generate a secure random token
    const token = crypto.randomBytes(32).toString('hex');
    const expiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour from now

    user.resetPasswordToken = token;
    user.resetPasswordExpiry = expiry;
    await user.save();

    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
    const resetUrl = `${baseUrl}/reset-password?token=${token}`;

    await sendPasswordResetEmail({
      to: user.email,
      name: user.name,
      resetUrl,
    });

    return NextResponse.json({ message: 'Password reset email sent. Please check your inbox.' });
  } catch (error: any) {
    console.error('Forgot password error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to send reset email. Please try again.' },
      { status: 500 }
    );
  }
}
