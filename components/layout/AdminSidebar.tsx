'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import {
  LayoutDashboard, BookOpen, ShoppingCart, Users,
  FileText, LogOut, Leaf, BarChart3, Menu, X
} from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { href: '/admin', icon: LayoutDashboard, label: 'Dashboard', exact: true },
  { href: '/admin/courses', icon: BookOpen, label: 'Courses' },
  { href: '/admin/orders', icon: ShoppingCart, label: 'Orders' },
  { href: '/admin/customers', icon: Users, label: 'Customers' },
  { href: '/admin/blog', icon: FileText, label: 'Blog Posts' },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const isActive = (href: string, exact: boolean = false) => {
    if (!pathname) return false;
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`hidden lg:flex flex-col h-screen bg-white border-r border-sage-100 shadow-soft transition-all duration-300 ${
          collapsed ? 'w-16' : 'w-64'
        } fixed left-0 top-0 z-40`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-4 h-16 border-b border-sage-100">
          {!collapsed && (
            <Link href="/admin" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-sage-gradient rounded-lg flex items-center justify-center">
                <Leaf className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-xs font-bold text-sage-800 leading-tight">Rise With</p>
                <p className="text-xs font-bold text-sage-500 leading-tight">Rupali Admin</p>
              </div>
            </Link>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 rounded-lg hover:bg-sage-50 text-sage-500 transition-colors"
          >
            {collapsed ? <Menu className="w-4 h-4" /> : <X className="w-4 h-4" />}
          </button>
        </div>

        {/* Owner Badge */}
        {!collapsed && (
          <div className="mx-4 mt-4 px-3 py-2.5 bg-sage-50 rounded-xl border border-sage-100">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-sage-gradient rounded-lg flex items-center justify-center text-white text-xs font-bold">R</div>
              <div>
                <p className="text-xs font-semibold text-sage-800">Rupali</p>
                <span className="text-xs px-1.5 py-0.5 bg-sage-500 text-white rounded-full">Owner</span>
              </div>
            </div>
          </div>
        )}

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const active = isActive(item.href, item.exact);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`admin-nav-item ${active ? 'admin-nav-item-active' : 'admin-nav-item-inactive'}`}
                title={collapsed ? item.label : undefined}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Bottom actions */}
        <div className="px-3 pb-4 border-t border-sage-100 pt-3 space-y-1">
          <Link
            href="/"
            className="admin-nav-item admin-nav-item-inactive"
            title={collapsed ? 'View Site' : undefined}
          >
            <BarChart3 className="w-5 h-5 flex-shrink-0" />
            {!collapsed && <span>View Site</span>}
          </Link>
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="admin-nav-item admin-nav-item-inactive w-full text-red-500 hover:bg-red-50 hover:text-red-600"
            title={collapsed ? 'Sign Out' : undefined}
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {!collapsed && <span>Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-white border-b border-sage-100 shadow-soft h-14 flex items-center justify-between px-4">
        <Link href="/admin" className="flex items-center gap-2">
          <div className="w-7 h-7 bg-sage-gradient rounded-lg flex items-center justify-center">
            <Leaf className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-sage-800 text-sm">Admin</span>
        </Link>
        <div className="flex items-center gap-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`p-1.5 rounded-lg transition-colors ${
                isActive(item.href, item.exact) ? 'bg-sage-100 text-sage-700' : 'text-sage-500'
              }`}
              title={item.label}
            >
              <item.icon className="w-4 h-4" />
            </Link>
          ))}
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="p-1.5 rounded-lg text-red-400 hover:bg-red-50"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </>
  );
}
