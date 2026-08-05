'use client';

import { useEffect, useState } from 'react';
import { DollarSign, BookOpen, Users, ShoppingCart } from 'lucide-react';
import { formatPrice, formatDate } from '@/lib/utils';
import Link from 'next/link';

interface Stats {
  totalRevenue: number;
  totalCourses: number;
  publishedCourses: number;
  totalCustomers: number;
  totalOrders: number;
  paidOrders: number;
  recentOrders: any[];
}

function StatCard({ icon: Icon, label, value, sub, color }: any) {
  return (
    <div className="card p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-500 font-medium mb-1">{label}</p>
          <p className="text-2xl font-bold text-slate-800">{value}</p>
          {sub && <p className="text-xs text-slate-400 mt-1">{sub}</p>}
        </div>
        <div className={`w-11 h-11 ${color} rounded-xl flex items-center justify-center flex-shrink-0`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboardClient() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/stats')
      .then(r => r.json())
      .then(d => setStats(d))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="p-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="card p-6 animate-pulse">
              <div className="h-4 bg-slate-200 rounded w-2/3 mb-3" />
              <div className="h-8 bg-slate-200 rounded w-1/2" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  const statCards = [
    {
      icon: DollarSign,
      label: 'Total Revenue',
      value: formatPrice(stats?.totalRevenue || 0),
      sub: `${stats?.paidOrders || 0} paid orders`,
      color: 'bg-sage-100 text-sage-600',
    },
    {
      icon: BookOpen,
      label: 'Total Courses',
      value: stats?.totalCourses || 0,
      sub: `${stats?.publishedCourses || 0} published`,
      color: 'bg-mist-100 text-mist-600',
    },
    {
      icon: Users,
      label: 'Total Students',
      value: stats?.totalCustomers || 0,
      sub: 'registered customers',
      color: 'bg-beige-100 text-beige-700',
    },
    {
      icon: ShoppingCart,
      label: 'Total Orders',
      value: stats?.totalOrders || 0,
      sub: `${stats?.paidOrders || 0} successful`,
      color: 'bg-blush-100 text-blush-600',
    },
  ];

  return (
    <div className="p-6 md:p-8 max-w-7xl">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800 mb-1" style={{ fontFamily: 'var(--font-playfair)' }}>
          Dashboard Overview
        </h1>
        <p className="text-slate-500 text-sm">Welcome back, Rupali! Here&apos;s what&apos;s happening.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {statCards.map((card) => (
          <StatCard key={card.label} {...card} />
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-5 mb-8">
        <Link href="/admin/courses/new" className="card p-5 hover:border-sage-200 transition-all group">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-sage-100 group-hover:bg-sage-200 rounded-xl flex items-center justify-center transition-colors">
              <BookOpen className="w-5 h-5 text-sage-600" />
            </div>
            <div>
              <p className="font-semibold text-slate-700 text-sm">New Course</p>
              <p className="text-xs text-slate-400">Create & publish</p>
            </div>
          </div>
        </Link>
        <Link href="/admin/orders" className="card p-5 hover:border-sage-200 transition-all group">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-mist-100 group-hover:bg-mist-200 rounded-xl flex items-center justify-center transition-colors">
              <ShoppingCart className="w-5 h-5 text-mist-600" />
            </div>
            <div>
              <p className="font-semibold text-slate-700 text-sm">View Orders</p>
              <p className="text-xs text-slate-400">All purchases</p>
            </div>
          </div>
        </Link>
        <Link href="/admin/customers" className="card p-5 hover:border-sage-200 transition-all group">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-beige-100 group-hover:bg-beige-200 rounded-xl flex items-center justify-center transition-colors">
              <Users className="w-5 h-5 text-beige-700" />
            </div>
            <div>
              <p className="font-semibold text-slate-700 text-sm">Students</p>
              <p className="text-xs text-slate-400">Manage all</p>
            </div>
          </div>
        </Link>
      </div>

      {/* Recent Orders */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-bold text-slate-800">Recent Orders</h2>
          <Link href="/admin/orders" className="text-sage-600 text-sm font-medium hover:text-sage-700">
            View all →
          </Link>
        </div>

        {stats?.recentOrders && stats.recentOrders.length > 0 ? (
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Course</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentOrders.map((order: any) => (
                  <tr key={order._id}>
                    <td>
                      <div>
                        <p className="font-medium text-slate-800 text-sm">{order.userId?.name || 'Unknown'}</p>
                        <p className="text-xs text-slate-400">{order.userId?.email}</p>
                      </div>
                    </td>
                    <td className="text-sm text-slate-700">{order.courseId?.title || 'N/A'}</td>
                    <td className="text-sm font-semibold text-sage-700">{formatPrice(order.amount)}</td>
                    <td className="text-xs text-slate-400">{formatDate(order.createdAt)}</td>
                    <td>
                      <span className={`badge ${order.status === 'paid' ? 'badge-green' : order.status === 'failed' ? 'badge-red' : 'badge-yellow'}`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-10 text-slate-400">
            <ShoppingCart className="w-10 h-10 mx-auto mb-2 opacity-30" />
            <p className="text-sm">No orders yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
