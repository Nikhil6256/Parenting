'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface PostForm {
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: string;
  tags: string;
  status: string;
  readingTime: number;
}

export default function NewBlogPostPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit } = useForm<PostForm>({
    defaultValues: { author: 'Rupali', status: 'draft', readingTime: 5 },
  });

  const onSubmit = async (data: PostForm) => {
    setLoading(true);
    try {
      const res = await fetch('/api/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          readingTime: Number(data.readingTime),
          tags: data.tags ? data.tags.split(',').map(t => t.trim()).filter(Boolean) : [],
        }),
      });
      const json = await res.json();
      if (res.ok) {
        toast.success('Blog post created! 📝');
        router.push('/admin/blog');
      } else {
        toast.error(json.error || 'Failed to create post');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 md:p-8 max-w-3xl">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/admin/blog" className="btn-ghost text-sm p-2"><ArrowLeft className="w-4 h-4" /></Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-800" style={{ fontFamily: 'var(--font-playfair)' }}>New Blog Post</h1>
          <p className="text-slate-500 text-sm">Write and publish a new article</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="card p-6 space-y-4">
          <div>
            <label className="label">Title *</label>
            <input className="input text-lg font-semibold" placeholder="Your compelling blog title..." {...register('title', { required: true })} />
          </div>

          <div>
            <label className="label">Excerpt * <span className="text-slate-400 font-normal">(max 300 chars)</span></label>
            <textarea className="input resize-none" rows={2} maxLength={300} placeholder="1-2 sentence summary..." {...register('excerpt', { required: true })} />
          </div>

          <div>
            <label className="label">Content *</label>
            <textarea className="input resize-none font-mono text-sm" rows={16} placeholder="Write your full article here... (Markdown supported)" {...register('content', { required: true })} />
          </div>
        </div>

        <div className="card p-6 space-y-4">
          <h2 className="font-bold text-slate-700 text-sm">Post Settings</h2>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="label">Cover Image URL</label>
              <input type="url" className="input" placeholder="https://..." {...register('coverImage')} />
            </div>
            <div>
              <label className="label">Author</label>
              <input className="input" {...register('author')} />
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="label">Tags <span className="text-slate-400 font-normal">(comma separated)</span></label>
              <input className="input" placeholder="Toddlers, Emotions" {...register('tags')} />
            </div>
            <div>
              <label className="label">Reading Time (min)</label>
              <input type="number" min={1} className="input" {...register('readingTime')} />
            </div>
            <div>
              <label className="label">Status</label>
              <select className="input" {...register('status')}>
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex gap-3 pb-8">
          <button type="submit" disabled={loading} className="btn-primary px-8">
            {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : 'Publish Post'}
          </button>
          <Link href="/admin/blog" className="btn-secondary">Cancel</Link>
        </div>
      </form>
    </div>
  );
}
