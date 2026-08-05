/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  poweredByHeader: false,

  // Image optimization — wildcard allows admin-entered URLs from any CDN
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' }, // any HTTPS host (admin content)
      { protocol: 'http',  hostname: 'localhost' }, // local dev
    ],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 86400, // 24 h cache for optimized images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  experimental: {
    serverComponentsExternalPackages: ['mongoose', 'bcryptjs'],
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          // Security headers
          { key: 'X-DNS-Prefetch-Control',  value: 'on' },
          { key: 'X-Content-Type-Options',  value: 'nosniff' },
          { key: 'X-Frame-Options',         value: 'SAMEORIGIN' },
          { key: 'X-XSS-Protection',        value: '1; mode=block' },
          { key: 'Referrer-Policy',         value: 'strict-origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://fonts.googleapis.com https://checkout.razorpay.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              // img-src: allow any HTTPS source (admin-managed content)
              "img-src 'self' data: blob: https:",
              "connect-src 'self' https://accounts.google.com https://api.razorpay.com",
              "frame-src https://api.razorpay.com",
              "frame-ancestors 'none'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join('; '),
          },
        ],
      },
      // Long-term cache for static assets
      {
        source: '/fonts/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        source: '/images/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        source: '/_next/static/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
    ];
  },
};

export default nextConfig;
