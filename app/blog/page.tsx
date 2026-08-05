import dbConnect from '@/lib/mongoose';
import BlogPost from '@/models/BlogPost';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';
import type { Metadata } from 'next';
import { defaultBlogPosts } from '@/lib/blogData';

export const metadata: Metadata = {
  title: 'Blog — Parenting Tips & Insights',
  description: 'Expert parenting tips, child development insights, and heartful stories from Rupali\'s blog.',
};

async function getPosts() {
  try {
    await dbConnect();
    const posts = await BlogPost.find({ status: 'published' }).sort({ publishedAt: -1, createdAt: -1 }).limit(20).lean();
    return JSON.parse(JSON.stringify(posts));
  } catch { return []; }
}

export default async function BlogPage() {
  const posts = await getPosts();
  const displayPosts = posts.length > 0 ? posts : defaultBlogPosts;

  return (
    <>
      <section className="pt-28 pb-12 bg-hero-gradient">
        <div className="container-custom text-center">
          <h1 className="section-title mb-4">
            Parenting Wisdom,{' '}
            <span className="gradient-text">Served with Love</span>
          </h1>
          <p className="section-subtitle mx-auto">Practical tips, honest stories, and science-backed insights for modern Indian parents.</p>
        </div>
      </section>

      <section className="section py-12">
        <div className="container-custom">
          {displayPosts.length === 0 ? (
            <div className="text-center py-20 card p-10">
              <p className="text-slate-500">Blog posts coming soon!</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayPosts.map((post: any) => (
                <article key={post._id} className="card card-hover group p-0">
                  <div className="h-44 bg-gradient-to-br from-sage-100 to-beige-100 relative overflow-hidden">
                    {post.coverImage ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-4xl opacity-50">✍️</div>
                    )}
                  </div>
                  <div className="p-5">
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {post.tags?.slice(0, 2).map((tag: string) => (
                        <span key={tag} className="badge badge-green text-xs">{tag}</span>
                      ))}
                    </div>
                    <h2 className="font-bold text-sage-900 mb-2 group-hover:text-sage-600 transition-colors leading-snug" style={{ fontFamily: 'var(--font-playfair)' }}>
                      {post.title}
                    </h2>
                    <p className="text-slate-500 text-sm line-clamp-2 mb-4">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <div className="flex items-center gap-2">
                        <span>By {post.author}</span>
                        <span>·</span>
                        <span>{post.readingTime}m read</span>
                      </div>
                      <span>{formatDate(post.publishedAt || post.createdAt)}</span>
                    </div>
                    <Link href={`/blog/${post.slug}`} className="mt-4 inline-flex items-center gap-1 text-sage-600 text-sm font-semibold hover:text-sage-700 transition-colors">
                      Read More →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
