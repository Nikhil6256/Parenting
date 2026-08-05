'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ShoppingCart } from 'lucide-react';

interface Props {
  courseId: string;
  courseSlug: string;
}

export default function BuyButton({ courseId }: Props) {
  const { data: session } = useSession();
  const router = useRouter();

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
