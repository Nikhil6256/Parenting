import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/mongoose';
import Order from '@/models/Order';
import User from '@/models/User';
import Course from '@/models/Course';

// GET /api/admin/stats
export async function GET(_req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'owner') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    await dbConnect();

    const [
      totalCourses,
      publishedCourses,
      totalCustomers,
      totalOrders,
      paidOrders,
      revenueAgg,
      recentOrders,
    ] = await Promise.all([
      Course.countDocuments(),
      Course.countDocuments({ status: 'published' }),
      User.countDocuments({ role: 'customer' }),
      Order.countDocuments(),
      Order.countDocuments({ status: 'paid' }),
      Order.aggregate([
        { $match: { status: 'paid' } },
        { $group: { _id: null, total: { $sum: '$amount' } } },
      ]),
      Order.find({ status: 'paid' })
        .populate('userId', 'name email')
        .populate('courseId', 'title')
        .sort({ createdAt: -1 })
        .limit(5)
        .lean(),
    ]);

    const totalRevenue = revenueAgg[0]?.total || 0;

    return NextResponse.json({
      totalCourses,
      publishedCourses,
      totalCustomers,
      totalOrders,
      paidOrders,
      totalRevenue,
      recentOrders: JSON.parse(JSON.stringify(recentOrders)),
    });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}
