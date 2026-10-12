'use client';

import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  User,
  Building2,
  CheckCircle2,
  Sparkles,
  Inbox,
} from 'lucide-react';
import { CATEGORIES_DATA } from '@/data/categories';
import { COUNTRIES_DATA } from '@/data/countries';
import { saveEnquiry } from '@/lib/demoStorage';
import { dispatchToWhatsApp } from '@/lib/whatsapp';
import { useModals } from '@/components/ClientLayoutWrapper';
import confetti from 'canvas-confetti';

export default function ContactPage() {
  const { openDemoDrawer } = useModals();

  const [formState, setFormState] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    industry: 'Construction & Infrastructure',
    country: 'India',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [contactWaUrl, setContactWaUrl] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!formState.name.trim()) errs.name = 'Full name is required';
    if (!formState.company.trim()) errs.company = 'Company name is required';
    if (!formState.email.trim() || !formState.email.includes('@')) errs.email = 'Valid corporate email required';
    if (!formState.message.trim() || formState.message.length < 10) errs.message = 'Please provide message details (min 10 chars)';

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    const saved = saveEnquiry({
      type: 'general_contact',
      fullName: formState.name,
      companyName: formState.company,
      email: formState.email,
      phone: formState.phone || undefined,
      industry: formState.industry,
      country: formState.country,
      message: formState.message,
    });

    const waUrl = dispatchToWhatsApp({
      fullName: formState.name,
      companyName: formState.company,
      email: formState.email,
      phone: formState.phone || undefined,
      industry: formState.industry,
      country: formState.country,
      message: formState.message,
      type: 'general_contact',
    });
    setContactWaUrl(waUrl);

    setSubmittedRef(saved.id);
    try {
      confetti({ particleCount: 50, spread: 60 });
    } catch {
      //
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header with Vibrant Gradient & Official Logo */}
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-xl border border-white/10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
            <div className="max-w-2xl space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold border border-white/30 backdrop-blur-xs">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>GLOBAL SECRETARIAT & PARTNERSHIP DESK</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
                Contact <span className="bg-gradient-to-r from-amber-300 via-pink-300 to-cyan-300 bg-clip-text text-transparent">IndiNiger BizHub</span>
              </h1>
              <p className="text-sm sm:text-base text-blue-100 leading-relaxed">
                Connect directly with our corporate liaison office for trade matchmaking, international exhibition pavilions, chamber integrations, and member onboarding.
              </p>
            </div>
            {/* Official Logo emblem */}
            <div className="flex relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden shadow-2xl border-2 border-amber-400/50 bg-slate-950 p-1 shrink-0">
              <img src="/logo.jpg" alt="Official Logo" className="w-full h-full object-cover rounded-xl" />
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Details */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div>
              <h3 className="text-xl font-black text-slate-900">Official Contact Information</h3>
              <p className="text-xs text-slate-500 mt-1">
                Direct secretariat desk &mdash; no email delays.
              </p>
            </div>

            <div className="space-y-4 text-xs text-slate-700">
              {/* Founder Contact */}
              <div className="flex items-start gap-3.5 p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
                <div className="w-12 h-12 rounded-xl overflow-hidden border border-amber-400 bg-slate-900 shadow-sm shrink-0">
                  <img src="/kumud-gameti.jpg" alt="Kumud Gameti" className="w-full h-full object-cover object-top" />
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px] font-bold">FOUNDER & BUSINESS CONTACT</span>
                  <span className="font-black text-slate-900 text-sm">Kumud Gameti</span>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Strategic Trade Leadership & Global Expansion
                  </p>
                </div>
              </div>

              {/* Single Official WhatsApp Helpline Card — Guaranteed Zero-Wrap */}
              <div className="p-4 sm:p-5 bg-gradient-to-br from-emerald-50 via-white to-teal-50 rounded-2xl border-2 border-emerald-400 shadow-sm space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">
                        EXECUTIVE WHATSAPP DESK
                      </span>
                      <span className="text-[11px] text-slate-500 font-medium">Kumud Gameti (Founder Line)</span>
                    </div>
                  </div>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full font-bold border border-emerald-200 shrink-0">
                    Online
                  </span>
                </div>

                <div className="pt-1">
                  <a
                    href="https://wa.me/919990155699"
                    target="_top"
                    rel="noopener noreferrer"
                    className="block group"
                  >
                    <span className="font-mono font-black text-xl sm:text-2xl text-slate-950 tracking-tight whitespace-nowrap block group-hover:text-emerald-600 transition-colors">
                      +91 99901 55699
                    </span>
                  </a>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Direct instant query response across all 57 corridors
                  </p>
                </div>

                <a
                  href="https://wa.me/919990155699"
                  target="_top"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all active:scale-95"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Click to Chat on WhatsApp</span>
                </a>
              </div>

              {/* Regional Hubs */}
              <div className="flex items-start gap-3.5 p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-600 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px] font-bold">REGIONAL HEADQUARTERS & HUBS</span>
                  <span className="font-bold text-slate-900 text-sm">New Delhi (India) &middot; Niamey (Niger)</span>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Liaison Representation across 57 Target Markets
                  </p>
                </div>
              </div>
            </div>

            <div className="p-3.5 bg-slate-900 rounded-2xl border border-slate-800 text-white flex items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-amber-400 block">Inspection Desk</span>
                <span className="text-[11px] text-slate-400">View local test records</span>
              </div>
              <button
                type="button"
                onClick={openDemoDrawer}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 font-semibold text-xs border border-slate-700 transition-colors shrink-0"
              >
                Open Drawer &rarr;
              </button>
            </div>
          </div>

          {/* Right Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm">
            {submittedRef ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-center justify-center mx-auto text-emerald-600">
                  <Phone className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <span className="inline-block bg-emerald-100 text-emerald-800 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Connecting to WhatsApp Desk
                  </span>
                  <h3 className="text-2xl font-bold text-slate-900">Landing Your Query on WhatsApp!</h3>
                </div>
                <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                  Your complete enquiry is pre-formatted for <strong>Kumud Gameti (+91 99901 55699)</strong>. Click below if your browser did not automatically open WhatsApp:
                </p>

                {/* Direct WhatsApp Callout */}
                <div className="p-5 bg-emerald-50 border-2 border-emerald-500 rounded-2xl text-xs text-left space-y-3 max-w-md mx-auto shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-emerald-900 text-sm flex items-center gap-2">
                      <Phone className="w-4 h-4 text-emerald-600" />
                      <span>Kumud Gameti — WhatsApp</span>
                    </span>
                    <span className="text-[11px] bg-emerald-600 text-white px-2.5 py-0.5 rounded-full font-mono font-bold">
                      +91 99901 55699
                    </span>
                  </div>
                  <p className="text-slate-700 text-xs leading-relaxed">
                    Tap the button below to launch the WhatsApp chat directly with your structured enquiry details ready to send.
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

                <div className="pt-2 flex justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setSubmittedRef(null);
                      setFormState({
                        name: '',
                        company: '',
                        email: '',
                        phone: '',
                        industry: 'Construction & Infrastructure',
                        country: 'India',
                        message: '',
                      });
                    }}
                    className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold"
                  >
                    Submit Another Query
                  </button>

                  <button
                    type="button"
                    onClick={openDemoDrawer}
                    className="px-5 py-2.5 rounded-xl bg-slate-800 text-white hover:bg-slate-700 text-xs font-semibold"
                  >
                    View in Demo Desk
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-slate-900">Submit Business Enquiry</h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Complete all marked fields to record your procurement or partnership proposal.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        placeholder="e.g. Samuel Adekunle"
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-bizhub-blue transition-colors"
                      />
                      {errors.name && <p className="text-[11px] text-red-500 mt-1">{errors.name}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Company Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formState.company}
                        onChange={(e) => setFormState({ ...formState, company: e.target.value })}
                        placeholder="e.g. Continental Minerals SARL"
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-bizhub-blue transition-colors"
                      />
                      {errors.company && <p className="text-[11px] text-red-500 mt-1">{errors.company}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Corporate Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        placeholder="e.g. s.adekunle@mineral-sarl.demo"
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-bizhub-blue transition-colors"
                      />
                      {errors.email && <p className="text-[11px] text-red-500 mt-1">{errors.email}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        {'Phone / WhatsApp'}
                      </label>
                      <input
                        type="tel"
                        value={formState.phone}
                        onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                        placeholder="+227 20 00 00 00"
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-bizhub-blue transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Industry Sector
                      </label>
                      <select
                        value={formState.industry}
                        onChange={(e) => setFormState({ ...formState, industry: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-bizhub-blue transition-colors"
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
                        value={formState.country}
                        onChange={(e) => setFormState({ ...formState, country: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-bizhub-blue transition-colors"
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
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Detail your procurement requirements, export quantities, partnership interest, or technical specifications..."
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:border-bizhub-blue transition-colors"
                    />
                    {errors.message && <p className="text-[11px] text-red-500 mt-1">{errors.message}</p>}
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
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
