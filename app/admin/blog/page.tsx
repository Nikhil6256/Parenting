'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { Plus, Edit, Trash2, FileText, Search } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('/api/blog')
      .then(r => r.json())
      .then(d => setPosts(d.posts || []))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (slug: string, id: string) => {
    if (!confirm('Delete this post?')) return;
    const res = await fetch(`/api/blog/${slug}`, { method: 'DELETE' });
    if (res.ok) {
      toast.success('Post deleted');
      setPosts(prev => prev.filter(p => p._id !== id));
    } else {
      toast.error('Failed to delete');
    }
  };

  const filtered = posts.filter(p => p.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="p-6 md:p-8 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800" style={{ fontFamily: 'var(--font-playfair)' }}>Blog Posts</h1>
          <p className="text-slate-500 text-sm">{posts.length} total posts</p>
        </div>
        <Link href="/admin/blog/new" className="btn-primary">
          <Plus className="w-4 h-4" /> New Post
        </Link>
      </div>

      <div className="relative mb-5">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input type="text" placeholder="Search posts..." value={search} onChange={e => setSearch(e.target.value)} className="input pl-10 max-w-sm" />
      </div>

      <div className="card">
        {loading ? (
          <div className="p-10 text-center"><div className="w-8 h-8 border-2 border-sage-300 border-t-sage-600 rounded-full animate-spin mx-auto" /></div>
        ) : filtered.length === 0 ? (
          <div className="p-16 text-center">
            <FileText className="w-12 h-12 mx-auto text-slate-300 mb-3" />
            <p className="text-slate-500 mb-3">No posts yet</p>
            <Link href="/admin/blog/new" className="btn-primary inline-flex">Write First Post</Link>
          </div>
        ) : (
          <div className="table-container">
            <table className="table">
              <thead><tr><th>Title</th><th>Status</th><th>Date</th><th>Actions</th></tr></thead>
              <tbody>
                {filtered.map((post: any) => (
                  <tr key={post._id}>
                    <td>
                      <p className="font-medium text-slate-800 text-sm">{post.title}</p>
                      <div className="flex gap-1 mt-1">{post.tags?.slice(0,2).map((t: string) => <span key={t} className="badge badge-green text-xs">{t}</span>)}</div>
                    </td>
                    <td><span className={`badge ${post.status === 'published' ? 'badge-green' : 'badge-yellow'}`}>{post.status}</span></td>
                    <td className="text-xs text-slate-400">{formatDate(post.createdAt)}</td>
                    <td>
                      <div className="flex gap-2">
                        <Link href={`/admin/blog/${post._id}/edit`} className="btn-ghost text-xs py-1 px-2 border border-slate-200"><Edit className="w-3.5 h-3.5" /></Link>
                        <button onClick={() => handleDelete(post.slug, post._id)} className="btn-danger text-xs py-1 px-2"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
