'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const schema = z.object({
  name: z.string().min(2, 'Name required'),
  email: z.string().email('Valid email required'),
  subject: z.string().min(3, 'Subject required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type FormData = z.infer<typeof schema>;

const contactInfo = [
  { icon: Mail,  label: 'ईमेल',    value: 'rupalidabade999@gmail.com',  href: 'mailto:rupalidabade999@gmail.com' },
  { icon: Phone, label: 'फोन',    value: '+91 98221 76300',        href: 'tel:+919822176300' },
  { icon: MapPin,label: 'पत्ता', value: 'सांगली, महाराष्ट्र',    href: '#' },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (res.ok) {
        setSubmitted(true);
        reset();
        toast.success('संदेश पाठवला गेला! मी लवकरच उत्तर देईन 💚');
      } else {
        toast.error(json.error || 'संदेश पाठवता आला नाही');
      }
    } catch {
      toast.error('काहीतरी त्रुटी झाली');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="pt-28 pb-12 bg-hero-gradient">
        <div className="container-custom text-center">
          <h1 className="section-title mb-4">संपर्क साधा 💚</h1>
          <p className="section-subtitle mx-auto" suppressHydrationWarning>
            तुम्हाला काही विचारायचे आहे किंवा माझ्या कोर्सेसबद्दल अधिक माहिती हवी आहे? नक्की निवांत संदेश पाठवा.
          </p>
        </div>
      </section>

      <section className="section py-12">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-bold text-sage-900 mb-6" style={{ fontFamily: 'var(--font-playfair)' }}>माहिती व संपर्क</h2>
              <p className="text-sage-600 leading-relaxed mb-8">
                तुम्हाला कोर्सेसबद्दल प्रश्न असल्यास किंवा पॅरेंटिंगबाबत काही मार्गदर्शन हवे असल्यास — मी नेहमी तयार आहे. २४ तासांच्या आत मी तुम्हाला नक्की उत्तर देईन.
              </p>

              <div className="space-y-4 mb-8">
                {contactInfo.map(({ icon: Icon, label, value, href }) => (
                  <a key={label} href={href} className="flex items-center gap-4 p-4 card card-hover">
                    <div className="w-10 h-10 bg-sage-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-sage-600" />
                    </div>
                    <div>
                      <p className="text-xs text-sage-500 font-medium">{label}</p>
                      <p className="text-slate-700 font-semibold text-sm">{value}</p>
                    </div>
                  </a>
                ))}
              </div>

              {/* Info card */}
              <div className="card p-6 bg-warm-gradient border border-beige-100">
                <p className="text-lg font-bold text-sage-900 mb-1" style={{ fontFamily: 'var(--font-playfair)' }}>कोणता कोर्स निवडावा हे समजले नाही?</p>
                <p className="text-sage-600 text-sm mb-4">मला थेट संदेश किंवा ईमेल पाठवा, मी तुम्हाला योग्य कोर्स निवडण्यास मदत करेन.</p>
                <a href="mailto:rupalidabade999@gmail.com" className="btn-primary text-sm">
                  ईमेल करा →
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <div className="card p-8">
              {submitted ? (
                <div className="text-center py-8">
                  <div className="text-5xl mb-4">💌</div>
                  <h3 className="text-xl font-bold text-sage-900 mb-2">संदेश मिळाला!</h3>
                  <p className="text-sage-600 mb-6">संपर्क साधल्याबद्दल धन्यवाद. मी २४ तासांच्या आत तुमच्याशी संपर्क साधेन.</p>
                  <button onClick={() => setSubmitted(false)} className="btn-secondary text-sm">पुन्हा संदेश पाठवा</button>
                </div>
              ) : (
                <>
                  <h2 className="text-xl font-bold text-sage-900 mb-6" style={{ fontFamily: 'var(--font-playfair)' }}>संदेश पाठवा</h2>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="label">तुमचे नाव</label>
                        <input className={`input ${errors.name ? 'border-red-300' : ''}`} placeholder="प्रिया पाटील" {...register('name')} />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                      </div>
                      <div>
                        <label className="label">ईमेल पत्ता</label>
                        <input type="email" className={`input ${errors.email ? 'border-red-300' : ''}`} placeholder="priya@example.com" {...register('email')} />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="label">विषय</label>
                      <input className={`input ${errors.subject ? 'border-red-300' : ''}`} placeholder="कोर्सबद्दल माहिती हवे आहे" {...register('subject')} />
                      {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject.message}</p>}
                    </div>

                    <div>
                      <label className="label">तुमचा संदेश</label>
                      <textarea
                        rows={5}
                        className={`input resize-none ${errors.message ? 'border-red-300' : ''}`}
                        placeholder="तुमचा प्रश्न येथे लिहा..."
                        {...register('message')}
                      />
                      {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
                    </div>

                    <button type="submit" disabled={loading} className="btn-primary w-full py-3">
                      {loading ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <><Send className="w-4 h-4" /> संदेश पाठवा</>
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
