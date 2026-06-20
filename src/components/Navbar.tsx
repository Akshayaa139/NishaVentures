'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ShieldAlert, FlaskConical } from 'lucide-react';
import { Button } from './ui/core';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Products', href: '/products' },
    { name: 'Research Info', href: '/research' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Contact Us', href: '/contact' },
  ];

  const isHome = pathname === '/';
  const isDarkTheme = isHome && !scrolled;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled || !isHome
          ? 'bg-white/80 backdrop-blur-md border-b border-slate-100 shadow-sm py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          {/* Logo Section */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-blue-600 flex items-center justify-center shadow-md shadow-emerald-500/10 group-hover:scale-105 transition-transform">
              <FlaskConical className="h-5 w-5 text-white" />
            </div>
            <div>
              <span className={`text-lg font-bold tracking-tight block transition-colors ${
                isDarkTheme ? 'text-white' : 'text-slate-800'
              }`}>
                Nisha Ventures
              </span>
              <span className={`text-[10px] font-semibold tracking-wider uppercase block -mt-1 transition-colors ${
                isDarkTheme ? 'text-emerald-400' : 'text-emerald-600'
              }`}>
                Biotech Models
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <div className="flex space-x-6">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`text-sm font-medium transition-colors ${
                      isActive 
                        ? (isDarkTheme ? 'text-emerald-400 font-semibold' : 'text-emerald-600 font-semibold')
                        : (isDarkTheme ? 'text-slate-200 hover:text-white' : 'text-slate-600 hover:text-slate-900')
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>
            <Link href="/admin/dashboard">
              <Button 
                variant="outline" 
                size="sm" 
                className={`flex items-center space-x-1.5 transition-all ${
                  isDarkTheme 
                    ? 'bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/30' 
                    : 'border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <ShieldAlert className={`h-4 w-4 ${isDarkTheme ? 'text-slate-300' : 'text-slate-400'}`} />
                <span>Admin Login</span>
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`inline-flex items-center justify-center p-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                isDarkTheme 
                  ? 'text-slate-200 hover:text-white hover:bg-white/10' 
                  : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
              }`}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-md border-b border-slate-100 animate-in slide-in-from-top duration-200">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2.5 rounded-lg text-base font-medium transition-colors ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-700 font-semibold'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            <div className="pt-4 pb-2 border-t border-slate-100 px-3">
              <Link href="/admin/dashboard" onClick={() => setIsOpen(false)}>
                <Button className="w-full flex items-center justify-center space-x-2" variant="outline">
                  <ShieldAlert className="h-4 w-4" />
                  <span>Admin Login</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
