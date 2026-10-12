'use client';

import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { KUMUD_WHATSAPP_NUMBER } from '@/lib/whatsapp';

export default function FloatingWhatsAppButton() {
  const defaultWhatsAppUrl = `https://wa.me/${KUMUD_WHATSAPP_NUMBER}?text=${encodeURIComponent(
    'Hello Kumud Gameti, I am visiting the IndiNiger BizHub platform and would like to connect regarding business opportunities.'
  )}`;

  return (
    <aside
      aria-label="Direct WhatsApp contact with Kumud Gameti"
      className="fixed bottom-5 right-5 z-50 flex items-center gap-3 group animate-in fade-in slide-in-from-bottom-5 duration-300"
    >
      {/* Tooltip on desktop */}
      <div className="hidden sm:flex flex-col items-end bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-xl border border-emerald-200 text-xs transition-all group-hover:scale-105">
        <span className="font-bold text-slate-900 flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Online on WhatsApp</span>
        </span>
        <span className="text-[11px] text-slate-500 font-medium">Kumud Gameti &middot; +91 99901 55699</span>
      </div>

      {/* Floating CTA Button */}
      <a
        href={defaultWhatsAppUrl}
        target="_top"
        rel="noopener noreferrer"
        aria-label="Direct WhatsApp chat with Kumud Gameti"
        className="relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-emerald-600 to-green-500 text-white shadow-2xl shadow-emerald-600/40 hover:scale-110 active:scale-95 transition-all duration-200 border-2 border-white focus:outline-none focus:ring-4 focus:ring-emerald-400/40"
      >
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-400 border-2 border-white"></span>
        </span>
        <Phone className="w-6 h-6 sm:w-7 sm:h-7" />
      </a>
    </aside>
  );
}
