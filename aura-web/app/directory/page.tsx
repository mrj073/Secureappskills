'use client';

import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Search,
  Building2,
  MapPin,
  Send,
  Eye,
  CheckCircle2,
  X,
  Sparkles,
  Phone,
} from 'lucide-react';
import { SAMPLE_BUSINESSES, BusinessListing } from '@/data/businesses';
import { CATEGORIES_DATA } from '@/data/categories';
import { COUNTRIES_DATA } from '@/data/countries';
import { useModals } from '@/components/ClientLayoutWrapper';
import { KUMUD_WHATSAPP_NUMBER } from '@/lib/whatsapp';

function DirectoryContent() {
  const searchParams = useSearchParams();
  const initialIndustry = searchParams?.get('industry') || 'All';
  const initialCountry = searchParams?.get('country') || 'All';

  const { openEnquiryModal } = useModals();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState<string>(initialIndustry);
  const [selectedCountry, setSelectedCountry] = useState<string>(initialCountry);
  const [activeBusinessModal, setActiveBusinessModal] = useState<BusinessListing | null>(null);

  const filteredBusinesses = useMemo(() => {
    return SAMPLE_BUSINESSES.filter((b) => {
      const matchesSearch =
        b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.products.some((p) => p.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesIndustry =
        selectedIndustry === 'All' ||
        b.industryId === selectedIndustry ||
        b.industryName.toLowerCase() === selectedIndustry.toLowerCase();

      const matchesCountry =
        selectedCountry === 'All' ||
        b.countryCode === selectedCountry ||
        b.countryName.toLowerCase() === selectedCountry.toLowerCase();

      return matchesSearch && matchesIndustry && matchesCountry;
    });
  }, [searchQuery, selectedIndustry, selectedCountry]);

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Vibrant Gradient Header with Official Logo */}
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-xl border border-white/10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold border border-white/30 backdrop-blur-xs">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>ACCREDITED B2B DIRECTORY &middot; 57 COUNTRIES</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
                Global <span className="bg-gradient-to-r from-amber-300 via-pink-300 to-cyan-300 bg-clip-text text-transparent">Business Directory</span>
              </h1>
              <p className="text-sm sm:text-base text-blue-100 leading-relaxed">
                Discover accredited manufacturers, export houses, EPC contractors, and service providers. Filter by industry vertical and country of operation to initiate cross-border commercial discussions.
              </p>
            </div>
            {/* Official Logo */}
            <div className="flex relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden shadow-2xl border-2 border-amber-400/50 bg-slate-950 p-1 shrink-0">
              <img src="/logo.jpg" alt="Official Logo" className="w-full h-full object-cover rounded-xl" />
            </div>
          </div>
        </div>

        {/* Filters Toolbar */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            {/* Search */}
            <div className="md:col-span-5 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by company name, products, specifications..."
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl border-2 border-slate-200 bg-slate-50 text-xs text-slate-900 focus:outline-none focus:border-blue-600 transition-colors"
              />
            </div>

            {/* Industry Filter */}
            <div className="md:col-span-4">
              <select
                value={selectedIndustry}
                onChange={(e) => setSelectedIndustry(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-2xl border-2 border-slate-200 bg-slate-50 text-xs text-slate-800 font-semibold focus:outline-none focus:border-blue-600"
              >
                <option value="All">All Industries (17 Sectors)</option>
                {CATEGORIES_DATA.map((cat) => (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Country Filter */}
            <div className="md:col-span-3">
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-2xl border-2 border-slate-200 bg-slate-50 text-xs text-slate-800 font-semibold focus:outline-none focus:border-blue-600"
              >
                <option value="All">All Countries (57 Markets)</option>
                {COUNTRIES_DATA.map((c) => (
                  <option key={c.code} value={c.name}>
                    {c.flag} {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100 font-medium">
            <span>
              Showing <strong className="text-slate-900 font-bold">{filteredBusinesses.length}</strong> accredited listings
            </span>
            {(selectedIndustry !== 'All' || selectedCountry !== 'All' || searchQuery) && (
              <button
                onClick={() => {
                  setSelectedIndustry('All');
                  setSelectedCountry('All');
                  setSearchQuery('');
                }}
                className="text-blue-600 hover:text-blue-800 font-bold cursor-pointer"
              >
                Reset all filters
              </button>
            )}
          </div>
        </div>

        {/* Business Grid */}
        {filteredBusinesses.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 p-8 space-y-3">
            <Building2 className="w-12 h-12 mx-auto text-slate-300 stroke-1" />
            <h3 className="text-lg font-bold text-slate-800">No matching business listings found</h3>
            <p className="text-xs text-slate-500">
              Try adjusting your industry or country filter to broaden the search results.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedIndustry('All');
                setSelectedCountry('All');
              }}
              className="px-5 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBusinesses.map((biz) => (
              <div
                key={biz.id}
                className="bg-white rounded-3xl border-2 border-slate-200 p-6 hover:shadow-xl hover:border-blue-400 transition-all duration-200 hover:-translate-y-1 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  {/* Card Header */}
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                      {biz.badge}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs text-slate-700 font-bold">
                      <span className="text-lg">{biz.flag}</span>
                      <span>{biz.countryName}</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-black text-slate-900 group-hover:text-blue-600 transition-colors">
                      {biz.name}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-slate-500 font-medium mt-1">
                      <span className="text-indigo-600 font-bold">{biz.industryName}</span>
                      <span>&bull;</span>
                      <span>{biz.businessType}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                    {biz.description}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Featured Products & Solutions:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {biz.products.slice(0, 3).map((prod, pIdx) => (
                        <span
                          key={pIdx}
                          className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-medium truncate max-w-[150px]"
                        >
                          {prod}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setActiveBusinessModal(biz)}
                    className="px-3.5 py-2 rounded-xl border border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-100 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Details</span>
                  </button>

                  <button
                    onClick={() => openEnquiryModal({
                      title: `Submit Enquiry: ${biz.name}`,
                      subtitle: `Contact the commercial desk of ${biz.name} (${biz.countryName}).`,
                      targetEntity: biz.name,
                      type: 'business_inquiry',
                    })}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md cursor-pointer transition-all"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Send Enquiry</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Business Details Inspection Modal */}
      {activeBusinessModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 text-slate-900 shadow-2xl relative my-8 animate-in zoom-in-95 duration-150 space-y-5">
            <button
              onClick={() => setActiveBusinessModal(null)}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-3xl">{activeBusinessModal.flag}</span>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-100 px-2.5 py-0.5 rounded-full border border-blue-200">
                  {activeBusinessModal.tier}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  Est. {activeBusinessModal.establishedYear}
                </span>
              </div>

              <div>
                <h3 className="text-2xl font-black text-slate-900 leading-tight">
                  {activeBusinessModal.name}
                </h3>
                <p className="text-xs text-indigo-600 font-semibold mt-1">
                  {activeBusinessModal.industryName} &middot; {activeBusinessModal.countryName} &middot; {activeBusinessModal.businessType}
                </p>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-700 italic">
                "{activeBusinessModal.tagline}"
              </div>

              <div className="space-y-1.5 text-xs text-slate-600">
                <span className="font-bold text-slate-400 uppercase tracking-wider block">Company Overview:</span>
                <p className="leading-relaxed">{activeBusinessModal.description}</p>
              </div>

              <div className="space-y-2 text-xs">
                <span className="font-bold text-slate-400 uppercase tracking-wider block">
                  Catalogued Products & Industrial Offerings:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeBusinessModal.products.map((p, idx) => (
                    <div key={idx} className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-slate-800 flex items-center gap-2 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="truncate">{p}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                <button
                  onClick={() => setActiveBusinessModal(null)}
                  className="px-4 py-2 rounded-xl text-xs text-slate-500 hover:text-slate-800 font-semibold"
                >
                  Close
                </button>

                <div className="flex gap-2">
                  <a
                    href={`https://wa.me/${KUMUD_WHATSAPP_NUMBER}?text=${encodeURIComponent(
                      `Hello Kumud Gameti, I would like to inquire about connecting with ${activeBusinessModal.name} (${activeBusinessModal.countryName}).`
                    )}`}
                    target="_top"
                    rel="noopener noreferrer"
                    className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-md flex items-center gap-1.5 transition-all"
                  >
                    <Phone className="w-4 h-4" />
                    <span>WhatsApp Inquiry</span>
                  </a>

                  <button
                    onClick={() => {
                      const b = activeBusinessModal;
                      setActiveBusinessModal(null);
                      openEnquiryModal({
                        title: `Submit Enquiry: ${b.name}`,
                        subtitle: `Contact the commercial desk of ${b.name} (${b.countryName}).`,
                        targetEntity: b.name,
                        type: 'business_inquiry',
                      });
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-md transition-all cursor-pointer"
                  >
                    Fill Form
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function DirectoryPage() {
  return (
    <React.Suspense
      fallback={
        <div className="min-h-screen bg-slate-50 flex items-center justify-center text-xs text-slate-500 font-bold">
          Loading Global Business Directory...
        </div>
      }
    >
      <DirectoryContent />
    </React.Suspense>
  );
}
