'use client';

import { useEffect, useState, useCallback } from 'react';
import { Users, Search, Mail } from 'lucide-react';
import { formatDate, getInitials } from '@/lib/utils';

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [pagination, setPagination] = useState({ total: 0, pages: 1 });
  const [page, setPage] = useState(1);

  const fetchCustomers = useCallback((p = 1, q = search) => {
    setLoading(true);
    fetch(`/api/admin/customers?page=${p}&limit=15&search=${encodeURIComponent(q)}`)
      .then(r => r.json())
      .then(d => {
        setCustomers(d.customers || []);
        setPagination(d.pagination || { total: 0, pages: 1 });
      })
      .finally(() => setLoading(false));
  }, [search]);

  useEffect(() => { fetchCustomers(1, search); }, [fetchCustomers, search]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchCustomers(1, search);
  };

  return (
    <div className="p-6 md:p-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800" style={{ fontFamily: 'var(--font-playfair)' }}>Students</h1>
        <p className="text-slate-500 text-sm">{pagination.total} registered students</p>
      </div>

      <form onSubmit={handleSearch} className="relative mb-5">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="input pl-10 max-w-sm"
        />
      </form>

      <div className="card">
        {loading ? (
          <div className="p-10 text-center">
            <div className="w-8 h-8 border-2 border-sage-300 border-t-sage-600 rounded-full animate-spin mx-auto" />
          </div>
        ) : customers.length === 0 ? (
          <div className="p-16 text-center">
            <Users className="w-12 h-12 mx-auto text-slate-300 mb-3" />
            <p className="text-slate-500">No students found</p>
          </div>
        ) : (
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Courses Purchased</th>
                  <th>Joined</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((c: any) => (
                  <tr key={c._id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-sage-gradient rounded-xl flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                          {getInitials(c.name)}
                        </div>
                        <div>
                          <p className="font-medium text-slate-800 text-sm">{c.name}</p>
                          <p className="text-xs text-slate-400">{c.email}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="badge badge-green">{c.purchasedCourses?.length || 0} courses</span>
                    </td>
                    <td className="text-xs text-slate-400">{formatDate(c.createdAt)}</td>
                    <td>
                      <a href={`mailto:${c.email}`} className="btn-ghost text-xs py-1 px-2 gap-1">
                        <Mail className="w-3 h-3" /> Email
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {pagination.pages > 1 && (
          <div className="flex items-center justify-between p-4 border-t border-sage-50">
            <span className="text-xs text-slate-400">Page {page} of {pagination.pages}</span>
            <div className="flex gap-2">
              <button disabled={page === 1} onClick={() => { setPage(p => p-1); fetchCustomers(page-1); }} className="btn-ghost text-xs px-3 py-1.5 border border-slate-200 disabled:opacity-40">Previous</button>
              <button disabled={page === pagination.pages} onClick={() => { setPage(p => p+1); fetchCustomers(page+1); }} className="btn-ghost text-xs px-3 py-1.5 border border-slate-200 disabled:opacity-40">Next</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
