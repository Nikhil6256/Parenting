import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Award, Heart, BookOpen, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'रुपालींविषयी - Rise With Rupali',
  description: 'रुपाली मॅडमविषयी अधिक जाणून घ्या — महाराष्ट्रातील पालकांसाठी सोपे व प्रभावी मार्गदर्शन.',
};

const values = [
  { icon: Heart, title: 'सामंजस्य आणि प्रेम', description: 'प्रत्येक पालक आपल्या परीने सर्वोत्तम प्रयत्न करत असतो. माझी पद्धत ओरडण्याऐवजी प्रेमावर आधारित आहे.' },
  { icon: BookOpen, title: 'व्यावहारिक ज्ञान', description: 'सर्व उपाय दैनंदिन आयुष्यातील अडचणींवर सहज अमलात आणता येण्याजोगे आहेत.' },
  { icon: Users, title: 'संस्कृतीची जपणूक', description: 'आपल्या कौटुंबिक संस्कृती, एकत्र कुटुंब पद्धती आणि आव्हानांची मला पूर्ण माहिती आहे.' },
  { icon: Award, title: 'सोपे व परिणामकारक', description: 'फक्त पुस्तकी उपदेश नाही, तर प्रत्यक्ष घरात अमलात आणता येतील असे सोपे मार्ग.' },
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
                👋 तुमच्या पॅरेंटिंग पार्टनरविषयी
              </div>
              <h1 className="section-title mb-5">
                नमस्ते, मी रुपाली —{' '}
                <span className="gradient-text">तुमची पॅरेंटिंग पार्टनर</span>
              </h1>
              <p className="text-sage-600 text-lg leading-relaxed mb-6">
                मागील २+ वर्षांपासून मी पालकांना मुलांशी घट्ट नाते जोडण्यास आणि त्यांचे भावनिक व मानसिक संगोपन करण्यास मार्गदर्शन करत आहे.
              </p>
              <div className="flex flex-wrap gap-3">
                {['पॉझिटिव्ह पॅरेंटिंग', 'लाईफ कोचिंग', '२+ वर्षांचा अनुभव'].map(cert => (
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
                    alt="रुपाली — पॅरेंटिंग पार्टनर आणि लाईफ कोच"
                    fill
                    priority
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                </div>
                <div className="p-5 text-center">
                  <h2 className="text-xl font-bold text-sage-900 mb-1" style={{ fontFamily: 'var(--font-playfair)' }}>रुपाली</h2>
                  <p className="text-sage-600 text-sm mb-4">पॅरेंटिंग पार्टनर आणि लाईफ कोच</p>
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div><p className="text-2xl font-bold text-sage-700">२+</p><p className="text-xs text-sage-500 font-medium">वर्षांचा अनुभव</p></div>
                    <div><p className="text-2xl font-bold text-sage-700">१०००+</p><p className="text-xs text-sage-500 font-medium">सुखी पालक</p></div>
                    <div><p className="text-2xl font-bold text-sage-700">उत्कृष्ट</p><p className="text-xs text-sage-500 font-medium">कोर्सेस</p></div>
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
          <h2 className="section-title text-center mb-8">माझा प्रवास</h2>
          <div className="prose-custom space-y-4 text-center mx-auto max-w-2xl">
            <p>आपल्या समाजात बऱ्याचदा मुलांवर ओरडण्यामुळे आणि कटकटींमुळे पालक आणि मुलांमध्ये अंतर निर्माण होते, हे मी जवळून पाहिले. खरा आणि टिकाऊ बदल हा घरातूनच सुरू व्हायला हवा, याची मला जाणीव झाली.</p>
            <p>मी पालकांना वैयक्तिक मार्गदर्शन करण्यास सुरुवात केली. ओरडण्याऐवजी घरात प्रेमळ संवाद सुरू झालेला पाहून मला अत्यंत आनंद झाला. यातूनच जास्तीत जास्त पालकांपर्यंत पोहोचण्यासाठी मी हे कोर्सेस तयार केले.</p>
            <p>आज Rise With Rupali हा १००० हून अधिक समाधानी व आनंदी पालकांचा परिवार बनला आहे, जे आपल्या मुलांचे संगोपन अधिक प्रेमाने आणि विश्वासाने करत आहेत.</p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section bg-sage-50/50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="section-title mb-4">माझी विचारसरणी</h2>
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
          <h2 className="section-title mb-4">आजच सुरुवात करा!</h2>
          <p className="section-subtitle mx-auto mb-8">
            चला, आपण एकत्र मिळून तुमच्या कुटुंबात प्रेमाचे आणि आनंदाचे वातावरण निर्माण करूया.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/courses" className="btn-primary">सर्व कोर्सेस पहा</Link>
            <Link href="/contact" className="btn-secondary">संपर्क साधा</Link>
          </div>
        </div>
      </section>
    </>
  );
}
