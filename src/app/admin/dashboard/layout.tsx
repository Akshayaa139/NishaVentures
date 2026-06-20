'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Inbox, 
  Image as ImageIcon, 
  FileText, 
  LogOut, 
  ExternalLink,
  Menu,
  X,
  FlaskConical
} from 'lucide-react';
import { Button } from '@/components/ui/core';

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { name: 'Overview', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Products', href: '/admin/dashboard/products', icon: ShoppingBag },
    { name: 'Inquiries', href: '/admin/dashboard/inquiries', icon: Inbox },
    { name: 'Gallery', href: '/admin/dashboard/gallery', icon: ImageIcon },
    { name: 'Site Content', href: '/admin/dashboard/content', icon: FileText },
  ];

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/admin/login');
      router.refresh();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row">
      {/* Mobile Top Bar */}
      <div className="md:hidden bg-slate-900 text-white flex items-center justify-between p-4 flex-shrink-0 z-30">
        <Link href="/admin/dashboard" className="flex items-center space-x-2">
          <FlaskConical className="h-5 w-5 text-emerald-400" />
          <span className="font-bold tracking-tight text-sm">Nisha Ventures Admin</span>
        </Link>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-1 text-slate-400 hover:text-white"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed md:sticky top-0 left-0 bottom-0 z-20 w-64 bg-slate-900 text-slate-400 flex flex-col justify-between border-r border-slate-800 transition-transform duration-300 transform md:transform-none ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        } h-screen`}
      >
        <div className="flex flex-col flex-1 overflow-y-auto">
          {/* Sidebar Header */}
          <div className="p-6 border-b border-slate-850 flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <FlaskConical className="h-4.5 w-4.5 text-white" />
            </div>
            <div>
              <span className="text-white font-extrabold tracking-tight text-sm block">Nisha Ventures</span>
              <span className="text-[10px] text-emerald-400 uppercase tracking-wider font-bold block">Admin Dashboard</span>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="p-4 space-y-1.5 flex-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-2.5 rounded-lg text-xs font-semibold tracking-wide transition-colors ${
                    isActive
                      ? 'bg-slate-800 text-white font-bold'
                      : 'hover:bg-slate-850 hover:text-slate-200'
                  }`}
                >
                  <Icon className="h-4.5 w-4.5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-850 space-y-2">
          {/* Main website link */}
          <Link
            href="/"
            target="_blank"
            className="flex items-center space-x-3 px-4 py-2.5 rounded-lg text-xs font-semibold hover:bg-slate-850 hover:text-slate-200"
          >
            <ExternalLink className="h-4.5 w-4.5" />
            <span>Visit Live Site</span>
          </Link>
          
          {/* Log Out button */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg text-xs font-semibold text-red-400 hover:bg-red-950/20 hover:text-red-300 transition-colors"
          >
            <LogOut className="h-4.5 w-4.5" />
            <span>Log Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-h-[calc(100vh-60px)] md:min-h-screen overflow-y-auto p-6 md:p-10">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
      
      {/* Backdrop overlay for mobile menu drawer */}
      {mobileMenuOpen && (
        <div 
          onClick={() => setMobileMenuOpen(false)} 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs md:hidden z-10"
        />
      )}
    </div>
  );
}
