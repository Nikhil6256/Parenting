import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: 'Terms and conditions for Rise With Rupali parenting courses and services.',
};

export default function TermsPage() {
  return (
    <div className="pt-28 pb-16">
      <div className="container-custom max-w-3xl">
        <Link href="/" className="inline-flex items-center gap-1.5 text-sage-600 text-sm mb-6 hover:text-sage-700">
          &larr; Back to Home
        </Link>
        <h1 className="section-title mb-8">Terms & Conditions</h1>
        <div className="prose-custom space-y-4">
          <p>Welcome to Rise With Rupali. By accessing our website and purchasing our courses, you agree to these terms.</p>
          <h2 className="text-xl font-bold text-sage-900 mt-6 mb-3">1. Course Access</h2>
          <p>Upon purchase, you receive lifetime access to the course content. Access is personal and non-transferable.</p>
          <h2 className="text-xl font-bold text-sage-900 mt-6 mb-3">2. Refund Policy</h2>
          <p>Due to the digital nature of our courses and downloadable content, all sales are final once content access is granted. If you experience technical issues accessing your purchased courses, please contact our support team at rupalidabade999@gmail.com.</p>
          <h2 className="text-xl font-bold text-sage-900 mt-6 mb-3">3. Intellectual Property</h2>
          <p>All course content is the intellectual property of Rise With Rupali. You may not distribute, share, or resell any content.</p>
          <h2 className="text-xl font-bold text-sage-900 mt-6 mb-3">4. Limitation of Liability</h2>
          <p>Rise With Rupali provides educational content and is not a substitute for professional medical or psychological advice.</p>
          <h2 className="text-xl font-bold text-sage-900 mt-6 mb-3">5. Contact</h2>
          <p>For questions about these terms, contact us at <a href="mailto:rupalidabade999@gmail.com" className="text-sage-600 underline">rupalidabade999@gmail.com</a>.</p>
        </div>
      </div>
    </div>
  );
}
