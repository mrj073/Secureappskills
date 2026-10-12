'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Globe,
  ArrowRight,
  Sparkles,
  Building2,
  TrendingUp,
  ShieldCheck,
  Calendar,
  Layers,
  MapPin,
  Compass,
  HardHat,
  Hammer,
  Shirt,
  Cog,
  Factory,
  Globe2,
  ArrowLeftRight,
  Briefcase,
  Cpu,
  Truck,
  CheckCircle2,
  Users2,
  ChevronRight,
  Search,
  ShoppingCart,
  Send,
  User,
  Phone,
  Ticket,
  Eye,
  Award,
} from 'lucide-react';
import { CATEGORIES_DATA, Category } from '@/data/categories';
import { COUNTRIES_DATA } from '@/data/countries';
import { SAMPLE_EVENTS } from '@/data/events';
import { useModals } from '@/components/ClientLayoutWrapper';
import { saveEnquiry } from '@/lib/demoStorage';
import { dispatchToWhatsApp, KUMUD_WHATSAPP_NUMBER } from '@/lib/whatsapp';
import confetti from 'canvas-confetti';

// Helper to render icon by name
function CategoryIcon({ name, className = 'w-6 h-6' }: { name: string; className?: string }) {
  switch (name) {
    case 'Building2': return <Building2 className={className} />;
    case 'Compass': return <Compass className={className} />;
    case 'HardHat': return <HardHat className={className} />;
    case 'Hammer': return <Hammer className={className} />;
    case 'ShieldCheck': return <ShieldCheck className={className} />;
    case 'Shirt': return <Shirt className={className} />;
    case 'Sparkles': return <Sparkles className={className} />;
    case 'Layers': return <Layers className={className} />;
    case 'Cog': return <Cog className={className} />;
    case 'Factory': return <Factory className={className} />;
    case 'Globe2': return <Globe2 className={className} />;
    case 'ArrowLeftRight': return <ArrowLeftRight className={className} />;
    case 'Calendar': return <Calendar className={className} />;
    case 'Briefcase': return <Briefcase className={className} />;
    case 'Cpu': return <Cpu className={className} />;
    case 'Truck': return <Truck className={className} />;
    case 'TrendingUp': return <TrendingUp className={className} />;
    default: return <Building2 className={className} />;
  }
}

export default function HomePage() {
  const { openEnquiryModal, openFeatureModal } = useModals();

  // Search & sector filter for Section E
  const [categorySearch, setCategorySearch] = useState('');
  const [selectedSector, setSelectedSector] = useState<string>('All');

  // Country selector interactive state for Section F
  const [selectedCountryCode, setSelectedCountryCode] = useState('IN');
  const activeCountry = COUNTRIES_DATA.find((c) => c.code === selectedCountryCode) || COUNTRIES_DATA[0];

  // Inline Quick Contact state for Section M
  const [contactState, setContactState] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    industry: 'Construction & Infrastructure',
    country: 'India',
    message: '',
  });

  const [contactErrors, setContactErrors] = useState<Record<string, string>>({});
  const [contactSuccess, setContactSuccess] = useState(false);
  const [contactRef, setContactRef] = useState<string>('');
  const [contactWaUrl, setContactWaUrl] = useState<string>('');

  // Filter categories
  const filteredCategories = CATEGORIES_DATA.filter((cat) => {
    const matchesSearch =
      cat.name.toLowerCase().includes(categorySearch.toLowerCase()) ||
      cat.description.toLowerCase().includes(categorySearch.toLowerCase());
    const matchesSector = selectedSector === 'All' || cat.sector === selectedSector;
    return matchesSearch && matchesSector;
  });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!contactState.name.trim()) errs.name = 'Full name is required';
    if (!contactState.company.trim()) errs.company = 'Company name is required';
    if (!contactState.email.trim() || !contactState.email.includes('@')) errs.email = 'Valid corporate email required';
    if (!contactState.message.trim() || contactState.message.length < 10) errs.message = 'Please provide message details';

    if (Object.keys(errs).length > 0) {
      setContactErrors(errs);
      return;
    }

    const saved = saveEnquiry({
      type: 'general_contact',
      fullName: contactState.name,
      companyName: contactState.company,
      email: contactState.email,
      phone: contactState.phone || undefined,
      industry: contactState.industry,
      country: contactState.country,
      message: contactState.message,
    });

    const waUrl = dispatchToWhatsApp({
      fullName: contactState.name,
      companyName: contactState.company,
      email: contactState.email,
      phone: contactState.phone || undefined,
      industry: contactState.industry,
      country: contactState.country,
      message: contactState.message,
      type: 'general_contact',
    });
    setContactWaUrl(waUrl);

    setContactRef(saved.id);
    setContactSuccess(true);
    try {
      confetti({ particleCount: 50, spread: 60 });
    } catch {
      //
    }
  };

  return (
    <div className="flex flex-col w-full overflow-hidden bg-slate-50">
      {/* ============================================================ */}
      {/* SECTION C: ULTRA-COLOURFUL HERO SECTION */}
      {/* ============================================================ */}
      <section className="relative text-white pt-12 pb-20 lg:pt-20 lg:pb-28 overflow-hidden bg-gradient-to-br from-blue-900 via-indigo-950 to-purple-950">
        {/* Vibrant animated gradient backdrops & ambient glows */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-500/25 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-10 right-1/4 w-72 h-72 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              {/* Badge with Official 3D Logo Emblem */}
              <div className="flex items-center gap-3">
                <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden shadow-2xl border-2 border-amber-400 bg-slate-950 p-0.5 shrink-0 hover:scale-105 transition-transform">
                  <img
                    src="/logo.jpg"
                    alt="IndiNiger BizHub Official Logo"
                    className="w-full h-full object-cover rounded-[14px]"
                  />
                </div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-amber-300 text-xs font-bold tracking-wider uppercase shadow-md">
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>GLOBAL BUSINESS MARKETPLACE &middot; 57 COUNTRIES</span>
                </div>
              </div>

              {/* Exact Requested Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-white">
                One Global Platform.{' '}
                <span className="bg-gradient-to-r from-amber-300 via-pink-400 to-cyan-300 bg-clip-text text-transparent">
                  Endless Business Possibilities.
                </span>
              </h1>

              {/* Supporting Text */}
              <p className="text-base sm:text-lg text-slate-200 max-w-2xl leading-relaxed">
                Discover industries, connect with businesses, explore international opportunities and grow beyond borders through IndiNiger BizHub.
              </p>

              {/* 3 Colourful CTA Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                {/* 1. Explore Businesses */}
                <Link
                  href="/directory"
                  className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-extrabold flex items-center gap-2 shadow-lg shadow-blue-500/30 hover:scale-[1.02] active:scale-95 transition-all"
                >
                  <Building2 className="w-4 h-4" />
                  <span>Explore Businesses</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                {/* 2. Join the Network */}
                <button
                  onClick={() => openEnquiryModal({
                    title: 'Join IndiNiger Global Business Network',
                    subtitle: 'Gain direct accreditation and multilateral trading access.',
                    type: 'join_network',
                  })}
                  className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 hover:from-amber-500 hover:to-orange-500 text-slate-950 px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-extrabold flex items-center gap-2 shadow-lg shadow-amber-500/30 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-amber-950" />
                  <span>Join the Network</span>
                </button>

                {/* 3. Discover Global Opportunities */}
                <Link
                  href="/global-network"
                  className="bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md px-5 py-3.5 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 hover:scale-[1.02] active:scale-95 transition-all"
                >
                  <Globe2 className="w-4 h-4 text-cyan-300" />
                  <span>Discover Global Opportunities</span>
                </Link>
              </div>

              {/* Direct Founder WhatsApp Quick Badge */}
              <div className="pt-2 flex items-center gap-3">
                <a
                  href={`https://wa.me/${KUMUD_WHATSAPP_NUMBER}`}
                  target="_top"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-semibold hover:bg-emerald-500/30 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>WhatsApp Desk:</span>
                  <span className="font-mono font-bold text-white whitespace-nowrap">+91 99901 55699</span>
                  <span className="text-emerald-300 hidden sm:inline">(Kumud Gameti)</span>
                </a>
              </div>

              {/* Vision Scope Metrics Bar */}
              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-6 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
                  <span><strong className="text-white">62</strong> Stated Categories Vision</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-cyan-400"></div>
                  <span><strong className="text-white">57</strong> Target Countries Corridor</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400"></div>
                  <span>Free Interactive Demonstration</span>
                </div>
              </div>
            </div>

            {/* Right Visual: Colourful Tiles Collage & Globe Representation */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md space-y-4">
                {/* Central Multi-Color Globe Card */}
                <div className="bg-gradient-to-br from-white/15 via-white/5 to-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl overflow-hidden border border-amber-400/80 bg-black p-0.5 shrink-0 shadow-md">
                        <img src="/logo.jpg" alt="Logo" className="w-full h-full object-cover rounded-lg" />
                      </div>
                      <div>
                        <span className="text-[11px] font-bold text-white block leading-tight">GLOBAL TRADE RADAR</span>
                        <span className="text-[9px] text-amber-300 font-semibold">IndiNiger Official Portal</span>
                      </div>
                    </div>
                    <span className="text-[10px] bg-emerald-500/25 text-emerald-300 font-bold px-2.5 py-0.5 rounded-full border border-emerald-400/30 flex items-center gap-1.5 shadow-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>LIVE 57 HUBS</span>
                    </span>
                  </div>

                  {/* 8 Colourful Visual Tiles representing industries */}
                  <div className="grid grid-cols-4 gap-2.5 py-2">
                    {/* Property */}
                    <div className="bg-gradient-to-tr from-blue-600 to-cyan-500 rounded-xl p-2.5 text-center text-white shadow-md flex flex-col items-center gap-1 group hover:scale-105 transition-transform">
                      <Building2 className="w-5 h-5 text-cyan-200" />
                      <span className="text-[9px] font-bold">Property</span>
                    </div>
                    {/* Architecture */}
                    <div className="bg-gradient-to-tr from-purple-600 to-indigo-500 rounded-xl p-2.5 text-center text-white shadow-md flex flex-col items-center gap-1 group hover:scale-105 transition-transform">
                      <Compass className="w-5 h-5 text-purple-200" />
                      <span className="text-[9px] font-bold">Design</span>
                    </div>
                    {/* Fashion */}
                    <div className="bg-gradient-to-tr from-pink-500 to-rose-500 rounded-xl p-2.5 text-center text-white shadow-md flex flex-col items-center gap-1 group hover:scale-105 transition-transform">
                      <Shirt className="w-5 h-5 text-pink-200" />
                      <span className="text-[9px] font-bold">Fashion</span>
                    </div>
                    {/* Beauty */}
                    <div className="bg-gradient-to-tr from-rose-500 to-orange-400 rounded-xl p-2.5 text-center text-white shadow-md flex flex-col items-center gap-1 group hover:scale-105 transition-transform">
                      <Sparkles className="w-5 h-5 text-amber-200" />
                      <span className="text-[9px] font-bold">Beauty</span>
                    </div>
                    {/* Machinery */}
                    <div className="bg-gradient-to-tr from-blue-700 to-orange-500 rounded-xl p-2.5 text-center text-white shadow-md flex flex-col items-center gap-1 group hover:scale-105 transition-transform">
                      <Cog className="w-5 h-5 text-orange-200" />
                      <span className="text-[9px] font-bold">Machinery</span>
                    </div>
                    {/* Manufacturing */}
                    <div className="bg-gradient-to-tr from-emerald-600 to-teal-500 rounded-xl p-2.5 text-center text-white shadow-md flex flex-col items-center gap-1 group hover:scale-105 transition-transform">
                      <Factory className="w-5 h-5 text-emerald-200" />
                      <span className="text-[9px] font-bold">Industry</span>
                    </div>
                    {/* Trade */}
                    <div className="bg-gradient-to-tr from-blue-800 to-emerald-500 rounded-xl p-2.5 text-center text-white shadow-md flex flex-col items-center gap-1 group hover:scale-105 transition-transform">
                      <Globe2 className="w-5 h-5 text-emerald-200" />
                      <span className="text-[9px] font-bold">Trade</span>
                    </div>
                    {/* Exhibitions */}
                    <div className="bg-gradient-to-tr from-fuchsia-600 to-amber-500 rounded-xl p-2.5 text-center text-white shadow-md flex flex-col items-center gap-1 group hover:scale-105 transition-transform">
                      <Calendar className="w-5 h-5 text-amber-200" />
                      <span className="text-[9px] font-bold">Expos</span>
                    </div>
                  </div>

                  {/* Active Trade Route Banner */}
                  <div className="mt-4 p-3 bg-white/10 rounded-2xl border border-white/15 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">🇮🇳</span>
                      <ArrowRight className="w-3.5 h-3.5 text-amber-300" />
                      <span className="text-xl">🇳🇪</span>
                      <span className="font-bold text-white text-[11px]">India &ndash; Niger Corridor</span>
                    </div>
                    <span className="text-[10px] bg-emerald-500/30 text-emerald-300 font-bold px-2 py-0.5 rounded-full border border-emerald-400/40">
                      Bilateral Hub
                    </span>
                  </div>
                </div>

                {/* Floating Highlight Cards */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gradient-to-br from-amber-500/90 to-orange-600 rounded-2xl p-3 text-white shadow-xl border border-white/20 flex items-center gap-2.5">
                    <div className="w-12 h-12 rounded-xl overflow-hidden border-2 border-white/90 shadow-md shrink-0 bg-slate-900">
                      <img src="/kumud-gameti.jpg" alt="Kumud Gameti" className="w-full h-full object-cover object-top" />
                    </div>
                    <div>
                      <span className="text-[9px] font-bold uppercase tracking-wider text-amber-100 block">FOUNDER DESK</span>
                      <span className="font-black text-xs sm:text-sm block leading-tight">Kumud Gameti</span>
                      <span className="text-[9px] text-amber-100 font-medium">Trade Liaison & Vision</span>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-emerald-600/90 to-teal-700 rounded-2xl p-3.5 text-white shadow-xl border border-white/20">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-100 block">TRADE ESCROW</span>
                    <span className="font-black text-sm block">57 Target Markets</span>
                    <span className="text-[10px] text-emerald-100 font-medium">B2B Verified Corridors</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION D: BUSINESS NETWORK HIGHLIGHTS (COLOURFUL CARDS) */}
      {/* ============================================================ */}
      <section className="py-12 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* 1. Multiple Business Industries */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50/50 rounded-2xl p-6 border-2 border-blue-200 hover:border-blue-400 transition-all hover:shadow-lg group">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 text-white flex items-center justify-center mb-4 shadow-md shadow-blue-500/30 group-hover:scale-110 transition-transform">
                <Layers className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-100/80 px-2 py-0.5 rounded-full inline-block mb-1">
                MULTI-SECTOR DIVERSITY
              </span>
              <h3 className="text-base font-extrabold text-slate-900">Multiple Business Industries</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Aggregating 62 distinct industry sectors into one integrated digital marketplace ecosystem.
              </p>
              <div className="mt-3 pt-3 border-t border-blue-100 text-[11px] text-blue-700 font-bold">
                62 Categories Vision &rarr;
              </div>
            </div>

            {/* 2. International Business Network */}
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50/50 rounded-2xl p-6 border-2 border-purple-200 hover:border-purple-400 transition-all hover:shadow-lg group">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-500 text-white flex items-center justify-center mb-4 shadow-md shadow-purple-500/30 group-hover:scale-110 transition-transform">
                <Globe className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 bg-purple-100/80 px-2 py-0.5 rounded-full inline-block mb-1">
                GLOBAL REACH
              </span>
              <h3 className="text-base font-extrabold text-slate-900">International Business Network</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Targeting enterprise partnerships, trade chambers, and exporters across 57 global markets.
              </p>
              <div className="mt-3 pt-3 border-t border-purple-100 text-[11px] text-purple-700 font-bold">
                57 Countries Database &rarr;
              </div>
            </div>

            {/* 3. Business Connections & Partnerships */}
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50/50 rounded-2xl p-6 border-2 border-emerald-200 hover:border-emerald-400 transition-all hover:shadow-lg group">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center mb-4 shadow-md shadow-emerald-500/30 group-hover:scale-110 transition-transform">
                <Users2 className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full inline-block mb-1">
                B2B MATCHMAKING
              </span>
              <h3 className="text-base font-extrabold text-slate-900">Business Connections & Partnerships</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Direct buyer-supplier matchmaking, procurement RFQs, and cross-border commercial joint ventures.
              </p>
              <div className="mt-3 pt-3 border-t border-emerald-100 text-[11px] text-emerald-700 font-bold">
                Direct WhatsApp Inquiries &rarr;
              </div>
            </div>

            {/* 4. Exhibitions & Growth Opportunities */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50/50 rounded-2xl p-6 border-2 border-amber-200 hover:border-amber-400 transition-all hover:shadow-lg group">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white flex items-center justify-center mb-4 shadow-md shadow-amber-500/30 group-hover:scale-110 transition-transform">
                <Calendar className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100/80 px-2 py-0.5 rounded-full inline-block mb-1">
                TRADE CONCLAVES
              </span>
              <h3 className="text-base font-extrabold text-slate-900">Exhibitions & Growth</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Multi-country trade pavilions, buyer summits, booth bookings, and official delegate programmes.
              </p>
              <div className="mt-3 pt-3 border-t border-amber-100 text-[11px] text-amber-700 font-bold">
                Explore Trade Expos &rarr;
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION E: EXPLORE BUSINESS CATEGORIES (17 DISTINCT COLOUR PALETTES) */}
      {/* ============================================================ */}
      <section className="py-20 bg-gradient-to-b from-slate-50 via-blue-50/20 to-white relative" id="categories">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold border border-blue-200">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>COLOURFUL MULTI-INDUSTRY DIRECTORY</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
              Explore Our <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-amber-500 bg-clip-text text-transparent">Business Categories</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Every industry has a distinct identity. Browse through our initial 17 high-growth sectors bridging manufacturers, builders, suppliers, and traders worldwide.
            </p>

            {/* Search Bar & Sector Filter */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-2xl mx-auto">
              <div className="relative w-full">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={categorySearch}
                  onChange={(e) => setCategorySearch(e.target.value)}
                  placeholder="Search industries (e.g. Machinery, Fashion, Construction)..."
                  className="w-full pl-10 pr-4 py-3 bg-white border-2 border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-blue-600 shadow-sm transition-all"
                />
              </div>

              {/* Sector Filter Tabs */}
              <select
                value={selectedSector}
                onChange={(e) => setSelectedSector(e.target.value)}
                className="w-full sm:w-auto px-4 py-3 bg-white border-2 border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-700 font-semibold focus:outline-none focus:border-blue-600 shadow-sm"
              >
                <option value="All">All Sectors (17)</option>
                <option value="Industrial & Infrastructure">Industrial & Infrastructure</option>
                <option value="Consumer & Lifestyle">Consumer & Lifestyle</option>
                <option value="Global Trade & Logistics">Global Trade & Logistics</option>
                <option value="Technology & Consulting">Technology & Consulting</option>
              </select>
            </div>
          </div>

          {/* 17 DISTINCT COLOURFUL INDUSTRY CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCategories.map((cat: Category) => (
              <div
                key={cat.id}
                className={`${cat.theme.cardBg} ${cat.theme.cardBorder} rounded-3xl p-7 border-2 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between group`}
              >
                <div className="space-y-4">
                  {/* Card Header with Large Colorful Icon and Badge */}
                  <div className="flex items-start justify-between gap-3">
                    <div className={`w-14 h-14 rounded-2xl ${cat.theme.iconBg} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                      <CategoryIcon name={cat.icon} className="w-7 h-7 text-white" />
                    </div>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${cat.theme.badgeStyle}`}>
                      {cat.sector}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>

                  {/* Sample Offerings Pills */}
                  <div className="space-y-2 pt-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Capabilities & Products:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {cat.sampleOfferings.map((off, oIdx) => (
                        <span
                          key={oIdx}
                          className="text-[11px] px-2.5 py-1 rounded-lg bg-white/80 text-slate-700 font-medium border border-slate-200/60 shadow-xs"
                        >
                          {off}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Footer: Explore Businesses CTA */}
                <div className="pt-6 mt-6 border-t border-slate-200/60 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 font-mono">
                    {cat.businessCount}+ Listings
                  </span>
                  <Link
                    href={`/directory?industry=${encodeURIComponent(cat.name)}`}
                    className={`${cat.theme.btnStyle} px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-md group-hover:gap-2`}
                  >
                    <span>Explore Businesses</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center pt-6">
            <Link
              href="/industries"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-amber-500 hover:from-blue-700 hover:to-amber-600 text-white font-extrabold text-sm px-8 py-4 rounded-2xl shadow-xl shadow-blue-500/25 transition-all hover:scale-105"
            >
              <span>View All 17+ Starter Industries</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION F: GLOBAL BUSINESS NETWORK (VIBRANT INDIGO & BLUE) */}
      {/* ============================================================ */}
      <section className="py-20 bg-gradient-to-br from-indigo-950 via-blue-900 to-slate-900 text-white relative overflow-hidden" id="network">
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-400/10 text-cyan-300 text-xs font-bold border border-cyan-400/20">
              <Globe className="w-3.5 h-3.5" />
              <span>57-COUNTRY INTERNATIONAL CORRIDOR</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
              Global Business <span className="bg-gradient-to-r from-cyan-300 to-amber-300 bg-clip-text text-transparent">Network</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Targeting cross-border trade corridors with focus on India, Niger, the African continent, GCC, and key international trade hubs.
            </p>
          </div>

          {/* Interactive Country Selector & Explorer Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Country Pill Selector */}
            <div className="lg:col-span-5 bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/15 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-300 block">
                Select a Partner Country (57 Database):
              </span>
              <div className="max-h-72 overflow-y-auto space-y-1.5 pr-1">
                {COUNTRIES_DATA.map((c) => (
                  <button
                    key={c.code}
                    onClick={() => setSelectedCountryCode(c.code)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all text-left ${
                      selectedCountryCode === c.code
                        ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md'
                        : 'bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-base">{c.flag}</span>
                      <span>{c.name}</span>
                    </div>
                    <span className="text-[10px] font-mono opacity-80">{c.region}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Country Profile Card */}
            <div className="lg:col-span-7 bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{activeCountry.flag}</span>
                  <div>
                    <h3 className="text-2xl font-black text-white">{activeCountry.name}</h3>
                    <span className="text-xs text-cyan-300 font-semibold">{activeCountry.region}</span>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/30">
                  Target Corridor
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                  <span className="text-slate-400 block text-[11px] font-bold">KEY EXPORT SECTORS:</span>
                  <span className="text-white font-semibold">{activeCountry.majorTradeSectors.join(', ')}</span>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                  <span className="text-slate-400 block text-[11px] font-bold">STRATEGIC OPPORTUNITY:</span>
                  <span className="text-amber-300 font-semibold">{activeCountry.opportunityNote}</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  href={`/global-network?country=${activeCountry.code}`}
                  className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white px-6 py-3 rounded-xl text-xs font-bold flex items-center gap-2 shadow-md transition-all"
                >
                  <Globe className="w-4 h-4" />
                  <span>Explore {activeCountry.name} Dossier</span>
                </Link>
                <button
                  onClick={() => openEnquiryModal({
                    title: `Trade Opportunity: ${activeCountry.name}`,
                    subtitle: `Connect with bilateral trade desks focusing on ${activeCountry.name}.`,
                    targetEntity: activeCountry.name,
                    type: 'business_inquiry',
                  })}
                  className="bg-white/10 hover:bg-white/20 text-white px-5 py-3 rounded-xl text-xs font-bold border border-white/20 transition-all cursor-pointer"
                >
                  Submit Trade Query
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION G: BUY, SELL, TRADE, CONNECT & GROW (5 COLOURFUL CARDS) */}
      {/* ============================================================ */}
      <section className="py-20 bg-white border-b border-slate-200" id="ecosystem">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200">
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>CORE MARKETPLACE PILLARS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
              Buy, Sell, Trade, <span className="bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">Connect & Grow</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Five comprehensive avenues engineered for modern enterprises to expand from local markets to international trade corridors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {/* 1. BUY — Emerald */}
            <div className="bg-gradient-to-br from-emerald-50 via-white to-teal-50 rounded-3xl p-6 border-2 border-emerald-200 hover:border-emerald-400 hover:shadow-xl transition-all flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center shadow-md shadow-emerald-500/30 group-hover:scale-110 transition-transform">
                  <ShoppingCart className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-black text-emerald-800 tracking-tight">BUY</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Discover verified industrial products, raw commodities, and qualified global supply partners.
                </p>
              </div>
              <button
                onClick={() => openFeatureModal('buy')}
                className="mt-6 w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-bold shadow-md transition-all cursor-pointer"
              >
                Start Buying &rarr;
              </button>
            </div>

            {/* 2. SELL — Orange */}
            <div className="bg-gradient-to-br from-orange-50 via-white to-amber-50 rounded-3xl p-6 border-2 border-orange-200 hover:border-orange-400 hover:shadow-xl transition-all flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-500 text-white flex items-center justify-center shadow-md shadow-orange-500/30 group-hover:scale-110 transition-transform">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-black text-orange-800 tracking-tight">SELL</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Showcase products and export services directly to accredited buyers across 57 markets.
                </p>
              </div>
              <button
                onClick={() => openFeatureModal('sell')}
                className="mt-6 w-full py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white text-xs font-bold shadow-md transition-all cursor-pointer"
              >
                List Products &rarr;
              </button>
            </div>

            {/* 3. TRADE — Royal Blue */}
            <div className="bg-gradient-to-br from-blue-50 via-white to-cyan-50 rounded-3xl p-6 border-2 border-blue-200 hover:border-blue-400 hover:shadow-xl transition-all flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-500 text-white flex items-center justify-center shadow-md shadow-blue-500/30 group-hover:scale-110 transition-transform">
                  <ArrowLeftRight className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-black text-blue-800 tracking-tight">TRADE</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Explore international trade agreements, cross-border customs liaisons, and trade credit facilitation.
                </p>
              </div>
              <button
                onClick={() => openFeatureModal('trade')}
                className="mt-6 w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white text-xs font-bold shadow-md transition-all cursor-pointer"
              >
                Explore Trade &rarr;
              </button>
            </div>

            {/* 4. CONNECT — Purple */}
            <div className="bg-gradient-to-br from-purple-50 via-white to-indigo-50 rounded-3xl p-6 border-2 border-purple-200 hover:border-purple-400 hover:shadow-xl transition-all flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-500 text-white flex items-center justify-center shadow-md shadow-purple-500/30 group-hover:scale-110 transition-transform">
                  <Users2 className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-black text-purple-800 tracking-tight">CONNECT</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Connect with vetted business founders, industry leaders, and sovereign trade delegates.
                </p>
              </div>
              <button
                onClick={() => openFeatureModal('connect')}
                className="mt-6 w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white text-xs font-bold shadow-md transition-all cursor-pointer"
              >
                Build Network &rarr;
              </button>
            </div>

            {/* 5. GROW — Gold */}
            <div className="bg-gradient-to-br from-amber-50 via-white to-yellow-50 rounded-3xl p-6 border-2 border-amber-200 hover:border-amber-400 hover:shadow-xl transition-all flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-500 text-slate-950 flex items-center justify-center shadow-md shadow-amber-500/30 group-hover:scale-110 transition-transform">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-black text-amber-800 tracking-tight">GROW</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Unlock exhibition pavilions, investor syndication, and multi-country commercial scaling.
                </p>
              </div>
              <button
                onClick={() => openFeatureModal('grow')}
                className="mt-6 w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-slate-950 text-xs font-extrabold shadow-md transition-all cursor-pointer"
              >
                Scale Beyond &rarr;
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION H: INDUSTRIES WE SERVE (COLOURFUL VISUAL SHOWCASE) */}
      {/* ============================================================ */}
      <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              CROSS-BORDER SECTORIAL REACH
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
              Industries We Serve
            </h2>
            <p className="text-sm sm:text-base text-slate-400">
              Bridging traditional manufacturing and cutting-edge commerce into one interconnected ecosystem.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Real Estate & Architecture */}
            <div className="rounded-3xl p-6 bg-gradient-to-br from-blue-900/60 to-indigo-900/40 border border-blue-500/30 space-y-3">
              <div className="flex items-center gap-2 text-cyan-300">
                <Building2 className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-wider">Property & Architecture</span>
              </div>
              <h3 className="text-xl font-bold text-white">Infrastructure & Built Environment</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Logistics parks, urban master planning, high-grade building materials, and EPC civil contracting across high-growth corridors.
              </p>
            </div>

            {/* Defence & Machinery */}
            <div className="rounded-3xl p-6 bg-gradient-to-br from-red-900/50 to-orange-900/40 border border-red-500/30 space-y-3">
              <div className="flex items-center gap-2 text-rose-300">
                <ShieldCheck className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-wider">Defence & Machinery</span>
              </div>
              <h3 className="text-xl font-bold text-white">Heavy Industrial & Engineering</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Automated CNC machining, tactical security shielding, precision casting, and turnkey industrial manufacturing rigs.
              </p>
            </div>

            {/* Fashion & Beauty */}
            <div className="rounded-3xl p-6 bg-gradient-to-br from-pink-900/50 to-purple-900/40 border border-pink-500/30 space-y-3">
              <div className="flex items-center gap-2 text-pink-300">
                <Shirt className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-wider">Fashion & Beauty</span>
              </div>
              <h3 className="text-xl font-bold text-white">Lifestyle & Consumer Goods</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Export-ready apparel lines, organic cosmetics, spun textiles, and international consumer product packaging.
              </p>
            </div>

            {/* International Trade & Logistics */}
            <div className="rounded-3xl p-6 bg-gradient-to-br from-emerald-900/50 to-teal-900/40 border border-emerald-500/30 space-y-3">
              <div className="flex items-center gap-2 text-emerald-300">
                <Globe2 className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-wider">Global Logistics</span>
              </div>
              <h3 className="text-xl font-bold text-white">Cross-Border Commodities & Freight</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Multimodal maritime shipping, customs brokerage, cold-chain transport, and bilateral trade facilitation.
              </p>
            </div>

            {/* Technology & Digital */}
            <div className="rounded-3xl p-6 bg-gradient-to-br from-cyan-900/50 to-blue-900/40 border border-cyan-500/30 space-y-3">
              <div className="flex items-center gap-2 text-cyan-300">
                <Cpu className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-wider">Tech & Enterprise</span>
              </div>
              <h3 className="text-xl font-bold text-white">Digital Solutions & Automation</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                B2B trade software, supply chain tracking IoT, enterprise ERP consulting, and cross-border fintech integrations.
              </p>
            </div>

            {/* Investment & Capital */}
            <div className="rounded-3xl p-6 bg-gradient-to-br from-amber-900/50 to-yellow-900/40 border border-amber-500/30 space-y-3">
              <div className="flex items-center gap-2 text-amber-300">
                <TrendingUp className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-wider">Capital & Growth</span>
              </div>
              <h3 className="text-xl font-bold text-white">Investment & Joint Ventures</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Syndicated debt for infrastructure, PPP project matching, angel investment networks, and strategic international mergers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION I: EXHIBITIONS & EVENTS (VIBRANT EXPO THEME) */}
      {/* ============================================================ */}
      <section className="py-20 bg-gradient-to-br from-fuchsia-950 via-purple-900 to-indigo-950 text-white relative" id="events">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold border border-amber-400/30">
              <Ticket className="w-3.5 h-3.5" />
              <span>INTERNATIONAL TRADE CONCLAVES</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Exhibitions & <span className="bg-gradient-to-r from-amber-300 via-pink-400 to-cyan-300 bg-clip-text text-transparent">Trade Conclaves</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Experience bilateral trade summits, reserve international exhibition booths, and meet high-level buyers face-to-face.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SAMPLE_EVENTS.map((evt) => (
              <div
                key={evt.id}
                className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20 hover:border-amber-400/60 transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-amber-400 text-slate-950">
                      {evt.badge}
                    </span>
                    <span className="text-xs text-cyan-300 flex items-center gap-1 font-semibold">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{evt.location}</span>
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white">{evt.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">{evt.description}</p>

                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-xs space-y-1">
                    <div className="flex items-center gap-2 text-amber-300">
                      <Calendar className="w-3.5 h-3.5" />
                      <span className="font-semibold">{evt.date}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between gap-3">
                  <Link
                    href="/events"
                    className="text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-1"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Expo</span>
                  </Link>

                  <button
                    onClick={() => openEnquiryModal({
                      title: `Booth Booking: ${evt.title}`,
                      subtitle: `Reserve an official exhibition pavilion or register as a delegate.`,
                      targetEntity: evt.title,
                      type: 'event_booth',
                    })}
                    className="bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-500 hover:to-orange-500 text-slate-950 font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
                  >
                    <Ticket className="w-3.5 h-3.5" />
                    <span>Book Booth</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION J: HOW IT WORKS (COLOURFUL 4-STEP PROCESS) */}
      {/* ============================================================ */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              SIMPLE & FAST 4-STEP WORKFLOW
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
              How IndiNiger BizHub Works
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              From discovering opportunities to instant WhatsApp communication with the leadership team.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Step 1 */}
            <div className="bg-gradient-to-br from-lime-50 to-emerald-50 rounded-3xl p-6 border-2 border-lime-200 space-y-4">
              <span className="w-10 h-10 rounded-xl bg-lime-500 text-white font-black text-base flex items-center justify-center shadow-md shadow-lime-500/30">
                01
              </span>
              <h3 className="text-lg font-black text-slate-900">Explore Industries</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Browse through 17+ starter categories spanning manufacturing, architecture, textiles, and global trade.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-3xl p-6 border-2 border-cyan-200 space-y-4">
              <span className="w-10 h-10 rounded-xl bg-cyan-500 text-white font-black text-base flex items-center justify-center shadow-md shadow-cyan-500/30">
                02
              </span>
              <h3 className="text-lg font-black text-slate-900">Discover Businesses</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Locate verified suppliers, manufacturers, and international buyers across 57 partner nations.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-3xl p-6 border-2 border-purple-200 space-y-4">
              <span className="w-10 h-10 rounded-xl bg-purple-600 text-white font-black text-base flex items-center justify-center shadow-md shadow-purple-600/30">
                03
              </span>
              <h3 className="text-lg font-black text-slate-900">Submit Direct Enquiry</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Send your RFQ or proposal with guaranteed direct landing onto Kumud Gameti’s WhatsApp (+91 99901 55699).
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-6 border-2 border-amber-200 space-y-4">
              <span className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 font-black text-base flex items-center justify-center shadow-md shadow-amber-500/30">
                04
              </span>
              <h3 className="text-lg font-black text-slate-900">Build Connections</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Finalize export orders, exhibit at trade conclaves, and scale your global enterprise footprint.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION K: ABOUT INDINIGER BIZHUB & KUMUD GAMETI */}
      {/* ============================================================ */}
      <section className="py-20 bg-slate-50 border-b border-slate-200" id="about">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-950 rounded-3xl p-8 sm:p-14 text-white shadow-2xl relative overflow-hidden border border-slate-800">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 relative z-10">
              <div className="max-w-2xl space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold border border-amber-400/30">
                  <Award className="w-3.5 h-3.5 text-amber-300" />
                  <span>FOUNDER & BUSINESS LEADERSHIP</span>
                </div>

                <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
                  Bringing Industries Together.{' '}
                  <span className="bg-gradient-to-r from-amber-300 via-pink-400 to-cyan-300 bg-clip-text text-transparent">
                    Opening Doors to Global Opportunities.
                  </span>
                </h2>

                <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                  IndiNiger BizHub was conceived by <strong>Kumud Gameti</strong> to unite multiple business sectors under one roof, opening bilateral trade bridges between India, Niger, and 57 emerging international economies.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-2xl bg-white/10 border border-white/15 space-y-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300">FOUNDER & CONTACT</span>
                    <span className="text-lg font-black text-white block">Kumud Gameti</span>
                    <span className="text-xs text-slate-300">Strategic Trade Leadership & Global Vision</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/10 border border-white/15 space-y-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-300">DIRECT WHATSAPP HELPLINE</span>
                    <a
                      href={`https://wa.me/${KUMUD_WHATSAPP_NUMBER}`}
                      target="_top"
                      rel="noopener noreferrer"
                      className="text-lg font-black font-mono text-emerald-300 block hover:underline whitespace-nowrap"
                    >
                      +91 99901 55699
                    </a>
                    <span className="text-xs text-slate-300">Instant Direct Query & Matchmaking</span>
                  </div>
                </div>
              </div>

              {/* Founder Kumud Gameti Portrait & Official Seal */}
              <div className="flex flex-col items-center justify-center p-5 sm:p-6 bg-gradient-to-b from-white/15 to-white/5 backdrop-blur-md rounded-3xl border border-white/20 text-center shrink-0 self-center lg:self-auto shadow-2xl max-w-xs">
                <div className="relative w-44 h-52 sm:w-52 sm:h-60 rounded-2xl overflow-hidden border-2 border-amber-400 shadow-2xl mb-3 group bg-slate-900">
                  <img
                    src="/kumud-gameti.jpg"
                    alt="Kumud Gameti — Founder & Business Contact"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Floating official logo badge */}
                  <div className="absolute bottom-2 right-2 w-9 h-9 rounded-xl overflow-hidden border-2 border-amber-400 bg-slate-950 p-0.5 shadow-lg">
                    <img src="/logo.jpg" alt="IndiNiger BizHub Logo" className="w-full h-full object-cover rounded-lg" />
                  </div>
                </div>
                <span className="font-black text-white text-base">Kumud Gameti</span>
                <span className="text-[11px] text-amber-300 font-bold uppercase tracking-wider">Founder & Business Contact</span>
                <span className="text-[10px] text-blue-200 mt-0.5">IndiNiger BizHub Global Secretariat</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION L: PARTNERSHIP CTA (VIBRANT GRADIENT) */}
      {/* ============================================================ */}
      <section className="py-20 bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-700 text-white relative">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-6">
          <span className="inline-block bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            CROSS-BORDER GROWTH DESK
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight">
            Your Next Business Opportunity Starts Here.
          </h2>
          <p className="text-sm sm:text-base text-blue-100 max-w-2xl mx-auto leading-relaxed">
            Whether you are a manufacturer, supplier, entrepreneur, service provider or business professional, discover new possibilities through IndiNiger BizHub.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={() => openEnquiryModal({
                title: 'Join the Global Business Network',
                subtitle: 'Register your company profile across 57 international markets.',
                type: 'join_network',
              })}
              className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold px-8 py-4 rounded-2xl text-sm shadow-xl shadow-amber-500/25 transition-all hover:scale-105 cursor-pointer"
            >
              Join the Network
            </button>
            <a
              href={`https://wa.me/${KUMUD_WHATSAPP_NUMBER}?text=${encodeURIComponent(
                'Hello Kumud Gameti, I would like to submit a business enquiry regarding IndiNiger BizHub.'
              )}`}
              target="_top"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold px-8 py-4 rounded-2xl text-sm shadow-xl transition-all hover:scale-105 flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>Submit a Business Enquiry</span>
            </a>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION M: CONTACT SECTION (100% FRONTEND -> DIRECT WHATSAPP) */}
      {/* ============================================================ */}
      <section className="py-20 bg-slate-100" id="contact">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Contact Info */}
            <div className="lg:col-span-5 bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">DIRECT SECRETARIAT</span>
                  <h3 className="text-2xl font-black text-slate-900 mt-1">Connect with Kumud Gameti</h3>
                  <p className="text-xs text-slate-600 mt-1">
                    Pure front-end submission &mdash; your complete query opens instantly in WhatsApp.
                  </p>
                </div>
                <div className="w-12 h-12 rounded-xl overflow-hidden border border-amber-400/60 bg-black shrink-0 p-0.5 shadow-md">
                  <img src="/logo.jpg" alt="Official Logo" className="w-full h-full object-cover rounded-[10px]" />
                </div>
              </div>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3.5 p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200">
                  <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-emerald-800 uppercase block">DIRECT WHATSAPP LINE</span>
                    <a
                      href={`https://wa.me/${KUMUD_WHATSAPP_NUMBER}`}
                      target="_top"
                      rel="noopener noreferrer"
                      className="font-black font-mono text-base text-slate-900 hover:text-emerald-600 transition-colors block whitespace-nowrap"
                    >
                      +91 99901 55699
                    </a>
                    <span className="text-[11px] text-emerald-700 font-semibold">Kumud Gameti (Founder / Secretariat)</span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-3.5 bg-blue-50 rounded-2xl border border-blue-200">
                  <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-blue-800 uppercase block">GLOBAL CORRIDORS</span>
                    <span className="font-bold text-sm text-slate-900 block">India &middot; Niger &middot; 57 Countries</span>
                    <span className="text-[11px] text-blue-700">New Delhi & Niamey Hub Corridors</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 space-y-1">
                <span className="font-bold block">&#9432; Instant WhatsApp Forwarding:</span>
                <p className="text-[11px] leading-relaxed">
                  Upon submitting this form, your complete structured enquiry is immediately loaded into WhatsApp ready to send to Kumud Gameti with zero delays.
                </p>
              </div>
            </div>

            {/* Right Contact Form */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
              {contactSuccess ? (
                <div className="text-center py-10 space-y-4">
                  <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-center justify-center mx-auto text-emerald-600">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">Landing Your Query on WhatsApp!</h3>
                  <p className="text-xs text-slate-600 max-w-md mx-auto">
                    Your enquiry details have been pre-formatted and routed directly to <strong>Kumud Gameti (+91 99901 55699)</strong>.
                  </p>

                  <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl text-xs text-left space-y-2 max-w-md mx-auto">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-emerald-800 flex items-center gap-1.5">
                        <Phone className="w-4 h-4 text-emerald-600" />
                        <span>Direct WhatsApp Forwarding</span>
                      </span>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-mono font-bold">
                        +91 99901 55699
                      </span>
                    </div>
                    <p className="text-slate-600 text-[11px] leading-relaxed">
                      If WhatsApp did not launch automatically, tap the button below:
                    </p>
                    <a
                      href={contactWaUrl}
                      target="_top"
                      className="inline-flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all hover:scale-[1.01]"
                    >
                      <Phone className="w-4 h-4 shrink-0" />
                      <span>Open WhatsApp Chat Now</span>
                      <span className="hidden sm:inline font-mono font-bold text-emerald-200">(&#43;91 99901 55699)</span>
                    </a>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => {
                        setContactSuccess(false);
                        setContactState({
                          name: '',
                          company: '',
                          email: '',
                          phone: '',
                          industry: 'Construction & Infrastructure',
                          country: 'India',
                          message: '',
                        });
                      }}
                      className="px-5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold"
                    >
                      Submit Another Query
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-slate-900">Submit Business Enquiry</h3>
                    <p className="text-xs text-slate-500">
                      Fill out the details below to contact Kumud Gameti directly on WhatsApp.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={contactState.name}
                        onChange={(e) => setContactState({ ...contactState, name: e.target.value })}
                        placeholder="e.g. Rajesh Sharma"
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
                      />
                      {contactErrors.name && (
                        <p className="text-[11px] text-red-500 mt-1">{contactErrors.name}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Company Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={contactState.company}
                        onChange={(e) => setContactState({ ...contactState, company: e.target.value })}
                        placeholder="e.g. Continental Minerals SARL"
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
                      />
                      {contactErrors.company && (
                        <p className="text-[11px] text-red-500 mt-1">{contactErrors.company}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        value={contactState.email}
                        onChange={(e) => setContactState({ ...contactState, email: e.target.value })}
                        placeholder="e.g. rajesh@enterprise.com"
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
                      />
                      {contactErrors.email && (
                        <p className="text-[11px] text-red-500 mt-1">{contactErrors.email}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Phone / WhatsApp
                      </label>
                      <input
                        type="tel"
                        value={contactState.phone}
                        onChange={(e) => setContactState({ ...contactState, phone: e.target.value })}
                        placeholder="+91 98000 00000"
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Industry
                      </label>
                      <select
                        value={contactState.industry}
                        onChange={(e) => setContactState({ ...contactState, industry: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
                      >
                        {CATEGORIES_DATA.map((cat) => (
                          <option key={cat.id} value={cat.name}>
                            {cat.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Country
                      </label>
                      <select
                        value={contactState.country}
                        onChange={(e) => setContactState({ ...contactState, country: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
                      >
                        {COUNTRIES_DATA.map((c) => (
                          <option key={c.code} value={c.name}>
                            {c.flag} {c.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Enquiry Message & Request <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      rows={4}
                      value={contactState.message}
                      onChange={(e) => setContactState({ ...contactState, message: e.target.value })}
                      placeholder="Detail your business proposal, export inquiry, partnership interest, or technical requirement..."
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
                    />
                    {contactErrors.message && (
                      <p className="text-[11px] text-red-500 mt-1">{contactErrors.message}</p>
                    )}
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <span className="text-[11px] text-slate-500">
                      100% Client-Side &middot; Instant WhatsApp
                    </span>
                    <button
                      type="submit"
                      className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white px-7 py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-lg transition-all hover:scale-[1.01]"
                    >
                      <Phone className="w-4 h-4 text-white shrink-0" />
                      <span>Send Query Directly to WhatsApp</span>
                      <span className="hidden sm:inline font-mono font-bold text-emerald-200">(&#43;91 99901 55699)</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
