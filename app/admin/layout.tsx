import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import AdminSidebar from '@/components/layout/AdminSidebar';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== 'owner') {
    redirect('/login?error=AccessDenied');
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <AdminSidebar />
      {/* Main content area offset by sidebar width */}
      <div className="flex-1 lg:ml-64 transition-all duration-300">
        <div className="min-h-screen lg:pt-0 pt-14">
          {children}
        </div>
      </div>
    </div>
  );
}
