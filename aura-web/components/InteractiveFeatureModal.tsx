'use client';

import React, { useState } from 'react';
import {
  X,
  ShoppingCart,
  TrendingUp,
  ArrowLeftRight,
  Users2,
  Rocket,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Search,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export type FeatureType = 'buy' | 'sell' | 'trade' | 'connect' | 'grow';

interface InteractiveFeatureModalProps {
  type: FeatureType | null;
  onClose: () => void;
  onOpenEnquiry: (customTitle: string, entity: string) => void;
}

export default function InteractiveFeatureModal({
  type,
  onClose,
  onOpenEnquiry,
}: InteractiveFeatureModalProps) {
  const [activeStep, setActiveStep] = useState(1);
  const [simulatedData, setSimulatedData] = useState({
    itemType: 'Pre-Cast Steel & Fasteners',
    origin: 'India',
    dest: 'Niger & West Africa',
    volume: '50-100 Metric Tons',
    offeringTitle: 'Hydraulic Press Plants',
  });

  if (!type) return null;

  const getFeatureMeta = () => {
    switch (type) {
      case 'buy':
        return {
          title: 'BUY — Global Sourcing Simulator',
          subtitle: 'Discover verified suppliers, negotiate volume terms, and request bulk product quotations.',
          color: 'from-blue-600 to-cyan-500',
          icon: ShoppingCart,
          accent: '#18BCE5',
        };
      case 'sell':
        return {
          title: 'SELL — Supplier Catalog Launcher',
          subtitle: 'Showcase manufactured goods and industrial capacities to buyers across 57 markets.',
          color: 'from-amber-500 to-yellow-400',
          icon: TrendingUp,
          accent: '#F5B82E',
        };
      case 'trade':
        return {
          title: 'TRADE — Cross-Border Corridor Estimator',
          subtitle: 'Model shipping routes, port clearance times, and tariff advisory between India, Africa, and beyond.',
          color: 'from-emerald-600 to-teal-400',
          icon: ArrowLeftRight,
          accent: '#16A56A',
        };
      case 'connect':
        return {
          title: 'CONNECT — B2B Matchmaker Engine',
          subtitle: 'Direct peer matchmaking between enterprise buyers, distributors, and EPC contractors.',
          color: 'from-purple-600 to-indigo-500',
          icon: Users2,
          accent: '#8B5CF6',
        };
      case 'grow':
        return {
          title: 'GROW — Joint Venture & Pavilion Planner',
          subtitle: 'Scale operations via sovereign co-investment, equity syndicates, and trade exhibition pavilions.',
          color: 'from-rose-600 to-pink-500',
          icon: Rocket,
          accent: '#F43F5E',
        };
    }
  };

  const meta = getFeatureMeta();
  const Icon = meta.icon;

  const triggerComplete = () => {
    try {
      confetti({ particleCount: 40, spread: 50 });
    } catch {
      //
    }
    setActiveStep(2);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-bizhub-card border border-bizhub-gold/30 rounded-3xl max-w-xl w-full p-6 sm:p-8 text-slate-100 shadow-2xl relative animate-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center justify-between gap-3 mb-4 pr-8">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${meta.color} flex items-center justify-center text-white shadow-lg shrink-0`}>
              <Icon className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">{meta.title}</h3>
              <p className="text-xs text-slate-400">{meta.subtitle}</p>
            </div>
          </div>
          <div className="hidden sm:flex w-10 h-10 rounded-xl overflow-hidden border border-amber-400/60 bg-black shrink-0 p-0.5 shadow-sm">
            <img src="/logo.jpg" alt="Official Logo" className="w-full h-full object-cover rounded-[8px]" />
          </div>
        </div>

        {activeStep === 1 ? (
          <div className="space-y-4 py-2">
            {type === 'buy' && (
              <div className="space-y-3">
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs space-y-2">
                  <label className="text-slate-400 block font-medium">Select Sourcing Requirement:</label>
                  <select
                    value={simulatedData.itemType}
                    onChange={(e) => setSimulatedData({ ...simulatedData, itemType: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white"
                  >
                    <option value="Pre-Cast Steel & Fasteners">Pre-Cast Steel & Fasteners (Industrial Infrastructure)</option>
                    <option value="CNC Milling Centers & Hydraulic Equipment">CNC Milling Centers & Hydraulic Equipment</option>
                    <option value="Organic Cotton Yarns & Textile Blends">Organic Cotton Yarns & Textile Blends</option>
                    <option value="Solar Micro-Grid & Inverters">Solar Micro-Grid & Inverters (Sahel Off-Grid)</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                    <span className="text-slate-400 block">Estimated Matching Suppliers:</span>
                    <span className="text-base font-bold text-bizhub-gold">48 Verified Suppliers</span>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                    <span className="text-slate-400 block">Average Lead Time:</span>
                    <span className="text-base font-bold text-emerald-400">14 - 21 Days Sea Freight</span>
                  </div>
                </div>
              </div>
            )}

            {type === 'sell' && (
              <div className="space-y-3">
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs space-y-2">
                  <label className="text-slate-400 block font-medium">Catalogue Listing Preview:</label>
                  <input
                    type="text"
                    value={simulatedData.offeringTitle}
                    onChange={(e) => setSimulatedData({ ...simulatedData, offeringTitle: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white"
                  />
                </div>
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs">
                  <span className="text-slate-400 block mb-1">Exposure Channels:</span>
                  <div className="flex flex-wrap gap-2 text-[11px]">
                    <span className="bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/20">
                      57 Country Searchable Index
                    </span>
                    <span className="bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded-full border border-amber-500/20">
                      Featured Exhibition Pavilion
                    </span>
                    <span className="bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded-full border border-blue-500/20">
                      Direct RFQ Alerts
                    </span>
                  </div>
                </div>
              </div>
            )}

            {type === 'trade' && (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                    <span className="text-slate-400 block">Origin Port Hub:</span>
                    <span className="font-semibold text-white">JNPT Mumbai / Mundra (India)</span>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                    <span className="text-slate-400 block">Destination Corridor:</span>
                    <span className="font-semibold text-white">Cotonou &rarr; Niamey (Niger Hub)</span>
                  </div>
                </div>
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs">
                  <span className="text-slate-400 block mb-1">Estimated Trade Metrics:</span>
                  <div className="grid grid-cols-3 gap-2 text-center pt-1 font-mono text-xs">
                    <div className="bg-slate-800 p-1.5 rounded">
                      <span className="text-[10px] text-slate-400 block">Transit Time</span>
                      <span className="text-bizhub-gold font-bold">22 Days</span>
                    </div>
                    <div className="bg-slate-800 p-1.5 rounded">
                      <span className="text-[10px] text-slate-400 block">Customs Clear</span>
                      <span className="text-cyan-400 font-bold">48 Hours</span>
                    </div>
                    <div className="bg-slate-800 p-1.5 rounded">
                      <span className="text-[10px] text-slate-400 block">Escrow Fee</span>
                      <span className="text-emerald-400 font-bold">0.8% Demo</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {type === 'connect' && (
              <div className="space-y-3 text-xs">
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-bizhub-gold font-bold text-sm">Targeted Executive Matching</span>
                  <p className="text-slate-400">
                    Connect directly with verified managing directors, procurement heads, and trade delegations without intermediaries.
                  </p>
                </div>
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between">
                  <span className="text-slate-300">Verified Member Network:</span>
                  <span className="text-emerald-400 font-bold">Active Demo Session</span>
                </div>
              </div>
            )}

            {type === 'grow' && (
              <div className="space-y-3 text-xs">
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-bizhub-gold font-bold text-sm">International Business Expansion</span>
                  <p className="text-slate-400">
                    Access private equity syndicates, sovereign co-investment feasibility studies, and bilateral trade exhibition delegations.
                  </p>
                </div>
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between">
                  <span className="text-slate-300">Targeted Corridors:</span>
                  <span className="text-bizhub-gold font-bold">India &middot; Niger &middot; Global 57</span>
                </div>
              </div>
            )}

            <div className="pt-4 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">
                Functional Demo Simulation
              </span>
              <button
                onClick={triggerComplete}
                className="gold-btn px-5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-gold"
              >
                <span>Run Interactive Demo</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ) : (
          <div className="py-6 text-center space-y-4">
            <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-white">Simulation Completed!</h4>
              <p className="text-xs text-slate-300 max-w-sm mx-auto mt-1">
                Your parameters for <span className="text-bizhub-gold font-semibold">{meta.title}</span> have been simulated. Would you like to dispatch an official demo enquiry to the secretariat?
              </p>
            </div>

            <div className="flex justify-center gap-3 pt-2">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white hover:bg-slate-800"
              >
                Close
              </button>
              <button
                onClick={() => {
                  onClose();
                  onOpenEnquiry(`Initiate ${type.toUpperCase()} Collaboration`, `${type.toUpperCase()} Portal Action`);
                }}
                className="gold-btn px-5 py-2 rounded-xl text-xs font-semibold shadow-gold"
              >
                Proceed to Submit Enquiry
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
