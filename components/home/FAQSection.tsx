'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: 'कोर्स सुरू करण्यासाठी मला आधी काही विशेष ज्ञान असणे आवश्यक आहे का?',
    a: 'अजिबात नाही! माझे सर्व कोर्सेस अगदी सोप्या भाषेपासून सुरू होतात. नवीन पालक असोत किंवा अनुभवी, सर्वांसाठी हे कोर्सेस अत्यंत सोपे आणि उपयुक्त आहेत.',
  },
  {
    q: 'कोर्स विकत घेतल्यानंतर मी तो किती दिवस पाहू शकतो?',
    a: 'तुम्हाला सर्व व्हिडिओ आणि साहित्याचा आयुष्यभरासाठी (Lifetime Access) ॲक्सेस मिळतो. तुम्ही तुमच्या वेळेनुसार आणि सोयीनुसार कितीही वेळा व्हिडिओ पाहू शकता.',
  },
  {
    q: 'हे कोर्सेस कोणत्या वयोगटातील मुलांच्या पालकांसाठी आहेत?',
    a: 'लहान मुलांपासून (१-३ वर्षे), शालेय मुले (४-१२ वर्षे) आणि किशोरवयीन मुलांच्या (१३-१८ वर्षे) पालकांसाठी प्रत्येक टप्प्यानुसार विशेष मार्गदर्शन यात आहे.',
  },
  {
    q: 'तुमच्या कोर्सेसचे मुख्य वैशिष्ट्य काय आहे?',
    a: 'माझे कोर्सेस आपल्या भारतीय कौटुंबिक संस्कृती आणि जीवनशैलीचा विचार करून तयार केले आहेत. यात केवळ पुस्तकी ज्ञान नसून रोजच्या आयुष्यातील व्यावहारिक उपाय आहेत.',
  },
  {
    q: 'मला काही अडचण आल्यास मी संपर्क कसा साधावा?',
    a: 'तुमचे समाधान हेच आमचे ध्येय आहे. काहीही अडचण किंवा प्रश्न असल्यास तुम्ही थेट rupalidabade999@gmail.com किंवा +91 98221 76300 वर संपर्क साधू शकता.',
  },
  {
    q: 'कोर्स कोणत्या भाषेत उपलब्ध आहेत?',
    a: 'सर्व कोर्सेस अतिशय सोप्या आणि सुंदर मराठी भाषेत उपलब्ध आहेत, जेणेकरून प्रत्येक पालकाला ते सहज समजतील आणि अमलात आणता येतील.',
  },
  {
    q: 'माझे पेमेंट सुरक्षित राहील का?',
    a: 'होय, अगदी सुरक्षित. पेमेंटसाठी Razorpay या भारतातील अत्यंत सुरक्षित प्रणालीचा वापर केला जातो, ज्याद्वारे तुम्ही UPI, Google Pay, PhonePe किंवा कार्डने सुरक्षित पेमेंट करू शकता.',
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
              ❓ वारंवार विचारले जाणारे प्रश्न
            </div>
            <h2 className="section-title mb-5">
              पालकांच्या मनातील{' '}
              <span className="gradient-text">काही महत्त्वाचे प्रश्न</span>
            </h2>
            <p className="text-sage-600 leading-relaxed mb-8">
              तुम्हाला हवी असलेली माहिती मिळाली नाही? मला थेट प्रश्न विचारा.
            </p>
            <a href="/contact" className="btn-primary inline-flex">
              प्रश्न विचारा →
            </a>

            {/* Fun stat card */}
            <div className="mt-8 bg-white rounded-2xl p-6 border border-sage-100 shadow-soft">
              <div className="text-3xl mb-3">💡</div>
              <p className="font-bold text-sage-900 text-lg mb-1">आजची महत्त्वाची टीप</p>
              <p className="text-sage-600 text-sm leading-relaxed">
                मुलांचा राग किंवा हट्ट अनावर झाल्यास, आधी त्यांच्या भावना समजून घ्या आणि नंतर सुधारणा सुचवा. एक प्रेमळ मिठी किंवा &ldquo;मला समजतेय तुला त्रास होतोय&rdquo; हे शब्द मुलांचा राग त्वरित शांत करतात.
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
