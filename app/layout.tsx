import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import SessionWrapper from '@/components/SessionWrapper';

export const metadata: Metadata = {
  title: {
    default: 'Rise With Rupali — Parenting Coach & Online Courses',
    template: '%s | Rise With Rupali',
  },
  description:
    'Empowering parents with evidence-based strategies, heartful guidance, and transformative online courses. Join Rupali and raise confident, emotionally healthy children.',
  keywords: ['parenting coach', 'online parenting courses', 'child development', 'Rise With Rupali', 'parenting tips'],
  authors: [{ name: 'Rupali' }],
  openGraph: {
    title: 'Rise With Rupali — Parenting Coach & Online Courses',
    description: 'Empowering parents with evidence-based strategies and transformative online courses.',
    type: 'website',
    locale: 'en_IN',
    siteName: 'Rise With Rupali',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rise With Rupali',
    description: 'Parenting Coach & Online Courses',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnect to Google Fonts for faster DNS + TLS */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Load fonts with display=swap to prevent blocking render */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap"
        />
      </head>
      <body suppressHydrationWarning>
        <SessionWrapper>
          {children}
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#ffffff',
                color: '#761f3e',
                borderRadius: '12px',
                boxShadow: '0 8px 40px rgba(229,72,128,0.12)',
                padding: '12px 16px',
                fontSize: '14px',
                fontWeight: '500',
              },
              success: {
                iconTheme: { primary: '#e54880', secondary: '#fff' },
              },
              error: {
                iconTheme: { primary: '#ef4444', secondary: '#fff' },
              },
            }}
          />
        </SessionWrapper>
      </body>
    </html>
  );
}
