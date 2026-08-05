import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/mongoose';
import Course from '@/models/Course';
import Order from '@/models/Order';
import razorpay from '@/lib/razorpay';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Please sign in to continue' }, { status: 401 });
    }

    const { courseId } = await req.json();
    if (!courseId) {
      return NextResponse.json({ error: 'Course ID is required' }, { status: 400 });
    }

    await dbConnect();

    const course = await Course.findById(courseId);
    if (!course || course.status !== 'published') {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }

    // Check if already purchased
    const existingOrder = await Order.findOne({
      userId: session.user.id,
      courseId: courseId,
      status: 'paid',
    });
    if (existingOrder) {
      return NextResponse.json({ error: 'You already own this course' }, { status: 409 });
    }

    const amount = course.discountPrice || course.price;
    const amountInPaise = amount * 100;

    // Create Razorpay order server-side
    const razorpayOrder = await razorpay.orders.create({
      amount: amountInPaise,
      currency: 'INR',
      receipt: `order_${Date.now()}`,
      notes: {
        courseId: courseId,
        courseName: course.title,
        userId: session.user.id,
      },
    });

    // Save pending order to DB
    await Order.create({
      userId: session.user.id,
      courseId: courseId,
      razorpayOrderId: razorpayOrder.id,
      amount: amount,
      currency: 'INR',
      status: 'created',
    });

    return NextResponse.json({
      orderId: razorpayOrder.id,
      amount: amountInPaise,
      currency: 'INR',
      courseTitle: course.title,
      keyId: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error('Order creation error:', error);
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}
