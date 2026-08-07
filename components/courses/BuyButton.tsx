'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ShoppingCart, GraduationCap, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface Props {
  courseId: string;
  courseSlug: string;
  isEnrolled?: boolean;
}

export default function BuyButton({ courseId, isEnrolled }: Props) {
  const { data: session } = useSession();
  const router = useRouter();

  if (isEnrolled) {
    return (
      <Link
        href={`/my-courses/${courseId}`}
        className="btn-primary w-full py-3.5 text-base bg-emerald-600 hover:bg-emerald-700 focus:ring-emerald-500 shadow-soft"
      >
        <GraduationCap className="w-5 h-5" />
        Go to Course <ArrowRight className="w-4 h-4 ml-1" />
      </Link>
    );
  }

  const handleBuy = () => {
    if (!session) {
      router.push(`/login?callbackUrl=/checkout/${courseId}`);
    } else {
      router.push(`/checkout/${courseId}`);
    }
  };

  return (
    <button
      onClick={handleBuy}
      className="btn-primary w-full py-3.5 text-base"
    >
      <ShoppingCart className="w-5 h-5" />
      {session ? 'Enroll Now' : 'Sign In to Enroll'}
    </button>
  );
}
