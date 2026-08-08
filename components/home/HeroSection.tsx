'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Star, Users, BookOpen } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen bg-hero-gradient overflow-hidden flex items-center">
      {/* Decorative blobs — GPU composited (transform only, no blur-3xl + animate together) */}
      <div
        className="absolute top-20 right-10 w-64 h-64 bg-sage-200/40 rounded-full blob-anim"
        style={{ filter: 'blur(64px)' }}
      />
      <div
        className="absolute bottom-20 left-10 w-80 h-80 bg-beige-200/40 rounded-full blob-anim"
        style={{ filter: 'blur(64px)', animationDelay: '3s' }}
      />

      <div className="container-custom relative z-10 py-24 md:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text content — no opacity-0 mount trick, renders immediately */}
          <div className="animate-in">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-sage-100 text-sage-700 rounded-full text-sm font-semibold mb-6 border border-sage-200">
              <span className="w-2 h-2 bg-sage-500 rounded-full animate-pulse-soft" />
              आपली पॅरेंटिंग पार्टनर
            </div>

            <h1 className="section-title mb-6 leading-[1.15]">
              प्रेम आणि तंत्राने घडवा{' '}
              <span className="gradient-text">आनंदी व सक्षम मुले</span>
            </h1>

            <p className="text-lg text-sage-600 leading-relaxed mb-8 max-w-lg">
              रुपाली मॅडमच्या सोप्या व अत्यंत प्रभावी पॅरेंटिंग तंत्रांनी शेकडो पालकांनी आपल्या घरातील वातावरण बदलले आहे. रागाऐवजी प्रेमाने आणि विश्वासाने मुलांचे संगोपन करा.
            </p>

            {/* Social proof pills */}
            <div className="flex flex-wrap gap-3 mb-8">
              <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full shadow-soft text-xs font-medium text-sage-700 border border-sage-100">
                <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                ४.९/५ (५००+ रिव्ह्यूज)
              </div>
              <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full shadow-soft text-xs font-medium text-sage-700 border border-sage-100">
                <Users className="w-3.5 h-3.5 text-sage-500" />
                १००० सुखी पालक
              </div>
              <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full shadow-soft text-xs font-medium text-sage-700 border border-sage-100">
                <BookOpen className="w-3.5 h-3.5 text-mist-500" />
                उत्कृष्ट कोर्सेस
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/courses" className="btn-primary text-base py-3.5 px-7">
                कोर्सेस पहा <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 text-sage-700 font-semibold hover:text-sage-600 group"
                style={{ transition: 'color 150ms ease' }}
              >
                <div className="w-10 h-10 rounded-full bg-white shadow-soft flex items-center justify-center border border-sage-100 group-hover:bg-sage-50" style={{ transition: 'background-color 150ms ease' }}>
                  <ArrowRight className="w-4 h-4 text-sage-500" />
                </div>
                रुपालींविषयी
              </Link>
            </div>
          </div>

          {/* Image / Visual card */}
          <div className="relative slide-in">
            <div className="relative mx-auto max-w-sm">
              {/* Main card */}
              <div className="relative bg-white rounded-3xl shadow-soft-lg border border-sage-100 overflow-hidden">
                {/* Rupali's actual photo */}
                <div className="relative w-full" style={{ aspectRatio: '3/4' }}>
                  <Image
                    src="/images/tutor/rupali-1.jpg"
                    alt="रुपाली — पॅरेंटिंग पार्टनर आणि लाईफ कोच"
                    fill
                    priority
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                </div>
                <div className="p-5 text-center">
                  <h3 className="text-xl font-bold text-sage-900 mb-1" style={{ fontFamily: 'var(--font-playfair)' }}>नमस्ते, मी रुपाली</h3>
                  <p className="text-sage-600 text-sm mb-3">पॅरेंटिंग पार्टनर आणि लाईफ कोच</p>
                  <div className="flex justify-center gap-1 mb-3">
                    {[1,2,3,4,5].map(i => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sage-600 text-sm italic">
                    &ldquo;प्रत्येक मुलाला अशा पालकाची गरज असते जो स्वतःवर आणि मुलावर मनापासून विश्वास ठेवतो.&rdquo;
                  </p>
                </div>
              </div>

              {/* Floating stat card — Reviews */}
              <div
                className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-card p-3 border border-sage-100 blob-anim"
                style={{ animationDelay: '1s' }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-sage-100 rounded-xl flex items-center justify-center text-sm">🎉</div>
                  <div>
                    <p className="text-xs font-bold text-sage-900">५००+</p>
                    <p className="text-xs text-sage-500">पालकांचा विश्वास</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0 80L1440 80L1440 20C1200 80 960 0 720 20C480 40 240 0 0 60L0 80Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}
