'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Search,
  Layers,
  Sparkles,
  Building2,
  Compass,
  HardHat,
  Hammer,
  ShieldCheck,
  Shirt,
  Cog,
  Factory,
  Globe2,
  ArrowLeftRight,
  Calendar,
  Briefcase,
  Cpu,
  Truck,
  TrendingUp,
  ArrowRight,
  ChevronRight,
  Phone,
} from 'lucide-react';
import { CATEGORIES_DATA, Category } from '@/data/categories';
import { useModals } from '@/components/ClientLayoutWrapper';
import { KUMUD_WHATSAPP_NUMBER } from '@/lib/whatsapp';

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

export default function IndustriesPage() {
  const { openEnquiryModal } = useModals();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSector, setSelectedSector] = useState<string>('All');

  const sectors = [
    'All',
    'Industrial & Infrastructure',
    'Consumer & Lifestyle',
    'Global Trade & Logistics',
    'Technology & Consulting',
  ];

  const filteredCategories = useMemo(() => {
    return CATEGORIES_DATA.filter((cat) => {
      const matchesSearch =
        cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cat.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cat.sampleOfferings.some((o) => o.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesSector =
        selectedSector === 'All' || cat.sector === selectedSector;

      return matchesSearch && matchesSector;
    });
  }, [searchQuery, selectedSector]);

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Colourful Vibrant Header with Official Logo */}
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-xl border border-white/10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold border border-white/30 backdrop-blur-xs">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>COLOURFUL MULTI-INDUSTRY DIRECTORY &middot; 62 CATEGORIES VISION</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
                Business Categories & <span className="bg-gradient-to-r from-amber-300 via-pink-300 to-cyan-300 bg-clip-text text-transparent">Industrial Sectors</span>
              </h1>
              <p className="text-sm sm:text-base text-blue-100 leading-relaxed">
                Explore 17 comprehensive starter sectors representing our stated vision of 62 categories. Filter and search across heavy manufacturing, infrastructure, consumer goods, digital solutions, and global trade corridors.
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-2 text-xs">
                <span className="bg-white/20 text-white px-3 py-1 rounded-full font-mono font-bold">
                  17 Starter Sectors Active
                </span>
                <span className="text-blue-200">&bull;</span>
                <span className="text-blue-200">Stated Client Vision: 62 Categories Total</span>
              </div>
            </div>
            {/* Official Logo */}
            <div className="flex relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden shadow-2xl border-2 border-amber-400/50 bg-slate-950 p-1 shrink-0">
              <img src="/logo.jpg" alt="Official Logo" className="w-full h-full object-cover rounded-xl" />
            </div>
          </div>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
            {/* Search input */}
            <div className="relative w-full sm:w-96">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search categories, sub-sectors, offerings..."
                className="w-full pl-10 pr-4 py-3 rounded-2xl border-2 border-slate-200 bg-slate-50 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-3 text-xs text-slate-400 hover:text-slate-600 font-bold"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="text-xs text-slate-500 font-semibold">
              Showing <strong className="text-slate-900">{filteredCategories.length}</strong> of {CATEGORIES_DATA.length} categories
            </div>
          </div>

          {/* Sector Pills */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
            {sectors.map((sec) => (
              <button
                key={sec}
                onClick={() => setSelectedSector(sec)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedSector === sec
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                {sec}
              </button>
            ))}
          </div>
        </div>

        {/* Categories Grid with 17 Distinct Colour Themes */}
        {filteredCategories.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 p-8 space-y-3">
            <Layers className="w-12 h-12 mx-auto text-slate-300 stroke-1" />
            <h3 className="text-lg font-bold text-slate-800">No matching categories found</h3>
            <p className="text-xs text-slate-500">
              Try adjusting your search terms or clearing the sector filter.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedSector('All');
              }}
              className="px-5 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCategories.map((cat: Category) => (
              <div
                key={cat.id}
                id={cat.slug}
                className={`${cat.theme.cardBg} ${cat.theme.cardBorder} rounded-3xl p-7 border-2 hover:shadow-xl transition-all duration-200 hover:-translate-y-1 flex flex-col justify-between group`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-14 h-14 rounded-2xl ${cat.theme.iconBg} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}
                    >
                      <CategoryIcon name={cat.icon} className="w-7 h-7 text-white" />
                    </div>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${cat.theme.badgeStyle}`}>
                      {cat.sector}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-slate-200/60">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Key Capabilities & Offerings:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {cat.sampleOfferings.map((offering, oIdx) => (
                        <span
                          key={oIdx}
                          className="text-[11px] px-2.5 py-1 rounded-lg bg-white/80 text-slate-700 font-medium border border-slate-200/60 shadow-xs"
                        >
                          {offering}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-200/60 flex items-center justify-between">
                  <button
                    onClick={() => openEnquiryModal({
                      title: `Industry RFQ: ${cat.name}`,
                      subtitle: `Submit your procurement or supply specifications for ${cat.name}.`,
                      targetEntity: cat.name,
                      type: 'business_inquiry',
                    })}
                    className="text-xs font-bold text-slate-600 hover:text-blue-600 transition-colors cursor-pointer"
                  >
                    Post RFQ
                  </button>

                  <Link
                    href={`/directory?industry=${encodeURIComponent(cat.name)}`}
                    className={`${cat.theme.btnStyle} px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-md group-hover:gap-2`}
                  >
                    <span>View Businesses</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom Banner */}
        <div className="bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-700 rounded-3xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-6 border border-white/10 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl font-black">Have an unlisted industrial sector or category?</h3>
            <p className="text-xs text-blue-100 max-w-xl">
              IndiNiger BizHub roadmap expands to 62 complete categories. Submit your sector requirements to Kumud Gameti directly for prioritized onboarding.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href={`https://wa.me/${KUMUD_WHATSAPP_NUMBER}?text=${encodeURIComponent(
                'Hello Kumud Gameti, I would like to propose a new business category for IndiNiger BizHub.'
              )}`}
              target="_top"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-3 rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg transition-all"
            >
              <Phone className="w-4 h-4" />
              <span>WhatsApp Category Proposal</span>
            </a>
            <button
              onClick={() => openEnquiryModal({
                title: 'Request Category Addition / Custom Sector',
                subtitle: 'Propose a new business vertical for integration into IndiNiger BizHub.',
                type: 'general_contact',
              })}
              className="bg-amber-400 hover:bg-amber-300 text-slate-950 px-5 py-3 rounded-xl text-xs font-bold shadow-md cursor-pointer transition-all"
            >
              Submit Form Proposal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
