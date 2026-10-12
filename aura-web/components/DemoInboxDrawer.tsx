'use client';

import React, { useState, useEffect } from 'react';
import {
  X,
  Inbox,
  Trash2,
  Download,
  Building2,
  Calendar,
  Sparkles,
  User,
  Clock,
  ArrowRight,
} from 'lucide-react';
import { getStoredEnquiries, clearDemoEnquiries, DemoEnquiry } from '@/lib/demoStorage';

interface DemoInboxDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DemoInboxDrawer({ isOpen, onClose }: DemoInboxDrawerProps) {
  const [enquiries, setEnquiries] = useState<DemoEnquiry[]>([]);

  useEffect(() => {
    const fetchEnquiries = () => {
      setEnquiries(getStoredEnquiries());
    };
    fetchEnquiries();
    window.addEventListener('indiniger_enquiry_added', fetchEnquiries);
    return () => window.removeEventListener('indiniger_enquiry_added', fetchEnquiries);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleDownload = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(enquiries, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', 'indiniger-demo-leads.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-bizhub-card border-l border-bizhub-gold/30 text-slate-100 shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl overflow-hidden border border-amber-400/60 bg-black shrink-0 p-0.5 shadow-xs">
                <img src="/logo.jpg" alt="Official Logo" className="w-full h-full object-cover rounded-lg" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-white flex items-center gap-1.5">
                  <span>Demo Leads Desk</span>
                  <span className="bg-amber-400 text-slate-950 font-mono text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                    {enquiries.length}
                  </span>
                </h3>
                <p className="text-[11px] text-slate-400">Kumud Gameti Lead Inspection Desk</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              aria-label="Close drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Submissions List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {enquiries.length === 0 ? (
              <div className="text-center py-16 text-slate-400 space-y-2">
                <Inbox className="w-10 h-10 mx-auto text-slate-600 stroke-1" />
                <p className="text-sm">No enquiries recorded yet.</p>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Submit any demo form on the site to see real-time lead capture here!
                </p>
              </div>
            ) : (
              enquiries.map((enq) => (
                <div
                  key={enq.id}
                  className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-bizhub-gold/40 transition-colors text-xs space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        enq.type === 'business_inquiry'
                          ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                          : enq.type === 'event_booth'
                          ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      }`}
                    >
                      {enq.type.replace('_', ' ')}
                    </span>
                    <span className="text-[10px] text-slate-500 flex items-center gap-1 font-mono">
                      <Clock className="w-3 h-3" />
                      {enq.timestamp}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-semibold text-white text-sm">{enq.companyName}</h4>
                    <p className="text-slate-400 flex items-center gap-1 text-[11px] mt-0.5">
                      <User className="w-3 h-3 text-bizhub-gold" />
                      <span>{enq.fullName}</span> &middot; <span>{enq.email}</span>
                    </p>
                  </div>

                  {enq.targetEntity && (
                    <div className="p-1.5 rounded-lg bg-slate-950 border border-slate-800 text-[11px] text-slate-300">
                      <span className="text-bizhub-gold font-medium">Target:</span> {enq.targetEntity}
                    </div>
                  )}

                  <div className="text-[11px] text-slate-300 bg-slate-800/40 p-2 rounded-lg leading-relaxed">
                    "{enq.message}"
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                    <span>
                      {enq.industry} &middot; {enq.country}
                    </span>
                    <span className="text-emerald-400 font-medium">Recorded Locally</span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer actions */}
          <div className="p-4 border-t border-slate-800 bg-slate-900/60 flex items-center justify-between gap-3 text-xs">
            <button
              onClick={() => {
                if (confirm('Reset demo enquiries back to seed records?')) {
                  clearDemoEnquiries();
                }
              }}
              className="text-slate-400 hover:text-red-400 flex items-center gap-1 text-xs"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Reset Records</span>
            </button>

            <button
              onClick={handleDownload}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 text-slate-200 hover:text-white border border-slate-700"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export JSON</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
