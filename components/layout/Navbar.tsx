'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import {
  Menu, X, ChevronDown, BookOpen, User, LogOut,
  LayoutDashboard, ShoppingBag
} from 'lucide-react';
import LogoIcon from '@/components/common/LogoIcon';

const navLinks = [
  { href: '/', label: 'मुख्यपृष्ठ' },
  { href: '/about', label: 'रुपालींविषयी' },
  { href: '/courses', label: 'कोर्सेस' },
  { href: '/blog', label: 'ब्लॉग' },
  { href: '/contact', label: 'संपर्क' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { data: session } = useSession();
  const pathname = usePathname();

  // All hooks MUST be called before any conditional returns (React rules of hooks)
  useEffect(() => {
    let rafId: number;
    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 20);
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Hide navbar on immersive pages (AFTER all hooks)
  if (pathname?.startsWith('/admin')) return null;
  if (pathname?.match(/^\/my-courses\/.+/)) return null;
  if (pathname?.startsWith('/checkout')) return null;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-soft border-b border-sage-100'
          : 'bg-transparent'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 bg-sage-gradient rounded-xl flex items-center justify-center shadow-soft group-hover:shadow-soft-lg transition-all duration-300">
              <LogoIcon className="w-5.5 h-5.5 text-white" />
            </div>
            <div>
              <span className="text-lg font-bold text-sage-800" style={{ fontFamily: 'var(--font-playfair)' }}>
                Rise With
              </span>
              <span className="text-lg font-bold text-sage-500 ml-1" style={{ fontFamily: 'var(--font-playfair)' }}>
                Rupali
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  pathname === link.href
                    ? 'text-sage-600 bg-sage-50'
                    : 'text-sage-700 hover:text-sage-600 hover:bg-sage-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Auth Section */}
          <div className="hidden md:flex items-center gap-3">
            {session ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl hover:bg-sage-50 transition-colors duration-200 border border-sage-100"
                >
                  <div className="w-8 h-8 bg-sage-gradient rounded-lg flex items-center justify-center text-white text-xs font-bold">
                    {session.user.name?.[0]?.toUpperCase() || 'U'}
                  </div>
                  <span className="text-sm font-medium text-sage-800 max-w-[100px] truncate">
                    {session.user.name}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-sage-500 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-soft-lg border border-sage-100 py-2 animate-in">
                    {session.user.role === 'owner' && (
                      <Link
                        href="/admin"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-sage-700 hover:bg-sage-50 hover:text-sage-900 transition-colors"
                      >
                        <LayoutDashboard className="w-4 h-4" />
                        ॲडमिन डॅशबोर्ड
                      </Link>
                    )}
                    <Link
                      href="/my-courses"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-sage-700 hover:bg-sage-50 hover:text-sage-900 transition-colors"
                    >
                      <BookOpen className="w-4 h-4" />
                      माझे कोर्सेस
                    </Link>
                    <Link
                      href="/profile"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-sage-700 hover:bg-sage-50 hover:text-sage-900 transition-colors"
                    >
                      <User className="w-4 h-4" />
                      प्रोफाईल
                    </Link>
                    <div className="border-t border-sage-100 mt-1 pt-1">
                      <button
                        onClick={() => { signOut({ callbackUrl: '/' }); setDropdownOpen(false); }}
                        className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        साइन आउट
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link href="/login" className="btn-ghost text-sm">लॉगिन करा</Link>
                <Link href="/signup" className="btn-primary text-sm py-2.5 px-5">सुरुवात करा</Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg text-sage-700 hover:bg-sage-50 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-sage-100 shadow-soft-lg animate-slide-down">
          <div className="container-custom py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  pathname === link.href ? 'bg-sage-50 text-sage-700' : 'text-sage-700 hover:bg-sage-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-sage-100 space-y-2">
              {session ? (
                <>
                  {session.user.role === 'owner' && (
                    <Link href="/admin" onClick={() => setIsOpen(false)} className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-sage-700 hover:bg-sage-50 rounded-xl">
                      <LayoutDashboard className="w-4 h-4" /> ॲडमिन डॅशबोर्ड
                    </Link>
                  )}
                  <Link href="/my-courses" onClick={() => setIsOpen(false)} className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-sage-700 hover:bg-sage-50 rounded-xl">
                    <ShoppingBag className="w-4 h-4" /> माझे कोर्सेस
                  </Link>
                  <button
                    onClick={() => { signOut({ callbackUrl: '/' }); setIsOpen(false); }}
                    className="flex items-center gap-2 w-full px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-50 rounded-xl"
                  >
                    <LogOut className="w-4 h-4" /> साइन आउट
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" onClick={() => setIsOpen(false)} className="block w-full btn-secondary text-center text-sm">लॉगिन करा</Link>
                  <Link href="/signup" onClick={() => setIsOpen(false)} className="block w-full btn-primary text-center text-sm">सुरुवात करा</Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
