'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Globe,
  Phone,
  MapPin,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  X,
} from 'lucide-react';
import { KUMUD_WHATSAPP_NUMBER } from '@/lib/whatsapp';

interface FooterProps {
  onOpenJoinModal?: () => void;
}

export default function Footer({ onOpenJoinModal }: FooterProps) {
  const [legalModalContent, setLegalModalContent] = useState<{
    title: string;
    body: string;
  } | null>(null);

  const openPrivacy = () => {
    setLegalModalContent({
      title: 'Privacy Policy (Demo & Draft Preview)',
      body: `IndiNiger BizHub — Global Business Marketplace\n\n1. Overview & Data Handling:\nThis website currently operates as an interactive demonstration prototype. Any business enquiries, member registrations, or event interest submitted through forms are transmitted directly to WhatsApp for real-time contact with Kumud Gameti. No sensitive user credentials or payment data are collected or sold.\n\n2. Founder & Contact:\nFor inquiries regarding the live platform launch or partnerships, contact Kumud Gameti (Founder / Business Contact) at +91 99901 55699.\n\n3. Future Commercial Operations:\nUpon official public deployment, comprehensive enterprise GDPR and data compliance policies governing cross-border trade communications will be formally audited and enacted.`,
    });
  };

  const openTerms = () => {
    setLegalModalContent({
      title: 'Terms & Conditions of Demo Preview',
      body: `IndiNiger BizHub — Global Business Marketplace\n\n1. Stated Vision Scope:\nIndiNiger BizHub has a stated vision of connecting 62 diverse business categories across 57 countries. Figures, sample business cards, and event previews featured on this preview represent demonstrative layouts designed for stakeholder evaluation and feedback.\n\n2. Non-Transactional Prototype:\nThis demonstration does not process live monetary transactions, escrow funding, or binding purchase orders. All listings labeled 'Sample Demo Business' are illustrative models.\n\n3. Intellectual Property:\nIndiNiger BizHub, its original branding identity, and design assets are property of IndiNiger BizHub. All third-party business trademarks and flags are shown strictly for geographical reference.`,
    });
  };

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 pt-16 pb-12 relative overflow-hidden">
      {/* Decorative gradient blur background */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Top Vibrant CTA Banner */}
        <div className="bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-700 rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden border border-white/10">
          <div className="max-w-3xl space-y-4">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>International Business Corridor</span>
            </span>
            <h3 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
              Ready to Connect Across 57 Global Markets & 62 Industries?
            </h3>
            <p className="text-sm sm:text-base text-blue-100 max-w-2xl leading-relaxed">
              Whether you are a manufacturer, exporter, builder, or investor, join Kumud Gameti’s global business network today and unlock cross-border trade opportunities.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onOpenJoinModal}
                className="bg-amber-400 hover:bg-amber-300 text-slate-950 px-6 py-3 rounded-xl text-xs font-extrabold flex items-center gap-2 shadow-lg shadow-amber-500/20 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-900" />
                <span>Join the Network Now</span>
              </button>
              <a
                href={`https://wa.me/${KUMUD_WHATSAPP_NUMBER}?text=${encodeURIComponent(
                  'Hello Kumud Gameti, I would like to partner with IndiNiger BizHub.'
                )}`}
                target="_top"
                rel="noopener noreferrer"
                className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg transition-all"
              >
                <Phone className="w-4 h-4" />
                <span>Chat with Kumud Gameti on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* 5-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-2xl overflow-hidden shadow-lg shadow-amber-500/20 border border-amber-400/40 bg-slate-950 flex items-center justify-center p-0.5 shrink-0">
                <img
                  src="/logo.jpg"
                  alt="IndiNiger BizHub Official Logo"
                  className="w-full h-full object-cover rounded-[14px]"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tight text-white flex items-center gap-1.5 leading-tight">
                  <span>IndiNiger</span>
                  <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-red-500 bg-clip-text text-transparent">
                    BizHub
                  </span>
                </span>
                <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                  Global Business Marketplace
                </span>
              </div>
            </Link>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              <span className="text-amber-400 font-semibold">"One Roof. Every Business. Global Opportunities."</span>
              <br />
              Bridging diverse industries, cross-border suppliers, global exhibitions, and emerging bilateral trading hubs.
            </p>

            <div className="pt-2 text-xs text-slate-400 space-y-1.5">
              <div>
                <span className="text-slate-500 font-semibold">Founder & Business Contact:</span>{' '}
                <span className="text-white font-bold">Kumud Gameti</span>
              </div>
              <div>
                <span className="text-slate-500 font-semibold">Stated Vision Scope:</span>{' '}
                <span className="text-amber-400 font-bold">62 Categories &middot; 57 Countries</span>{' '}
                <span className="text-[10px] text-slate-500 font-normal">(Stated client vision)</span>
              </div>
            </div>
          </div>

          {/* Col 1: Explore Industries */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-blue-400 mb-4 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              <span>Explore Industries</span>
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li>
                <Link href="/industries#property-real-estate" className="hover:text-blue-400 transition-colors">
                  Property & Real Estate
                </Link>
              </li>
              <li>
                <Link href="/industries#construction-infrastructure" className="hover:text-orange-400 transition-colors">
                  Construction & Infrastructure
                </Link>
              </li>
              <li>
                <Link href="/industries#architecture-interior-design" className="hover:text-purple-400 transition-colors">
                  Architecture & Design
                </Link>
              </li>
              <li>
                <Link href="/industries#defence-industrial-solutions" className="hover:text-red-400 transition-colors">
                  Defence & Security
                </Link>
              </li>
              <li>
                <Link href="/industries#machinery-industrial-equipment" className="hover:text-blue-400 transition-colors">
                  Machinery & Equipment
                </Link>
              </li>
              <li>
                <Link href="/industries#fashion-apparel" className="hover:text-pink-400 transition-colors">
                  Fashion & Apparel
                </Link>
              </li>
              <li>
                <Link href="/industries" className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 pt-1">
                  <span>View All 17+ Industries</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 2: Global Corridors */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-4 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Global Network</span>
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li>
                <Link href="/global-network" className="hover:text-emerald-400 transition-colors">
                  57-Country Directory
                </Link>
              </li>
              <li>
                <Link href="/directory" className="hover:text-emerald-400 transition-colors">
                  Verified Business Directory
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-emerald-400 transition-colors">
                  Exhibitions & Trade Shows
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-emerald-400 transition-colors">
                  About Kumud Gameti Vision
                </Link>
              </li>
              <li>
                <button
                  onClick={onOpenJoinModal}
                  className="hover:text-amber-400 transition-colors text-left font-bold text-amber-400"
                >
                  Become an Accredited Member
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Coordinates & Support */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-4 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>Direct WhatsApp Desk</span>
            </h4>
            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Global Secretariat: New Delhi & Niamey Hub Corridors</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={`https://wa.me/${KUMUD_WHATSAPP_NUMBER}`}
                  target="_top"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5 flex-wrap sm:flex-nowrap"
                >
                  <span className="font-bold text-white">Kumud Gameti:</span>
                  <span className="text-emerald-400 font-bold font-mono whitespace-nowrap">+91 99901 55699</span>
                </a>
              </li>
              <li className="pt-2">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/10 transition-colors"
                >
                  <span>Open Contact Desk</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            &copy; {new Date().getFullYear()} IndiNiger BizHub. All rights reserved. Founder: Kumud Gameti.
          </p>
          <div className="flex items-center gap-6">
            <button
              onClick={openPrivacy}
              className="hover:text-slate-300 transition-colors underline cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              onClick={openTerms}
              className="hover:text-slate-300 transition-colors underline cursor-pointer"
            >
              Terms & Conditions
            </button>
          </div>
        </div>
      </div>

      {/* Legal Dialog */}
      {legalModalContent && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-lg w-full p-6 text-slate-100 shadow-2xl relative space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-base text-white">{legalModalContent.title}</h3>
              <button
                onClick={() => setLegalModalContent(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="text-xs text-slate-300 whitespace-pre-line leading-relaxed max-h-96 overflow-y-auto">
              {legalModalContent.body}
            </div>
            <div className="pt-2 text-right">
              <button
                onClick={() => setLegalModalContent(null)}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
