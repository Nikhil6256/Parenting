import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import CustomerLayoutClient from '@/components/layout/CustomerLayoutClient';

export default async function CustomerLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login?callbackUrl=/my-courses');
  }

  return <CustomerLayoutClient>{children}</CustomerLayoutClient>;
}
