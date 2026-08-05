import { MetadataRoute } from 'next';
import dbConnect from '@/lib/mongoose';
import Course from '@/models/Course';
import BlogPost from '@/models/BlogPost';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXTAUTH_URL || 'https://risewithrupali.com';

  const staticPages = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 1 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/courses`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.6 },
  ];

  try {
    await dbConnect();
    const [courses, posts] = await Promise.all([
      Course.find({ status: 'published' }).select('slug updatedAt').lean(),
      BlogPost.find({ status: 'published' }).select('slug updatedAt').lean(),
    ]);

    const coursePages = courses.map((c: any) => ({
      url: `${baseUrl}/courses/${c.slug}`,
      lastModified: new Date(c.updatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }));

    const blogPages = posts.map((p: any) => ({
      url: `${baseUrl}/blog/${p.slug}`,
      lastModified: new Date(p.updatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));

    return [...staticPages, ...coursePages, ...blogPages];
  } catch {
    return staticPages;
  }
}
