'use client';

import React from 'react';
import Link from 'next/link';
import {
  Globe,
  Sparkles,
  ShieldCheck,
  Building2,
  Users2,
  ArrowRight,
  TrendingUp,
  Award,
  Layers,
  Briefcase,
  Phone,
} from 'lucide-react';
import { useModals } from '@/components/ClientLayoutWrapper';
import { KUMUD_WHATSAPP_NUMBER } from '@/lib/whatsapp';

export default function AboutPage() {
  const { openEnquiryModal } = useModals();

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Vibrant Gradient Header with Official Logo */}
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 rounded-3xl p-8 sm:p-14 text-white relative overflow-hidden shadow-xl border border-white/10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
            <div className="max-w-3xl space-y-5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold border border-white/30 backdrop-blur-xs">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>THE INDINIGER BIZHUB STORY & VISION</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
                Bringing Industries Together.{' '}
                <span className="bg-gradient-to-r from-amber-300 via-pink-300 to-cyan-300 bg-clip-text text-transparent block">
                  Opening Doors to Global Opportunities.
                </span>
              </h1>
              <p className="text-sm sm:text-lg text-blue-100 leading-relaxed">
                IndiNiger BizHub is a global business marketplace envisioned to connect diverse industrial sectors, manufacturers, suppliers, investors, and service providers across international boundaries.
              </p>
            </div>
            {/* Official Logo emblem */}
            <div className="flex relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden shadow-2xl border-2 border-amber-400/50 bg-slate-950 p-1 shrink-0">
              <img src="/logo.jpg" alt="Official Logo" className="w-full h-full object-cover rounded-xl" />
            </div>
          </div>
        </div>

        {/* Founder & Leadership Spotlight */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5">
              <div className="rounded-3xl p-1 bg-gradient-to-br from-blue-600 via-indigo-600 to-amber-500 shadow-xl overflow-hidden">
                <div className="bg-gradient-to-b from-slate-900 to-slate-950 rounded-[22px] p-6 text-center space-y-4 text-white">
                  {/* Portrait with official emblem badge */}
                  <div className="relative mx-auto w-48 h-56 sm:w-56 sm:h-64 rounded-2xl overflow-hidden shadow-2xl border-2 border-amber-400/80 bg-slate-900 group">
                    <img
                      src="/kumud-gameti.jpg"
                      alt="Kumud Gameti — Founder & Business Contact"
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                    />
                    {/* Floating official logo badge at corner */}
                    <div className="absolute bottom-2.5 right-2.5 w-10 h-10 rounded-xl overflow-hidden border-2 border-amber-400 bg-slate-950 p-0.5 shadow-xl">
                      <img src="/logo.jpg" alt="Official Logo" className="w-full h-full object-cover rounded-lg" />
                    </div>
                  </div>

                  <div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-[11px] font-bold border border-amber-400/30 mb-2">
                      <Sparkles className="w-3 h-3 text-amber-300" />
                      <span>FOUNDER & BUSINESS CONTACT</span>
                    </div>
                    <h3 className="text-2xl font-black text-white">Kumud Gameti</h3>
                    <p className="text-xs text-slate-300 mt-1">
                      Strategic Trade Leadership & Global Vision
                    </p>
                  </div>

                  <div className="p-3 bg-white/10 rounded-xl border border-white/10 text-xs text-blue-100 leading-relaxed text-left">
                    Guiding the strategic vision to unify 62 commercial categories and facilitate trade corridors across 57 countries.
                  </div>

                  <a
                    href={`https://wa.me/${KUMUD_WHATSAPP_NUMBER}`}
                    target="_top"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all active:scale-95"
                  >
                    <Phone className="w-4 h-4 shrink-0" />
                    <span>WhatsApp Desk:</span>
                    <span className="font-mono font-bold whitespace-nowrap">+91 99901 55699</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-5">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 block">
                LEADERSHIP & VISION STATEMENT
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-snug">
                One Platform Connecting Entrepreneurs, Suppliers, and Global Investors
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                As founder and principal coordinator, <strong>Kumud Gameti</strong> identified the friction that mid-market enterprises face when expanding into cross-border corridors—particularly between the manufacturing might of India, the natural resource and agriculture potential of Niger and West Africa, and wider international consumer centers.
              </p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                IndiNiger BizHub serves as the central digital hub where business owners do not need to navigate disjointed directories or obscure middlemen. By consolidating 62 categories and 57 country corridors, the platform enables direct business relationships.
              </p>

              <div className="pt-2 flex flex-wrap gap-4">
                <button
                  onClick={() => openEnquiryModal({
                    title: 'Strategic Consultation with Secretariat',
                    subtitle: 'Submit an executive proposal to Kumud Gameti.',
                    type: 'general_contact',
                  })}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl text-xs font-bold shadow-md cursor-pointer transition-all"
                >
                  Request Consultation
                </button>
                <Link
                  href="/contact"
                  className="px-6 py-3 rounded-xl border-2 border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-100 text-xs font-bold transition-all"
                >
                  View Contact Desk
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Pillar Cards with Vibrant Styling */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-7 border-2 border-amber-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white flex items-center justify-center shadow-md">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-slate-900">Multi-Sector Synergy</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              62 business categories operating under one cohesive digital umbrella, allowing cross-pollination between industrial suppliers and consumer distributors.
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl p-7 border-2 border-blue-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 text-white flex items-center justify-center shadow-md">
              <Globe className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-slate-900">57-Country Vision</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Targeting bilateral trade corridors with special emphasis on bridging India and Niger with African, Middle Eastern, and international trading hubs.
            </p>
          </div>

          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl p-7 border-2 border-emerald-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center shadow-md">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-slate-900">Direct WhatsApp Inquiries</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Zero backend delay &mdash; every business lead and partnership request immediately connects directly to Kumud Gameti on WhatsApp (+91 99901 55699).
            </p>
          </div>
        </div>

        {/* Vision Roadmap & Statement of Truth */}
        <div className="bg-gradient-to-br from-slate-900 to-indigo-950 rounded-3xl p-8 sm:p-12 text-white border border-slate-800 space-y-6 shadow-xl">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              FOUNDATIONAL TRANSPARENCY
            </span>
            <h2 className="text-2xl sm:text-3xl font-black">
              Our Vision Milestones & Commitment
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              The target figures of <strong>62 categories</strong> and <strong>57 countries</strong> represent the client's stated ambition for the platform. This demonstration website proves technical readiness, interactive discovery workflows, and multi-sector cataloguing before large-scale commercial deployment.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800 text-xs">
            <div className="p-4 bg-white/10 rounded-2xl border border-white/10 space-y-1">
              <span className="text-amber-400 font-bold font-mono text-lg block">Phase 1 (Current)</span>
              <span className="font-bold text-white">Interactive Demo & Architecture</span>
              <p className="text-[11px] text-slate-300">17 starter categories, 57-country database, working enquiry forms, and instant WhatsApp dispatch.</p>
            </div>

            <div className="p-4 bg-white/10 rounded-2xl border border-white/10 space-y-1">
              <span className="text-cyan-400 font-bold font-mono text-lg block">Phase 2 (Upcoming)</span>
              <span className="font-bold text-white">Accredited Member Onboarding</span>
              <p className="text-[11px] text-slate-300">Verification of company legal records, chamber certificates, and product catalogues.</p>
            </div>

            <div className="p-4 bg-white/10 rounded-2xl border border-white/10 space-y-1">
              <span className="text-emerald-400 font-bold font-mono text-lg block">Phase 3 (Scale)</span>
              <span className="font-bold text-white">Cross-Border Escrow & Expos</span>
              <p className="text-[11px] text-slate-300">International physical exhibition pavilions, hosted buyer meetings, and multi-currency trade facilitation.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
