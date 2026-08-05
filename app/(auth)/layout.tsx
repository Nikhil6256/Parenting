import Navbar from '@/components/layout/Navbar';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-hero-gradient pt-20">{children}</main>
    </>
  );
}
