import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import User from '@/models/User';
import { z } from 'zod';

const signupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = signupSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0].message },
        { status: 400 }
      );
    }

    const { name, email, password } = result.data;

    await dbConnect();

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return NextResponse.json(
        { error: 'An account with this email already exists' },
        { status: 409 }
      );
    }

    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase(),
      password: password,
      role: 'customer',
    });

    return NextResponse.json(
      { message: 'Account created successfully', userId: user._id.toString() },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Signup error:', error);
    const isDbError = error?.name === 'MongooseServerSelectionError' || error?.message?.includes('buffering timed out') || error?.message?.includes('connect');
    const errorMessage = isDbError
      ? 'Database connection failed. Please update MONGODB_URI in .env.local with your MongoDB password.'
      : 'Failed to create account. Please try again.';
    return NextResponse.json({ error: errorMessage }, { status: isDbError ? 503 : 500 });
  }
}
