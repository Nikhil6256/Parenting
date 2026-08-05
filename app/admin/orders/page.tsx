'use client';

import { useEffect, useState } from 'react';
import { formatPrice, formatDate } from '@/lib/utils';
import { ShoppingCart, Search } from 'lucide-react';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ total: 0, pages: 1 });

  const fetchOrders = (p = 1) => {
    setLoading(true);
    fetch(`/api/admin/orders?page=${p}&limit=15`)
      .then(r => r.json())
      .then(d => {
        setOrders(d.orders || []);
        setPagination(d.pagination || { total: 0, pages: 1 });
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => fetchOrders(page), [page]);

  const filtered = orders.filter(o =>
    o.userId?.name?.toLowerCase().includes(search.toLowerCase()) ||
    o.userId?.email?.toLowerCase().includes(search.toLowerCase()) ||
    o.courseId?.title?.toLowerCase().includes(search.toLowerCase())
  );

  const statusBadge = (status: string) => {
    const map: Record<string, string> = {
      paid: 'badge-green',
      created: 'badge-yellow',
      failed: 'badge-red',
      refunded: 'badge-blue',
    };
    return `badge ${map[status] || 'badge-yellow'}`;
  };

  return (
    <div className="p-6 md:p-8 max-w-7xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800" style={{ fontFamily: 'var(--font-playfair)' }}>Orders</h1>
          <p className="text-slate-500 text-sm">{pagination.total} total orders</p>
        </div>
      </div>

      <div className="relative mb-5">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search by name, email, or course..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="input pl-10 max-w-sm"
        />
      </div>

      <div className="card">
        {loading ? (
          <div className="p-10 text-center text-slate-400">
            <div className="w-8 h-8 border-2 border-sage-300 border-t-sage-600 rounded-full animate-spin mx-auto" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-16 text-center">
            <ShoppingCart className="w-12 h-12 mx-auto text-slate-300 mb-3" />
            <p className="text-slate-500">No orders found</p>
          </div>
        ) : (
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Course</th>
                  <th>Amount</th>
                  <th>Razorpay ID</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((order: any) => (
                  <tr key={order._id}>
                    <td>
                      <p className="font-medium text-slate-800 text-sm">{order.userId?.name || '—'}</p>
                      <p className="text-xs text-slate-400">{order.userId?.email}</p>
                    </td>
                    <td className="text-sm text-slate-700 max-w-[180px] truncate">{order.courseId?.title || '—'}</td>
                    <td className="font-semibold text-sage-700 text-sm">{formatPrice(order.amount)}</td>
                    <td className="text-xs text-slate-400 font-mono">{order.razorpayPaymentId?.slice(0, 16) || '—'}</td>
                    <td className="text-xs text-slate-400">{formatDate(order.createdAt)}</td>
                    <td><span className={statusBadge(order.status)}>{order.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {pagination.pages > 1 && (
          <div className="flex items-center justify-between p-4 border-t border-sage-50">
            <span className="text-xs text-slate-400">Page {page} of {pagination.pages}</span>
            <div className="flex gap-2">
              <button
                disabled={page === 1}
                onClick={() => setPage(p => p - 1)}
                className="btn-ghost text-xs px-3 py-1.5 border border-slate-200 disabled:opacity-40"
              >
                Previous
              </button>
              <button
                disabled={page === pagination.pages}
                onClick={() => setPage(p => p + 1)}
                className="btn-ghost text-xs px-3 py-1.5 border border-slate-200 disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
