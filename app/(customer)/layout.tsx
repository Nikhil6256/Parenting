import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import CustomerSidebar from '@/components/layout/CustomerSidebar';

export default async function CustomerLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login?callbackUrl=/my-courses');
  }

  return (
    <div className="flex min-h-screen bg-sage-50/30">
      <CustomerSidebar />
      {/* Main content offset by sidebar */}
      <div className="flex-1 lg:ml-64">
        <div className="min-h-screen pb-20 lg:pb-0">
          {children}
        </div>
      </div>
    </div>
  );
}
