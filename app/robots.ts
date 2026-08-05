import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXTAUTH_URL || 'https://risewithrupali.com';
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/admin/', '/api/', '/my-courses/', '/profile/', '/checkout/'] },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
