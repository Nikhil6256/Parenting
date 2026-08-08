'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: 'Do I need any prior knowledge to enroll in your courses?',
    a: 'Absolutely not! My courses are designed for all parents — whether you\'re a first-time parent or have been parenting for years. Each course starts from the basics and builds progressively.',
  },
  {
    q: 'How long do I have access to the course after purchase?',
    a: 'You get lifetime access to all course content once you purchase. Watch at your own pace, revisit lessons, and access any future updates we add at no extra cost.',
  },
  {
    q: 'Are the courses suitable for children of all ages?',
    a: 'Each course specifies the age range it\'s most relevant for. We have courses for parents of toddlers (1-3 years), school-age children (4-12 years), and teenagers (13-18 years). Many strategies are universal.',
  },
  {
    q: 'What makes your approach different from other parenting courses?',
    a: 'My courses combine practical, empathetic tools with the realities of Indian family dynamics and culture. I understand joint family challenges, academic pressures, and the unique emotional landscape of Indian parenting.',
  },
  {
    q: 'What if I have an issue with the course?',
    a: 'Your satisfaction matters to me. If you face any technical issues or have concerns about the course, reach out to me directly at rupalidabade999@gmail.com or call +91 98221 76300 and I\'ll personally make sure you\'re taken care of.',
  },
  {
    q: 'Will the course content be in English or Hindi?',
    a: 'Currently all courses are taught in English. However, I use simple, conversational language that\'s easy to follow. Hindi-medium courses are planned for future release.',
  },
  {
    q: 'Can I interact with Rupali directly?',
    a: 'Yes! Premium course bundles include access to live Q&A sessions and a private community group where you can ask questions and connect with other parents.',
  },
  {
    q: 'Is my payment secure?',
    a: 'Absolutely. We use Razorpay, one of India\'s most trusted payment gateways, which supports UPI, net banking, credit/debit cards, and wallets. All transactions are encrypted.',
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="section bg-sage-50/50">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Header */}
          <div className="lg:sticky lg:top-24">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-sage-100 text-sage-700 rounded-full text-sm font-semibold mb-4 border border-sage-200">
              ❓ FAQs
            </div>
            <h2 className="section-title mb-5">
              Questions from{' '}
              <span className="gradient-text">Curious Parents</span>
            </h2>
            <p className="text-sage-600 leading-relaxed mb-8">
              Can&apos;t find what you&apos;re looking for? I&apos;m always happy to help.
            </p>
            <a href="/contact" className="btn-primary inline-flex">
              Ask Me Anything →
            </a>

            {/* Fun stat card */}
            <div className="mt-8 bg-white rounded-2xl p-6 border border-sage-100 shadow-soft">
              <div className="text-3xl mb-3">💡</div>
              <p className="font-bold text-sage-900 text-lg mb-1">Quick tip for today</p>
              <p className="text-sage-600 text-sm leading-relaxed">
                When your child has a meltdown, connect before you correct. A simple hug or &ldquo;I see you&apos;re upset&rdquo; can de-escalate 80% of tantrums within minutes.
              </p>
            </div>
          </div>

          {/* Accordion */}
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`card border transition-all duration-300 ${
                  openIndex === index ? 'border-sage-200 shadow-soft' : 'border-sage-50'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="flex items-center justify-between w-full p-5 text-left"
                >
                  <span className="font-semibold text-sage-900 text-sm pr-4 leading-relaxed">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-sage-500 flex-shrink-0 transition-transform duration-300 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openIndex === index && (
                  <div className="px-5 pb-5 text-sage-600 text-sm leading-relaxed border-t border-sage-50 pt-3 animate-slide-down">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
