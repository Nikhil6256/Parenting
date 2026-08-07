'use client';

import { usePathname } from 'next/navigation';
import CustomerSidebar from '@/components/layout/CustomerSidebar';

export default function CustomerLayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Hide customer sidebar on course player and checkout pages
  const isImmersive = pathname?.match(/^\/my-courses\/.+/) || pathname?.startsWith('/checkout');

  if (isImmersive) {
    return <main className="min-h-screen">{children}</main>;
  }

  return (
    <div className="flex min-h-screen bg-sage-50/30">
      <CustomerSidebar />
      <div className="flex-1 lg:ml-64">
        <div className="min-h-screen pb-20 lg:pb-0">
          {children}
        </div>
      </div>
    </div>
  );
}
