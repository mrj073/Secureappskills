'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Globe,
  MapPin,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Search,
  Phone,
} from 'lucide-react';
import { COUNTRIES_DATA, Country } from '@/data/countries';
import { useModals } from '@/components/ClientLayoutWrapper';
import { KUMUD_WHATSAPP_NUMBER } from '@/lib/whatsapp';

export default function GlobalNetworkPage() {
  const { openEnquiryModal } = useModals();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [activeCountry, setActiveCountry] = useState<Country>(COUNTRIES_DATA[0]);

  const regions = ['All', 'Africa', 'Asia-Pacific', 'Middle East', 'Europe', 'Americas'];

  const filteredCountries = useMemo(() => {
    return COUNTRIES_DATA.filter((c) => {
      const matchesSearch =
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.majorTradeSectors.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesRegion =
        selectedRegion === 'All' || c.region === selectedRegion;

      return matchesSearch && matchesRegion;
    });
  }, [searchQuery, selectedRegion]);

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Vibrant Gradient Header with Official Logo */}
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-xl border border-white/10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold border border-white/30 backdrop-blur-xs">
                <Globe className="w-3.5 h-3.5 text-cyan-300" />
                <span>57-COUNTRY INTERNATIONAL CORRIDOR</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
                Global <span className="bg-gradient-to-r from-cyan-300 via-amber-300 to-pink-300 bg-clip-text text-transparent">Business Network</span>
              </h1>
              <p className="text-sm sm:text-base text-blue-100 leading-relaxed">
                Explore our stated 57-country international trade directory. Discover regional industrial clusters, bilateral trade opportunities, and market access corridors across Africa, Asia, the Middle East, Europe, and the Americas.
              </p>
              <div className="p-3 bg-white/10 rounded-2xl border border-white/15 text-xs text-blue-100">
                &#9432; <strong>Vision Scope:</strong> Country exploration is an interactive discovery feature representing Kumud Gameti’s stated 57-country international expansion roadmap.
              </div>
            </div>
            {/* Official Logo */}
            <div className="flex relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden shadow-2xl border-2 border-amber-400/50 bg-slate-950 p-1 shrink-0">
              <img src="/logo.jpg" alt="Official Logo" className="w-full h-full object-cover rounded-xl" />
            </div>
          </div>
        </div>

        {/* Selected Country Spotlight Hero */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-5">
              <div className="flex items-center gap-4">
                <span className="text-5xl sm:text-6xl">{activeCountry.flag}</span>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-3xl font-black text-slate-900">
                      {activeCountry.name}
                    </h2>
                    <span className="text-xs font-mono font-bold text-blue-700 bg-blue-100 px-2.5 py-0.5 rounded-full border border-blue-200">
                      {activeCountry.code}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider block mt-1">
                    Region: {activeCountry.region} &middot; Bilateral Priority
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  Strategic Bilateral Trade Opportunity:
                </span>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {activeCountry.opportunityNote}
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-100">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  Major Trade & Industrial Focus:
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeCountry.majorTradeSectors.map((sector, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-xl bg-blue-50 text-blue-800 text-xs font-semibold border border-blue-200 flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                      <span>{sector}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 bg-gradient-to-br from-indigo-900 to-blue-900 rounded-3xl p-6 text-white space-y-4 shadow-xl border border-blue-500/30">
              <div className="text-center space-y-1">
                <span className="text-[11px] uppercase tracking-wider text-cyan-300 font-bold">
                  Demonstration Database
                </span>
                <div className="text-3xl font-black text-amber-300 font-mono">
                  {activeCountry.sampleBusinessCount}+
                </div>
                <span className="text-[10px] text-blue-200 block">
                  Target Company Profiles in Corridor
                </span>
              </div>

              <div className="space-y-2 pt-2 border-t border-white/10">
                <a
                  href={`https://wa.me/${KUMUD_WHATSAPP_NUMBER}?text=${encodeURIComponent(
                    `Hello Kumud Gameti, I would like to inquire about trade opportunities regarding ${activeCountry.name} (${activeCountry.code}).`
                  )}`}
                  target="_top"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg transition-all"
                >
                  <Phone className="w-4 h-4" />
                  <span>WhatsApp Query for {activeCountry.name}</span>
                </a>

                <button
                  onClick={() => openEnquiryModal({
                    title: `Initiate Trade Corridor: ${activeCountry.name}`,
                    subtitle: `Submit business matching request for ${activeCountry.name}.`,
                    targetEntity: `${activeCountry.name} Corridor`,
                    type: 'business_inquiry',
                  })}
                  className="w-full py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/20 transition-colors block text-center cursor-pointer"
                >
                  Fill Inquiry Form
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Toolbar: Search & Region Tabs */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search countries or commodities..."
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl border-2 border-slate-200 bg-slate-50 text-xs text-slate-900 focus:outline-none focus:border-blue-600 transition-colors"
              />
            </div>

            <div className="text-xs text-slate-500 font-semibold">
              Showing <strong className="text-slate-900">{filteredCountries.length}</strong> of 57 Vision Countries
            </div>
          </div>

          <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
            {regions.map((reg) => (
              <button
                key={reg}
                onClick={() => setSelectedRegion(reg)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedRegion === reg
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                {reg}
              </button>
            ))}
          </div>
        </div>

        {/* Country Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredCountries.map((c) => {
            const isSelected = activeCountry.code === c.code;
            return (
              <div
                key={c.code}
                onClick={() => setActiveCountry(c)}
                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-br from-blue-600 to-indigo-700 text-white border-blue-400 shadow-xl scale-[1.02]'
                    : 'bg-white text-slate-800 border-slate-200 hover:border-blue-300 hover:shadow-md'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-3xl">{c.flag}</span>
                  <span
                    className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                      isSelected
                        ? 'bg-white/20 text-white'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {c.region}
                  </span>
                </div>

                <h3 className="font-extrabold text-sm truncate">{c.name}</h3>

                <p
                  className={`text-[11px] mt-1 line-clamp-1 ${
                    isSelected ? 'text-blue-100' : 'text-slate-500'
                  }`}
                >
                  {c.majorTradeSectors.join(', ')}
                </p>

                <div className="mt-3 pt-2 border-t border-slate-100/30 flex items-center justify-between text-[11px]">
                  <span
                    className={`font-bold ${
                      isSelected ? 'text-amber-300' : 'text-blue-600'
                    }`}
                  >
                    {c.sampleBusinessCount}+ Listings
                  </span>
                  <span
                    className={`text-xs font-bold ${
                      isSelected ? 'text-white' : 'text-slate-400'
                    }`}
                  >
                    Inspect &rarr;
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
