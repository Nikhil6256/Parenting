'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { BookOpen, User, Home, LogOut, GraduationCap, Leaf } from 'lucide-react';

const navItems = [
  { href: '/my-courses', icon: BookOpen, label: 'My Courses' },
  { href: '/profile', icon: User, label: 'My Profile' },
  { href: '/courses', icon: GraduationCap, label: 'Browse Courses' },
  { href: '/', icon: Home, label: 'Back to Home' },
];

export default function CustomerSidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 h-screen bg-white border-r border-sage-100 shadow-soft fixed left-0 top-0 z-40">
        {/* Header */}
        <div className="flex items-center gap-2.5 px-5 h-16 border-b border-sage-100">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-sage-gradient rounded-lg flex items-center justify-center">
              <Leaf className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-sage-800 text-sm" style={{ fontFamily: 'var(--font-playfair)' }}>
              Rise With Rupali
            </span>
          </Link>
        </div>

        {/* User Info */}
        <div className="mx-4 mt-4 px-4 py-3.5 bg-warm-gradient rounded-xl border border-beige-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-sage-gradient rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-soft">
              {session?.user?.name?.[0]?.toUpperCase() || 'U'}
            </div>
            <div className="overflow-hidden">
              <p className="font-semibold text-sage-900 text-sm truncate">{session?.user?.name || 'Student'}</p>
              <p className="text-xs text-sage-500 truncate">{session?.user?.email}</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const active = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`admin-nav-item ${active ? 'admin-nav-item-active' : 'admin-nav-item-inactive'}`}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Sign out */}
        <div className="px-3 pb-5 border-t border-sage-100 pt-3">
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="admin-nav-item admin-nav-item-inactive w-full text-red-500 hover:bg-red-50 hover:text-red-600"
          >
            <LogOut className="w-5 h-5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Mobile bottom nav */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-sage-100 shadow-[0_-4px_24px_rgba(0,0,0,0.06)] px-2 py-2">
        <div className="flex items-center justify-around">
          {navItems.slice(0, 3).map((item) => {
            const active = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-colors ${
                  active ? 'text-sage-600' : 'text-sage-400'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            );
          })}
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl text-red-400"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-xs font-medium">Sign Out</span>
          </button>
        </div>
      </div>
    </>
  );
}
