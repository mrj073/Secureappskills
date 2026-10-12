'use client';

import React, { useState } from 'react';
import {
  X,
  Send,
  Building2,
  Mail,
  User,
  Phone,
  Globe2,
  CheckCircle2,
  Sparkles,
  AlertCircle,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CATEGORIES_DATA } from '@/data/categories';
import { COUNTRIES_DATA } from '@/data/countries';
import { saveEnquiry } from '@/lib/demoStorage';
import { dispatchToWhatsApp, generateWhatsAppUrl } from '@/lib/whatsapp';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  targetEntity?: string;
  defaultType?: 'business_inquiry' | 'event_booth' | 'join_network' | 'general_contact';
}

export default function EnquiryModal({
  isOpen,
  onClose,
  title = 'Submit Business Enquiry',
  subtitle = 'Connect directly with cross-border enterprises, suppliers, and trade delegates.',
  targetEntity,
  defaultType = 'business_inquiry',
}: EnquiryModalProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    industry: 'Construction & Infrastructure',
    country: 'India',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [lastSubmittedId, setLastSubmittedId] = useState<string>('');
  const [generatedWaUrl, setGeneratedWaUrl] = useState<string>('');

  if (!isOpen) return null;

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.companyName.trim()) newErrors.companyName = 'Company name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Work email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      newErrors.message = 'Please provide at least 10 characters detailing your request';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const saved = saveEnquiry({
      type: defaultType,
      fullName: formData.fullName,
      companyName: formData.companyName,
      email: formData.email,
      phone: formData.phone || undefined,
      industry: formData.industry,
      country: formData.country,
      targetEntity: targetEntity || undefined,
      message: formData.message,
    });

    const waUrl = dispatchToWhatsApp({
      fullName: formData.fullName,
      companyName: formData.companyName,
      email: formData.email,
      phone: formData.phone || undefined,
      industry: formData.industry,
      country: formData.country,
      targetEntity: targetEntity || undefined,
      message: formData.message,
      type: defaultType,
    });
    setGeneratedWaUrl(waUrl);

    setLastSubmittedId(saved.id);
    setIsSubmitted(true);

    try {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#F5B82E', '#1457B8', '#16A56A', '#18BCE5'],
      });
    } catch {
      // Confetti fallback
    }
  };

  const resetAndClose = () => {
    setIsSubmitted(false);
    setFormData({
      fullName: '',
      companyName: '',
      email: '',
      phone: '',
      industry: 'Construction & Infrastructure',
      country: 'India',
      message: '',
    });
    setErrors({});
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-bizhub-card border border-bizhub-gold/30 rounded-3xl max-w-xl w-full p-6 sm:p-8 text-slate-100 shadow-2xl relative my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={resetAndClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h3 className="text-2xl font-bold text-white">Enquiry Recorded!</h3>
              <p className="text-sm text-slate-300">
                Your demo enquiry has been logged successfully under reference:
              </p>
              <span className="inline-block bg-slate-800 text-bizhub-gold font-mono text-xs px-3 py-1 rounded-full border border-slate-700 mt-2">
                {lastSubmittedId}
              </span>
            </div>

            <div className="bg-slate-900/80 rounded-2xl p-4 border border-slate-800 text-left text-xs space-y-2 text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-400">Company:</span>
                <span className="font-semibold text-white">{formData.companyName}</span>
              </div>
              {targetEntity && (
                <div className="flex justify-between">
                  <span className="text-slate-400">Target Entity:</span>
                  <span className="text-bizhub-gold font-medium">{targetEntity}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-slate-400">Contact:</span>
                <span>{formData.fullName} ({formData.email})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Sector & Country:</span>
                <span>{formData.industry} &middot; {formData.country}</span>
              </div>
            </div>

            {/* WhatsApp Direct Dispatch Card */}
            <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-xs text-left space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-emerald-400 flex items-center gap-1.5">
                  <Phone className="w-4 h-4" />
                  <span>Forwarded to WhatsApp</span>
                </span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-mono">
                  +91 99901 55699
                </span>
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Your message has been pre-formatted and sent to <strong>Kumud Gameti</strong> on WhatsApp. If WhatsApp didn't open automatically, click the button below:
              </p>
              <a
                href={generatedWaUrl}
                target="_top"
                className="inline-flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-lg transition-all hover:scale-[1.01]"
              >
                <Phone className="w-4 h-4 shrink-0" />
                <span>Open WhatsApp Chat Now</span>
                <span className="hidden sm:inline font-mono font-bold text-emerald-200">(&#43;91 99901 55699)</span>
              </a>
            </div>

            <div className="pt-2 flex justify-center gap-3">
              <button
                onClick={resetAndClose}
                className="px-6 py-2.5 rounded-xl text-xs text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                Close & Return
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6 flex items-start justify-between gap-4 pr-8">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-bizhub-gold/10 text-bizhub-gold text-xs font-semibold border border-bizhub-gold/20 mb-3">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>IndiNiger Marketplace Desk</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">{title}</h3>
                <p className="text-xs text-slate-400 mt-1">{subtitle}</p>
              </div>
              <div className="w-12 h-12 rounded-xl overflow-hidden border border-amber-400/60 bg-black shrink-0 p-0.5 shadow-md">
                <img src="/logo.jpg" alt="Official Logo" className="w-full h-full object-cover rounded-[10px]" />
              </div>
            </div>
            {targetEntity && (
              <div className="mb-4 p-2.5 rounded-xl bg-slate-900/70 border border-bizhub-gold/20 text-xs flex items-center gap-2">
                <span className="text-slate-400">Regarding:</span>
                <span className="text-bizhub-gold font-semibold">{targetEntity}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Full Name <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Jean Dupont"
                      className="w-full bg-slate-900/90 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-bizhub-gold transition-colors"
                    />
                  </div>
                  {errors.fullName && (
                    <p className="text-[11px] text-red-400 mt-1">{errors.fullName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Company / Organisation <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      placeholder="e.g. Sahel Engineering SARL"
                      className="w-full bg-slate-900/90 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-bizhub-gold transition-colors"
                    />
                  </div>
                  {errors.companyName && (
                    <p className="text-[11px] text-red-400 mt-1">{errors.companyName}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Corporate Email <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. contact@company.com"
                      className="w-full bg-slate-900/90 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-bizhub-gold transition-colors"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-[11px] text-red-400 mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Phone / WhatsApp Number
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+227 20 00 00 00 / +91 ..."
                      className="w-full bg-slate-900/90 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-bizhub-gold transition-colors"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Industry Category
                  </label>
                  <select
                    value={formData.industry}
                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                    className="w-full bg-slate-900/90 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-bizhub-gold transition-colors"
                  >
                    {CATEGORIES_DATA.map((cat) => (
                      <option key={cat.id} value={cat.name}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Country of Operation
                  </label>
                  <select
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full bg-slate-900/90 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-bizhub-gold transition-colors"
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
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Enquiry Details & Specifications <span className="text-red-400">*</span>
                </label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Detail your procurement requirements, partnership scope, volume, or delegation request..."
                  className="w-full bg-slate-900/90 border border-slate-700 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-bizhub-gold transition-colors"
                />
                {errors.message && (
                  <p className="text-[11px] text-red-400 mt-1">{errors.message}</p>
                )}
              </div>

              <div className="pt-2 flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-3">
                <span className="text-[11px] text-slate-400 text-center sm:text-left">
                  100% Client-Side &middot; Instant WhatsApp
                </span>
                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={resetAndClose}
                    className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs text-slate-400 hover:text-white hover:bg-slate-800 transition-colors text-center"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-lg cursor-pointer transition-all hover:scale-[1.02]"
                  >
                    <Phone className="w-3.5 h-3.5 text-white shrink-0" />
                    <span>Send Query to WhatsApp</span>
                    <span className="hidden sm:inline font-mono text-emerald-200 font-bold">(&#43;91 99901 55699)</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
