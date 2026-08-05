'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { Plus, Edit, Trash2, Eye, BookOpen, Search } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import type { CourseType } from '@/types';

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<CourseType[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchCourses = () => {
    fetch('/api/courses')
      .then(r => r.json())
      .then(d => setCourses(d.courses || []))
      .finally(() => setLoading(false));
  };

  useEffect(fetchCourses, []);

  const handleDelete = async (slug: string, id: string) => {
    if (!confirm('Are you sure you want to delete this course?')) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/courses/${slug}`, { method: 'DELETE' });
      if (res.ok) {
        toast.success('Course deleted');
        setCourses(prev => prev.filter(c => c._id !== id));
      } else {
        toast.error('Failed to delete course');
      }
    } finally {
      setDeletingId(null);
    }
  };

  const filtered = courses.filter(c =>
    c.title.toLowerCase().includes(search.toLowerCase()) ||
    c.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 md:p-8 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800" style={{ fontFamily: 'var(--font-playfair)' }}>Courses</h1>
          <p className="text-slate-500 text-sm">{courses.length} total courses</p>
        </div>
        <Link href="/admin/courses/new" className="btn-primary">
          <Plus className="w-4 h-4" /> New Course
        </Link>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search courses..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="input pl-10 max-w-sm"
        />
      </div>

      {loading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="card p-5 animate-pulse">
              <div className="h-32 bg-slate-200 rounded-lg mb-4" />
              <div className="h-4 bg-slate-200 rounded w-3/4 mb-2" />
              <div className="h-3 bg-slate-200 rounded w-1/2" />
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="card p-16 text-center">
          <BookOpen className="w-12 h-12 mx-auto text-slate-300 mb-3" />
          <p className="text-slate-500 font-medium">No courses found</p>
          <Link href="/admin/courses/new" className="btn-primary mt-4 inline-flex">
            Create First Course
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(course => (
            <div key={course._id} className="card p-0 overflow-hidden group">
              {/* Thumbnail */}
              <div className="h-36 bg-gradient-to-br from-sage-100 to-sage-200 relative overflow-hidden">
                {course.thumbnail && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
                )}
                {!course.thumbnail && (
                  <div className="w-full h-full flex items-center justify-center text-4xl">📚</div>
                )}
                <div className="absolute top-2 right-2 flex gap-1.5">
                  <span className={`badge ${course.status === 'published' ? 'badge-green' : 'badge-yellow'}`}>
                    {course.status}
                  </span>
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-bold text-slate-800 text-sm mb-1 line-clamp-1">{course.title}</h3>
                <p className="text-xs text-slate-500 mb-3">{course.category} · {course.level}</p>

                <div className="flex items-center justify-between mb-4">
                  <div>
                    {course.discountPrice ? (
                      <div className="flex gap-1.5 items-center">
                        <span className="font-bold text-sage-700 text-sm">{formatPrice(course.discountPrice)}</span>
                        <span className="text-xs text-slate-400 line-through">{formatPrice(course.price)}</span>
                      </div>
                    ) : (
                      <span className="font-bold text-sage-700 text-sm">{formatPrice(course.price)}</span>
                    )}
                  </div>
                  <span className="text-xs text-slate-400">{course.enrolledCount} enrolled</span>
                </div>

                <div className="flex gap-2">
                  <Link href={`/courses/${course.slug}`} className="flex-1 btn-ghost text-xs py-1.5 justify-center border border-slate-200">
                    <Eye className="w-3.5 h-3.5" /> Preview
                  </Link>
                  <Link href={`/admin/courses/${course._id}/edit`} className="flex-1 btn-ghost text-xs py-1.5 justify-center border border-slate-200">
                    <Edit className="w-3.5 h-3.5" /> Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(course.slug, course._id)}
                    disabled={deletingId === course._id}
                    className="btn-danger text-xs py-1.5 px-3"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
