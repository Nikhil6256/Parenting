import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import User from '@/models/User';

export async function POST(req: NextRequest) {
  try {
    const { token, password } = await req.json();

    if (!token || !password) {
      return NextResponse.json({ error: 'Token and new password are required' }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ error: 'Password must be at least 6 characters' }, { status: 400 });
    }

    await dbConnect();

    // Use findOne with lean:false so we can mutate and save
    // Fields are select:false so we must explicitly include them
    const user = await User.findOne({ resetPasswordToken: token })
      .select('+resetPasswordToken +resetPasswordExpiry +password');

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid or expired reset link. Please request a new one.' },
        { status: 400 }
      );
    }

    // Check expiry manually (more reliable than the $gt query on select:false fields)
    if (!user.resetPasswordExpiry || user.resetPasswordExpiry < new Date()) {
      return NextResponse.json(
        { error: 'Reset link has expired. Please request a new one.' },
        { status: 400 }
      );
    }

    // Set new password (pre-save hook will hash it)
    user.password = password;
    // Clear the token fields using $unset approach via direct set to null then unset
    await User.updateOne(
      { _id: user._id },
      { $unset: { resetPasswordToken: '', resetPasswordExpiry: '' } }
    );

    // Save with new password (mark as modified so the pre-save hook triggers)
    user.markModified('password');
    await user.save();

    return NextResponse.json({ message: 'Password reset successfully! You can now sign in.' });
  } catch (error: any) {
    console.error('Reset password error:', error);
    return NextResponse.json(
      { error: 'Failed to reset password. Please try again.' },
      { status: 500 }
    );
  }
}
