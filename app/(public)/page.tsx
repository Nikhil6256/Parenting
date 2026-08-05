import type { Metadata } from 'next';
import HeroSection from '@/components/home/HeroSection';
import AboutSnippet from '@/components/home/AboutSnippet';
import FeaturedCourses from '@/components/home/FeaturedCourses';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import FAQSection from '@/components/home/FAQSection';
import CTASection from '@/components/home/CTASection';
import StatsSection from '@/components/home/StatsSection';

export const metadata: Metadata = {
  title: 'Rise With Rupali — Parenting Coach & Online Courses',
  description: 'Empowering parents with evidence-based strategies, heartful guidance, and transformative online courses.',
};

// Revalidate every 60 seconds (ISR) — fast page load from cache
export const revalidate = 60;

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <AboutSnippet />
      <FeaturedCourses />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
    </>
  );
}
