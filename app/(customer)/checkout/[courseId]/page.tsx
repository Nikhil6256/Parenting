'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Shield, Lock, ArrowLeft, CheckCircle } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import Link from 'next/link';

declare global {
  interface Window { Razorpay: any; }
}

interface Props { params: { courseId: string } }

export default function CheckoutPage({ params }: Props) {
  const { data: session } = useSession();
  const router = useRouter();
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState(false);
  const [paid, setPaid] = useState(false);

  useEffect(() => {
    // Load Razorpay script
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    // Fetch course info
    fetch(`/api/courses/${params.courseId}?byId=true`)
      .then(r => r.json())
      .then(d => {
        if (d.error) router.push('/courses');
        else setCourse(d.course);
      })
      .finally(() => setLoading(false));

    return () => { if (document.body.contains(script)) document.body.removeChild(script); };
  }, [params.courseId, router]);

  const handlePay = async () => {
    if (!session) {
      router.push(`/login?callbackUrl=/checkout/${params.courseId}`);
      return;
    }

    setPaying(true);
    try {
      // Create order server-side
      const res = await fetch('/api/orders/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseId: params.courseId }),
      });
      const orderData = await res.json();

      if (!res.ok) {
        if (res.status === 409) {
          toast.success('You already own this course!');
          router.push(`/my-courses/${params.courseId}`);
          return;
        }
        toast.error(orderData.error || 'Failed to initiate payment');
        setPaying(false); // ← unfreeze button on order creation failure
        return;
      }

      // Open Razorpay modal
      const rzp = new window.Razorpay({
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Rise With Rupali',
        description: orderData.courseTitle,
        order_id: orderData.orderId,
        prefill: {
          name: session.user.name,
          email: session.user.email,
        },
        theme: { color: '#e54880' },
        handler: async (response: any) => {
          // Verify payment server-side
          const verifyRes = await fetch('/api/orders/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
            }),
          });

          const verifyData = await verifyRes.json();
          if (verifyRes.ok) {
            setPaid(true);
            toast.success('Payment successful! 🎉');
            setTimeout(() => router.push('/my-courses'), 2000);
          } else {
            setPaying(false); // ← unfreeze on verify failure
            toast.error(verifyData.error || 'Payment verification failed');
          }
        },
        modal: {
          ondismiss: () => {
            setPaying(false);
            toast('Payment cancelled', { icon: '❌' });
          },
        },
      });
      rzp.open();
    } catch {
      toast.error('Payment failed. Please try again.');
      setPaying(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-sage-300 border-t-sage-600 rounded-full animate-spin" />
      </div>
    );
  }

  if (paid) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-hero-gradient">
        <div className="text-center">
          <div className="w-20 h-20 bg-sage-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-soft-lg">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-sage-900 mb-2">Payment Successful!</h2>
          <p className="text-sage-600">Redirecting you to your courses...</p>
        </div>
      </div>
    );
  }

  const price = course?.discountPrice || course?.price;

  return (
    <div className="min-h-screen bg-hero-gradient flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <Link href={`/courses/${course?.slug}`} className="inline-flex items-center gap-1.5 text-sage-600 text-sm mb-6 hover:text-sage-700">
          <ArrowLeft className="w-4 h-4" /> Back to course
        </Link>

        <div className="card p-8">
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-sage-50 text-sage-700 rounded-full text-xs font-semibold mb-4">
              <Lock className="w-3.5 h-3.5" /> Secure Checkout
            </div>
            <h1 className="text-xl font-bold text-sage-900 mb-1" style={{ fontFamily: 'var(--font-playfair)' }}>
              Complete Purchase
            </h1>
          </div>

          {/* Course summary */}
          <div className="bg-sage-50 rounded-xl p-4 mb-6 border border-sage-100">
            <p className="text-xs text-sage-500 mb-1">You&apos;re enrolling in</p>
            <p className="font-bold text-sage-900 text-base mb-2">{course?.title}</p>
            <div className="flex items-center justify-between">
              <span className="text-sm text-sage-600">{course?.category} · {course?.level}</span>
              <div>
                {course?.discountPrice ? (
                  <div className="text-right">
                    <span className="font-bold text-sage-700">{formatPrice(course.discountPrice)}</span>
                    <span className="text-sm text-sage-400 line-through ml-2">{formatPrice(course.price)}</span>
                  </div>
                ) : (
                  <span className="font-bold text-sage-700">{formatPrice(course?.price)}</span>
                )}
              </div>
            </div>
          </div>

          {/* Order total */}
          <div className="flex items-center justify-between py-4 border-t border-b border-sage-100 mb-6">
            <span className="font-semibold text-slate-700">Total</span>
            <span className="text-xl font-bold text-sage-700">{formatPrice(price)}</span>
          </div>

          <button
            onClick={handlePay}
            disabled={paying}
            className="btn-primary w-full py-4 text-base"
          >
            {paying ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Shield className="w-4 h-4" /> Pay {formatPrice(price)} Securely
              </>
            )}
          </button>

          <div className="flex items-center justify-center gap-4 mt-4 text-xs text-slate-400">
            <span className="flex items-center gap-1">✅ UPI accepted</span>
            <span className="flex items-center gap-1">✅ Cards accepted</span>
            <span className="flex items-center gap-1">✅ EMI available</span>
          </div>

          <p className="text-center text-xs text-slate-400 mt-3">
            Powered by Razorpay · Secure checkout
          </p>
        </div>
      </div>
    </div>
  );
}
