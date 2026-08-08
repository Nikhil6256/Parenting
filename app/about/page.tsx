import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Award, Heart, BookOpen, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Rupali',
  description: 'Learn about Rupali — parenting partner helping Indian families build stronger, happier connections.',
};

const values = [
  { icon: Heart, title: 'Compassion First', description: 'Every parent is doing their best. My approach begins with empathy, not judgment.' },
  { icon: BookOpen, title: 'Evidence-Based', description: 'All strategies are rooted in developmental understanding and practical research.' },
  { icon: Users, title: 'Cultural Sensitivity', description: 'I understand Indian family dynamics — joint families, academic pressure, and more.' },
  { icon: Award, title: 'Practical Over Perfect', description: 'Real tools for real life, not idealistic advice that only works in textbooks.' },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-16 bg-hero-gradient">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-sage-100 text-sage-700 rounded-full text-sm font-semibold mb-6">
                👋 About Your Coach
              </div>
              <h1 className="section-title mb-5">
                Hi, I&apos;m Rupali —{' '}
                <span className="gradient-text">Your Parenting Partner</span>
              </h1>
              <p className="text-sage-600 text-lg leading-relaxed mb-6">
                For 2+ years, I&apos;ve been helping families break cycles, build connection, 
                and raise children who thrive — emotionally and academically.
              </p>
              <div className="flex flex-wrap gap-3">
                {['Positive Parenting', 'Life Coaching', '2+ Years Experience'].map(cert => (
                  <span key={cert} className="badge badge-green">{cert}</span>
                ))}
              </div>
            </div>

            <div className="relative mx-auto max-w-sm">
              <div className="bg-white rounded-3xl shadow-soft-lg border border-sage-100 overflow-hidden">
                {/* Real photo of Rupali — professional shot */}
                <div className="relative w-full" style={{ aspectRatio: '3/4' }}>
                  <Image
                    src="/images/tutor/rupali-1.jpg"
                    alt="Rupali — Parenting Partner & Life Coach"
                    fill
                    priority
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                </div>
                <div className="p-5 text-center">
                  <h2 className="text-xl font-bold text-sage-900 mb-1" style={{ fontFamily: 'var(--font-playfair)' }}>Rupali</h2>
                  <p className="text-sage-600 text-sm mb-4">Parenting &amp; Life Coach</p>
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div><p className="text-2xl font-bold text-sage-700">2+</p><p className="text-xs text-sage-500">Years</p></div>
                    <div><p className="text-2xl font-bold text-sage-700">1000</p><p className="text-xs text-sage-500">Parents</p></div>
                    <div><p className="text-2xl font-bold text-sage-700">Expert</p><p className="text-xs text-sage-500">Courses</p></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* My Story */}
      <section className="section bg-white">
        <div className="container-custom max-w-4xl">
          <h2 className="section-title text-center mb-8">My Story</h2>
          <div className="prose-custom space-y-4 text-center mx-auto max-w-2xl">
            <p>Growing up in a traditional household, I saw firsthand how unspoken expectations and harsh criticism could create distance between parents and children. I realised the real change needed to happen at home.</p>
            <p>I started coaching families one-on-one. The transformation I witnessed — from yelling matches to heart-to-heart conversations — inspired me to reach more families through online courses.</p>
            <p>Today, Rise With Rupali is a community of 1000 happy parents committed to breaking old patterns and building something beautiful with their children.</p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section bg-sage-50/50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="section-title mb-4">What I Stand For</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ icon: Icon, title, description }) => (
              <div key={title} className="card p-6 text-center card-hover">
                <div className="w-12 h-12 bg-sage-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-sage-600" />
                </div>
                <h3 className="font-bold text-sage-900 mb-2">{title}</h3>
                <p className="text-sage-600 text-sm leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-sage-50">
        <div className="container-custom text-center">
          <h2 className="section-title mb-4">Ready to Start?</h2>
          <p className="section-subtitle mx-auto mb-8">
            Let&apos;s build the family life you&apos;ve always dreamed of — together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/courses" className="btn-primary">Browse All Courses</Link>
            <Link href="/contact" className="btn-secondary">Contact Us</Link>
          </div>
        </div>
      </section>
    </>
  );
}
