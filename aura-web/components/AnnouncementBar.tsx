'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Phone } from 'lucide-react';
import { KUMUD_WHATSAPP_NUMBER } from '@/lib/whatsapp';

interface AnnouncementBarProps {
  onOpenJoinModal?: () => void;
}

export default function AnnouncementBar({ onOpenJoinModal }: AnnouncementBarProps) {
  return (
    <div className="bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-700 text-xs text-white py-2 px-3 sm:px-4 relative z-50 shadow-sm">
      <div className="max-w-7xl mx-auto">
        {/* Mobile View: Clean, sleek, single line bar */}
        <div className="sm:hidden flex items-center justify-between gap-2 text-[11px]">
          <div className="flex items-center gap-1.5 truncate">
            <span className="flex h-2 w-2 relative shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-300 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-300"></span>
            </span>
            <span className="font-bold text-amber-300 uppercase tracking-wider text-[10px]">
              Global 57:
            </span>
            <span className="truncate text-white/95 font-medium">
              Connecting 57 Countries & 62 Industries
            </span>
          </div>

          <a
            href={`https://wa.me/${KUMUD_WHATSAPP_NUMBER}`}
            target="_top"
            rel="noopener noreferrer"
            className="shrink-0 bg-emerald-500/30 hover:bg-emerald-500/40 text-emerald-200 border border-emerald-400/40 px-2 py-0.5 rounded-full font-bold text-[10px] flex items-center gap-1 transition-colors"
          >
            <Phone className="w-2.5 h-2.5" />
            <span>Chat</span>
          </a>
        </div>

        {/* Desktop View: Full rich layout */}
        <div className="hidden sm:flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-300 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-300"></span>
            </span>
            <span className="bg-white/20 text-white font-bold uppercase tracking-wider text-[10px] px-2 py-0.5 rounded-full">
              Global Vision 2026
            </span>
            <span className="text-white/95 font-medium">
              Connecting Businesses. Creating Global Opportunities Across 57 Countries & 62 Industries.
            </span>
          </div>

          <div className="flex items-center gap-3 text-[11px] font-medium">
            <a
              href={`https://wa.me/${KUMUD_WHATSAPP_NUMBER}`}
              target="_top"
              rel="noopener noreferrer"
              className="text-amber-200 hover:text-white flex items-center gap-1 transition-colors font-bold whitespace-nowrap"
            >
              <Phone className="w-3 h-3 text-emerald-300" />
              <span>WhatsApp: +91 99901 55699</span>
            </a>
            <span className="text-white/30">|</span>
            <Link
              href="/contact"
              className="hover:text-amber-200 transition-colors flex items-center gap-1 text-white/90 whitespace-nowrap"
            >
              <span>Contact Secretariat</span>
            </Link>
            <span className="text-white/30">|</span>
            <button
              onClick={onOpenJoinModal}
              className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 group cursor-pointer shadow-sm transition-all whitespace-nowrap"
            >
              <Sparkles className="w-3 h-3 text-amber-900" />
              <span>Join Our Network</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
