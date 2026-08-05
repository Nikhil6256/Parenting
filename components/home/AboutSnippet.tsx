import Link from 'next/link';
import Image from 'next/image';
import { CheckCircle, ArrowRight } from 'lucide-react';

const values = [
  'Evidence-based parenting strategies',
  'Compassionate, non-judgmental approach',
  'Practical tools for everyday challenges',
  'Focus on emotional intelligence',
  'Cultural sensitivity in Indian context',
  'Community of supportive parents',
];

export default function AboutSnippet() {
  return (
    <section className="section bg-white">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Visual side */}
          <div className="relative order-2 lg:order-1">
            <div className="relative">
              {/* Main photo card */}
              <div className="bg-warm-gradient rounded-3xl border border-beige-200 shadow-soft overflow-hidden">
                {/* Real photo of Rupali */}
                <div className="relative w-full" style={{ aspectRatio: '4/5' }}>
                  <Image
                    src="/images/tutor/rupali-2.jpg"
                    alt="Rupali — M.Sc. Psychology, Certified Parenting Coach"
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 100vw, 500px"
                  />
                </div>
                {/* Info overlay at bottom */}
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-sage-gradient rounded-xl shadow-soft flex items-center justify-center text-lg">
                      🌿
                    </div>
                    <div>
                      <h3 className="font-bold text-sage-900 text-base" style={{ fontFamily: 'var(--font-playfair)' }}>Rupali</h3>
                      <p className="text-sage-600 text-xs">M.Sc. Psychology | Certified Coach</p>
                      <p className="text-sage-500 text-xs">8+ years of practice</p>
                    </div>
                  </div>

                  <blockquote className="text-sage-700 italic text-sm leading-relaxed border-l-4 border-sage-300 pl-4">
                    &ldquo;Parenting is not about being perfect. It&apos;s about being present, patient, and willing to grow alongside your child.&rdquo;
                  </blockquote>

                  {/* Certifications */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {['ICF Certified', 'Positive Parenting', 'Child Psychology'].map(cert => (
                      <span key={cert} className="badge badge-green text-xs">{cert}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating stat card */}
              <div className="absolute -bottom-5 -right-5 bg-white rounded-2xl shadow-card-hover p-4 border border-sage-100">
                <p className="text-2xl font-bold text-sage-700">500+</p>
                <p className="text-xs text-sage-500 font-medium">Families transformed</p>
              </div>
            </div>
          </div>

          {/* Text side */}
          <div className="order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-sage-50 text-sage-600 rounded-full text-sm font-semibold mb-4 border border-sage-100">
              ✨ About Your Coach
            </div>
            <h2 className="section-title mb-5">
              Meet Rupali — Your{' '}
              <span className="gradient-text">Parenting Partner</span>
            </h2>
            <p className="text-sage-600 leading-relaxed mb-5">
              With a Master&apos;s in Psychology and 8+ years coaching families across India, Rupali blends 
              scientific research with heartful wisdom to help parents break generational cycles and build 
              deeply connected families.
            </p>
            <p className="text-sage-600 leading-relaxed mb-8">
              Her approach is rooted in the belief that when parents thrive, children flourish. Her courses 
              and coaching have helped over 5,000 families create calmer, happier homes.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {values.map((value) => (
                <div key={value} className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-sage-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sage-700 text-sm">{value}</span>
                </div>
              ))}
            </div>

            <Link href="/about" className="btn-primary">
              Learn More About Me <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

