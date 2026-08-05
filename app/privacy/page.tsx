import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for Rise With Rupali — how we collect, use, and protect your data.',
};

export default function PrivacyPage() {
  return (
    <div className="pt-28 pb-16">
      <div className="container-custom max-w-3xl">
        <Link href="/" className="inline-flex items-center gap-1.5 text-sage-600 text-sm mb-6 hover:text-sage-700">
          &larr; Back to Home
        </Link>
        <h1 className="section-title mb-8">Privacy Policy</h1>
        <div className="prose-custom space-y-4">
          <p>Your privacy matters to us. This policy explains how Rise With Rupali collects, uses, and protects your personal information.</p>
          <h2 className="text-xl font-bold text-sage-900 mt-6 mb-3">1. Information We Collect</h2>
          <p>We collect information you provide: name, email address, and payment details (processed securely via Razorpay).</p>
          <h2 className="text-xl font-bold text-sage-900 mt-6 mb-3">2. How We Use Your Data</h2>
          <p>We use your data to provide course access, process payments, send updates, and improve our services.</p>
          <h2 className="text-xl font-bold text-sage-900 mt-6 mb-3">3. Data Security</h2>
          <p>We implement industry-standard security measures. Payment data is handled by Razorpay and never stored on our servers.</p>
          <h2 className="text-xl font-bold text-sage-900 mt-6 mb-3">4. Third-Party Services</h2>
          <p>We use Razorpay (payments), Cloudinary (media), and Bunny.net (video). Each has its own privacy policy.</p>
          <h2 className="text-xl font-bold text-sage-900 mt-6 mb-3">5. Contact</h2>
          <p>For privacy concerns, email us at <a href="mailto:rajc2538@gmail.com" className="text-sage-600 underline">rajc2538@gmail.com</a>.</p>
        </div>
      </div>
    </div>
  );
}
