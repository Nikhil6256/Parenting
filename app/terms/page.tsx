import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'अटी व शर्ती - Rise With Rupali',
  description: 'Rise With Rupali कोर्सेसच्या नियम आणि अटी.',
};

export default function TermsPage() {
  return (
    <div className="pt-28 pb-16">
      <div className="container-custom max-w-3xl">
        <Link href="/" className="inline-flex items-center gap-1.5 text-sage-600 text-sm mb-6 hover:text-sage-700">
          &larr; मुख्यपृष्ठावर परत जा
        </Link>
        <h1 className="section-title mb-8">नियम आणि अटी (Terms & Conditions)</h1>
        <div className="prose-custom space-y-4">
          <p>Rise With Rupali वर आपले स्वागत आहे. आमचे कोर्सेस खरेदी करून आणि वेबसाईट वापरून तुम्ही या नियमांना संमती देता.</p>
          <h2 className="text-xl font-bold text-sage-900 mt-6 mb-3">१. कोर्स ॲक्सेस (Access)</h2>
          <p>कोर्स खरेदी केल्यानंतर तुम्हाला आयुष्यभरासाठी (Lifetime Access) ॲक्सेस मिळतो. हा ॲक्सेस केवळ तुमच्या वैयक्तिक वापरासाठी आहे.</p>
          <h2 className="text-xl font-bold text-sage-900 mt-6 mb-3">२. परतावा धोरण (Refund Policy)</h2>
          <p>कोर्स डिजिटल स्वरूपात असल्यामुळे एकदा ॲक्सेस मिळाल्यानंतर परतावा (Refund) दिला जात नाही. तुम्हाला ॲक्सेस मिळण्यात काही तांत्रिक अडचण आल्यास कृपया rupalidabade999@gmail.com वर संपर्क साधावा.</p>
          <h2 className="text-xl font-bold text-sage-900 mt-6 mb-3">३. बौद्धिक संपदा (Intellectual Property)</h2>
          <p>सर्व कोर्सेसचे व्हिडिओ आणि साहित्य हे Rise With Rupali चे बौद्धिक हक्क आहेत. ते शेअर करणे, विकणे किंवा कॉपी करणे बेकायदेशीर आहे.</p>
          <h2 className="text-xl font-bold text-sage-900 mt-6 mb-3">४. संपर्क</h2>
          <p>या नियमांबाबत काही प्रश्न असल्यास rupalidabade999@gmail.com वर संपर्क साधा.</p>
        </div>
      </div>
    </div>
  );
}
