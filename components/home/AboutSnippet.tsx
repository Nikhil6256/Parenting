import Link from 'next/link';
import Image from 'next/image';
import { CheckCircle, ArrowRight } from 'lucide-react';

const values = [
  'प्रभावी आणि सोपे पॅरेंटिंग तंत्र',
  'सामंजस्य आणि प्रेमळ दृष्टिकोन',
  'रोजच्या अडचणींवर व्यावहारिक उपाय',
  'भावनिक बुद्धिमत्तेचा विकास',
  'कौटुंबिक मूल्यांची जपणूक',
  'सकारात्मक पालकांचा परिवार',
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
                    alt="रुपाली — पॅरेंटिंग पार्टनर आणि लाईफ कोच"
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
                      <h3 className="font-bold text-sage-900 text-base" style={{ fontFamily: 'var(--font-playfair)' }}>रुपाली</h3>
                      <p className="text-sage-600 text-xs">पॅरेंटिंग पार्टनर आणि लाईफ कोच</p>
                      <p className="text-sage-500 text-xs">२+ वर्षांचा अनुभव</p>
                    </div>
                  </div>

                  <blockquote className="text-sage-700 italic text-sm leading-relaxed border-l-4 border-sage-300 pl-4">
                    &ldquo;पालकत्व म्हणजे परफेक्ट असणे नव्हे, तर मुलांसोबत स्वतःही शिकणे आणि प्रेमाने वाढणे होय.&rdquo;
                  </blockquote>

                  {/* Badges */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {['पॉझिटिव्ह पॅरेंटिंग', 'लाईफ कोचिंग'].map(cert => (
                      <span key={cert} className="badge badge-green text-xs">{cert}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating stat card */}
              <div className="absolute -bottom-5 -right-5 bg-white rounded-2xl shadow-card-hover p-4 border border-sage-100">
                <p className="text-2xl font-bold text-sage-700">१०००+</p>
                <p className="text-xs text-sage-500 font-medium">सुखी व समाधानी पालक</p>
              </div>
            </div>
          </div>

          {/* Text side */}
          <div className="order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-sage-50 text-sage-600 rounded-full text-sm font-semibold mb-4 border border-sage-100">
              ✨ तुमच्या पॅरेंटिंग पार्टनरविषयी
            </div>
            <h2 className="section-title mb-5">
              भेटा रुपाली मॅडमना —{' '}
              <span className="gradient-text">तुमच्या पॅरентिंग पार्टनर</span>
            </h2>
            <p className="text-sage-600 leading-relaxed mb-5">
              महाराष्ट्रातील अनेक कुटुंबांना मार्गदर्शन करण्याचा २+ वर्षांचा अनुभव असलेल्या रुपाली मॅडम व्यावहारिक मार्गदर्शन आणि प्रेमाचा मेळ घालून पालकांना आपल्या मुलांशी घट्ट नाते जोडण्यास मदत करतात.
            </p>
            <p className="text-sage-600 leading-relaxed mb-8">
              पालक आनंदी आणि समाधानी असतील तरच मुले प्रगती करतात, या विश्वासावर त्यांची पद्धत आधारित आहे. त्यांच्या कोर्सेसमुळे १००० हून अधिक पालकांनी आपल्या घरात शांतता व आनंदाचे वातावरण निर्माण केले आहे.
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
              माझ्याविषयी अधिक जाणून घ्या <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

