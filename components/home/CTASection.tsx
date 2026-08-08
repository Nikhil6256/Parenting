import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="section bg-white">
      <div className="container-custom">
        <div className="relative bg-sage-gradient rounded-3xl overflow-hidden shadow-soft-lg">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10 text-center py-16 md:py-20 px-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 text-white rounded-full text-sm font-semibold mb-6">
              <Sparkles className="w-4 h-4" />
              Start Your Journey Today
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight" style={{ fontFamily: 'var(--font-playfair)' }}>
              The Parent You Want to Be
              <br />
              <span className="text-sage-200">Is Already Inside You</span>
            </h2>

            <p className="text-sage-100 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
              Join over 1000 happy parents who chose to grow. Browse our courses to find the right path for your family.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/courses"
                className="inline-flex items-center justify-center gap-2 bg-white text-sage-700 hover:bg-sage-50 font-bold px-8 py-4 rounded-xl transition-all duration-200 shadow-soft hover:shadow-soft-lg hover:-translate-y-0.5"
              >
                Browse All Courses <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 border-2 border-white/50 text-white hover:bg-white/10 font-semibold px-8 py-4 rounded-xl transition-all duration-200"
              >
                Contact Us
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center justify-center gap-6 mt-10 text-sage-200 text-sm">
              <span className="flex items-center gap-1.5">✅ Lifetime access</span>
              <span className="flex items-center gap-1.5">✅ Secure Razorpay payment</span>
              <span className="flex items-center gap-1.5">✅ Expert-led courses</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
