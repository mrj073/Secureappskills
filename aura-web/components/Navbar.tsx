'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Globe,
  ChevronDown,
  Menu,
  X,
  Sparkles,
  ArrowRight,
  Phone,
} from 'lucide-react';
import { CATEGORIES_DATA } from '@/data/categories';
import { KUMUD_WHATSAPP_NUMBER } from '@/lib/whatsapp';

interface NavbarProps {
  onOpenJoinModal: () => void;
  onOpenDemoDrawer?: () => void;
}

export default function Navbar({ onOpenJoinModal }: NavbarProps) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [industriesOpen, setIndustriesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Explore Businesses', href: '/directory' },
    { label: 'Industries', href: '/industries', hasDropdown: true },
    { label: 'Global Network', href: '/global-network' },
    { label: 'Exhibitions & Events', href: '/events' },
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-slate-200/80 py-2 sm:py-2.5'
          : 'bg-white/90 backdrop-blur-sm border-b border-slate-100 py-2.5 sm:py-3'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2 lg:gap-4">
          {/* Official Logo with 3D Emblem */}
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group shrink-0">
            <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-2xl overflow-hidden shadow-md shadow-amber-500/20 group-hover:scale-105 transition-all border border-amber-400/40 bg-slate-950 flex items-center justify-center p-0.5 shrink-0">
              <img
                src="/logo.jpg"
                alt="IndiNiger BizHub Official Logo"
                className="w-full h-full object-cover rounded-[14px]"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-black tracking-tight text-slate-900 flex items-center gap-1 leading-tight">
                <span>IndiNiger</span>
                <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-600 bg-clip-text text-transparent font-black">
                  BizHub
                </span>
              </span>
              <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-slate-500 font-bold whitespace-nowrap">
                Global Business Marketplace
              </span>
            </div>
          </Link>

          {/* Desktop Navigation — Systematic & Perfectly Aligned */}
          <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              if (link.hasDropdown) {
                return (
                  <div
                    key={link.href}
                    className="relative"
                    onMouseEnter={() => setIndustriesOpen(true)}
                    onMouseLeave={() => setIndustriesOpen(false)}
                  >
                    <button
                      className={`inline-flex items-center gap-1 h-8 xl:h-9 px-2 xl:px-2.5 rounded-xl text-xs xl:text-[13px] font-bold whitespace-nowrap transition-all border ${
                        isActive || pathname.startsWith('/industries')
                          ? 'text-blue-600 bg-blue-50/90 border-blue-200 shadow-xs'
                          : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50 border-transparent'
                      }`}
                      onClick={() => setIndustriesOpen(!industriesOpen)}
                    >
                      <span className="whitespace-nowrap">{link.label}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 shrink-0 ${
                          industriesOpen ? 'rotate-180 text-blue-600' : 'text-slate-400'
                        }`}
                      />
                    </button>

                    {/* Mega Dropdown */}
                    {industriesOpen && (
                      <div className="absolute top-full left-0 w-88 bg-white/95 backdrop-blur-xl border border-slate-200 rounded-2xl shadow-2xl p-3.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                        <div className="px-3 py-2 border-b border-slate-100 flex items-center justify-between mb-1.5">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-700">
                            62 Stated Categories
                          </span>
                          <span className="text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full font-bold">
                            17 Starter Sectors
                          </span>
                        </div>
                        <div className="max-h-80 overflow-y-auto py-1 space-y-1">
                          {CATEGORIES_DATA.slice(0, 10).map((cat) => (
                            <Link
                              key={cat.id}
                              href={`/industries#${cat.slug}`}
                              onClick={() => setIndustriesOpen(false)}
                              className="flex items-center justify-between px-3 py-2 rounded-xl hover:bg-slate-50 text-xs text-slate-800 hover:text-blue-600 transition-colors group"
                            >
                              <div className="flex items-center gap-2 truncate">
                                <span
                                  className="w-2.5 h-2.5 rounded-full shrink-0"
                                  style={{ backgroundColor: cat.theme.primary }}
                                />
                                <span className="truncate font-medium">{cat.name}</span>
                              </div>
                              <span className="text-[10px] text-slate-400 font-mono font-semibold group-hover:text-blue-600 shrink-0 ml-2">
                                {cat.businessCount}+
                              </span>
                            </Link>
                          ))}
                        </div>
                        <div className="pt-2 border-t border-slate-100 mt-2">
                          <Link
                            href="/industries"
                            onClick={() => setIndustriesOpen(false)}
                            className="flex items-center justify-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 py-2 rounded-xl hover:bg-blue-50 transition-colors"
                          >
                            <span>Explore All 17+ Industries</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`inline-flex items-center h-8 xl:h-9 px-2 xl:px-2.5 rounded-xl text-xs xl:text-[13px] font-bold whitespace-nowrap transition-all border ${
                    isActive
                      ? 'text-blue-600 bg-blue-50/90 border-blue-200 shadow-xs'
                      : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50 border-transparent'
                  }`}
                >
                  <span className="whitespace-nowrap">{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden lg:flex items-center gap-2.5 shrink-0">
            {/* Direct WhatsApp link */}
            <a
              href={`https://wa.me/${KUMUD_WHATSAPP_NUMBER}`}
              target="_top"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-xl border border-emerald-300 bg-emerald-50 text-emerald-800 text-xs font-bold hover:bg-emerald-100 transition-colors whitespace-nowrap shadow-xs"
              title="Direct WhatsApp with Kumud Gameti"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>WhatsApp</span>
            </a>

            {/* Bright Join Network Button — Fully Visible & Prominent */}
            <button
              onClick={onOpenJoinModal}
              className="h-9 bg-gradient-to-r from-blue-600 via-indigo-600 to-amber-500 hover:from-blue-700 hover:to-amber-600 text-white px-4 rounded-xl text-xs font-extrabold inline-flex items-center gap-1.5 cursor-pointer shadow-md shadow-blue-500/20 hover:scale-[1.02] active:scale-95 transition-all whitespace-nowrap shrink-0"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-200 shrink-0" />
              <span>Join the Network</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href={`https://wa.me/${KUMUD_WHATSAPP_NUMBER}`}
              target="_top"
              rel="noopener noreferrer"
              className="p-2 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200"
              title="Chat on WhatsApp"
            >
              <Phone className="w-4 h-4" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 border-t border-slate-200 pb-3 space-y-1 animate-in slide-in-from-top-3 duration-200">
            {/* Brand Card in Mobile Drawer */}
            <div className="p-3 mb-2 rounded-2xl bg-gradient-to-r from-slate-900 to-indigo-950 text-white flex items-center gap-3 border border-amber-400/30">
              <div className="w-12 h-12 rounded-xl overflow-hidden border border-amber-400/60 bg-black shrink-0 p-0.5">
                <img
                  src="/logo.jpg"
                  alt="Official Logo"
                  className="w-full h-full object-cover rounded-[10px]"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-black tracking-tight text-white flex items-center gap-1">
                  <span>IndiNiger</span>
                  <span className="text-amber-400">BizHub</span>
                </span>
                <span className="text-[10px] text-slate-300">
                  Global Business Marketplace &middot; 57 Countries
                </span>
              </div>
            </div>

            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3.5 py-2.5 rounded-xl text-sm font-bold transition-colors ${
                  pathname === link.href
                    ? 'text-blue-600 bg-blue-50 font-bold border border-blue-200'
                    : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'
                }`}
              >
                {link.label}
              </Link>
            ))}

            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              {/* WhatsApp direct line card in mobile menu */}
              <a
                href={`https://wa.me/${KUMUD_WHATSAPP_NUMBER}`}
                target="_top"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 px-3 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-bold flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>WhatsApp Kumud Gameti</span>
                </div>
                <span className="font-mono text-[11px] bg-emerald-200/80 px-2 py-0.5 rounded-md whitespace-nowrap">
                  +91 99901 55699
                </span>
              </a>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenJoinModal();
                }}
                className="bg-gradient-to-r from-blue-600 via-indigo-600 to-amber-500 text-white w-full py-3 rounded-xl text-center text-xs font-bold shadow-md flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Join the Network</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
