import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/mongoose';
import Order from '@/models/Order';
import User from '@/models/User';
import Course from '@/models/Course';
import crypto from 'crypto';
import { sendPurchaseConfirmation } from '@/lib/mail';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { razorpayOrderId, razorpayPaymentId, razorpaySignature } = await req.json();

    if (!razorpayOrderId || !razorpayPaymentId || !razorpaySignature) {
      return NextResponse.json({ error: 'Missing payment fields' }, { status: 400 });
    }

    // Verify signature
    const secret = process.env.RAZORPAY_KEY_SECRET!;
    const body = `${razorpayOrderId}|${razorpayPaymentId}`;
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(body)
      .digest('hex');

    if (expectedSignature !== razorpaySignature) {
      return NextResponse.json({ error: 'Payment verification failed' }, { status: 400 });
    }

    await dbConnect();

    // Update order status
    const order = await Order.findOneAndUpdate(
      { razorpayOrderId, userId: session.user.id },
      {
        razorpayPaymentId,
        razorpaySignature,
        status: 'paid',
      },
      { new: true }
    );

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    // Grant course access
    await User.findByIdAndUpdate(session.user.id, {
      $addToSet: { purchasedCourses: order.courseId },
    });

    // Increment enrolled count
    await Course.findByIdAndUpdate(order.courseId, {
      $inc: { enrolledCount: 1 },
    });

    // Send confirmation email (non-blocking)
    const course = await Course.findById(order.courseId);
    if (course) {
      sendPurchaseConfirmation({
        to: session.user.email!,
        name: session.user.name!,
        courseName: course.title,
        amount: order.amount,
      }).catch(console.error);
    }

    return NextResponse.json({
      message: 'Payment verified successfully',
      courseId: order.courseId,
    });
  } catch (error) {
    console.error('Payment verification error:', error);
    return NextResponse.json({ error: 'Verification failed' }, { status: 500 });
  }
}
