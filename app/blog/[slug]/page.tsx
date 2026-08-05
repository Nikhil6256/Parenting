import dbConnect from '@/lib/mongoose';
import BlogPost from '@/models/BlogPost';
import { notFound } from 'next/navigation';
import { formatDate } from '@/lib/utils';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Clock, Calendar } from 'lucide-react';
import { defaultBlogPosts } from '@/lib/blogData';

interface Props { params: { slug: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  let post: any = null;
  try {
    await dbConnect();
    post = await BlogPost.findOne({ slug: params.slug, status: 'published' }).lean();
  } catch {}
  if (!post) {
    post = defaultBlogPosts.find((p) => p.slug === params.slug);
  }
  if (!post) return { title: 'Post Not Found' };
  return { title: post.title, description: post.excerpt, openGraph: { title: post.title, description: post.excerpt, images: [post.coverImage] } };
}

export default async function BlogDetailPage({ params }: Props) {
  let post: any = null;
  try {
    await dbConnect();
    post = await BlogPost.findOne({ slug: params.slug, status: 'published' }).lean();
  } catch {}
  if (!post) {
    post = defaultBlogPosts.find((p) => p.slug === params.slug);
  }
  if (!post) notFound();

  return (
    <>
      <section className="pt-24 pb-0 bg-hero-gradient">
        <div className="container-custom max-w-3xl">
          <Link href="/blog" className="inline-flex items-center gap-1.5 text-sage-600 text-sm mb-6 hover:text-sage-700">
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>

          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags?.map((tag: string) => (
              <span key={tag} className="badge badge-green">{tag}</span>
            ))}
          </div>

          <h1 className="section-title mb-5">{post.title}</h1>

          <div className="flex items-center gap-5 text-sm text-sage-500 mb-8">
            <div className="flex items-center gap-1.5">
              <div className="w-7 h-7 bg-sage-gradient rounded-lg flex items-center justify-center text-white text-xs font-bold">R</div>
              <span>By {post.author}</span>
            </div>
            <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {formatDate(post.publishedAt || post.createdAt)}</span>
            {post.readingTime && <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {post.readingTime}m read</span>}
          </div>
        </div>
      </section>

      {/* Cover image */}
      {post.coverImage && (
        <div className="container-custom max-w-3xl mb-0 -mt-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={post.coverImage} alt={post.title} className="w-full h-64 md:h-80 object-cover rounded-2xl shadow-soft" />
        </div>
      )}

      <section className="section py-12">
        <div className="container-custom max-w-3xl">
          <article className="card p-8 md:p-10">
            <div className="prose-custom whitespace-pre-wrap">{post.content}</div>
          </article>

          {/* Author card */}
          <div className="card p-6 mt-8 flex items-center gap-4">
            <div className="w-14 h-14 bg-sage-gradient rounded-2xl flex items-center justify-center text-white text-xl font-bold flex-shrink-0">R</div>
            <div>
              <p className="font-bold text-sage-900">{post.author}</p>
              <p className="text-sage-500 text-sm">Certified Parenting Coach · Rise With Rupali</p>
              <Link href="/about" className="text-sage-600 text-sm font-medium hover:text-sage-700">Learn more →</Link>
            </div>
          </div>

          {/* Related CTA */}
          <div className="card p-6 mt-6 bg-sage-50 border border-sage-100 text-center">
            <p className="text-xl font-bold text-sage-900 mb-2" style={{ fontFamily: 'var(--font-playfair)' }}>Want to go deeper?</p>
            <p className="text-sage-600 text-sm mb-4">Explore Rupali&apos;s courses for step-by-step guidance on this and much more.</p>
            <Link href="/courses" className="btn-primary">Browse Courses →</Link>
          </div>
        </div>
      </section>
    </>
  );
}
