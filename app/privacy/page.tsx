import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'गोपनीयता धोरण - Rise With Rupali',
  description: 'Rise With Rupali गोपनीयतेचे नियम आणि धोरण.',
};

export default function PrivacyPage() {
  return (
    <div className="pt-28 pb-16">
      <div className="container-custom max-w-3xl">
        <Link href="/" className="inline-flex items-center gap-1.5 text-sage-600 text-sm mb-6 hover:text-sage-700">
          &larr; मुख्यपृष्ठावर परत जा
        </Link>
        <h1 className="section-title mb-8">गोपनीयता धोरण (Privacy Policy)</h1>
        <div className="prose-custom space-y-4">
          <p>तुमची गोपनीयता आमच्यासाठी अत्यंत महत्त्वाची आहे. Rise With Rupali तुमची वैयक्तिक माहिती कशी सुरक्षित ठेवते, याबद्दलची माहिती येथे दिली आहे.</p>
          <h2 className="text-xl font-bold text-sage-900 mt-6 mb-3">१. आम्ही संकलित करणारी माहिती</h2>
          <p>आम्ही केवळ तुम्ही दिलेली माहिती संकलित करतो: तुमचे नाव, ईमेल पत्ता आणि पेमेंट तपशील (जे Razorpay द्वारे अत्यंत सुरक्षितपणे प्रक्रिया केले जातात).</p>
          <h2 className="text-xl font-bold text-sage-900 mt-6 mb-3">२. माहितीचा वापर</h2>
          <p>आम्ही तुमच्या माहितीचा वापर केवळ तुम्हाला कोर्स ॲक्सेस देण्यासाठी, सुरक्षित पेमेंट प्रक्रियेसाठी आणि महत्त्वाचे अपडेट्स देण्यासाठी करतो.</p>
          <h2 className="text-xl font-bold text-sage-900 mt-6 mb-3">३. माहितीची सुरक्षा</h2>
          <p>आम्ही उच्च दर्जाच्या सुरक्षा उपायांचा वापर करतो. तुमचे पेमेंट तपशील Razorpay द्वारे हाताळले जातात आणि आमच्या सर्व्हरवर कधीही साठवले जात नाहीत.</p>
          <h2 className="text-xl font-bold text-sage-900 mt-6 mb-3">४. संपर्क</h2>
          <p>गोपनीयतेबाबत काही प्रश्न असल्यास rupalidabade999@gmail.com वर संपर्क साधा.</p>
        </div>
      </div>
    </div>
  );
}
