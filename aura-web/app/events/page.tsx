'use client';

import React, { useState } from 'react';
import {
  Calendar,
  MapPin,
  Sparkles,
  Eye,
  X,
  Ticket,
  Phone,
} from 'lucide-react';
import { SAMPLE_EVENTS, ExhibitionEvent } from '@/data/events';
import { useModals } from '@/components/ClientLayoutWrapper';
import { KUMUD_WHATSAPP_NUMBER } from '@/lib/whatsapp';

export default function EventsPage() {
  const { openEnquiryModal } = useModals();
  const [selectedEventModal, setSelectedEventModal] = useState<ExhibitionEvent | null>(null);
  const [formatFilter, setFormatFilter] = useState('All');

  const filteredEvents = SAMPLE_EVENTS.filter((e) => {
    if (formatFilter === 'All') return true;
    return e.format.toLowerCase().includes(formatFilter.toLowerCase());
  });

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Vibrant Gradient Header with Official Logo */}
        <div className="bg-gradient-to-r from-fuchsia-700 via-purple-700 to-indigo-800 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-xl border border-white/10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold border border-white/30 backdrop-blur-xs">
                <Calendar className="w-3.5 h-3.5 text-amber-300" />
                <span>INTERNATIONAL EXPOS & B2B CONCLAVES</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
                Exhibitions & <span className="bg-gradient-to-r from-amber-300 via-pink-300 to-cyan-300 bg-clip-text text-transparent">Trade Summits</span>
              </h1>
              <p className="text-sm sm:text-base text-purple-100 leading-relaxed">
                Explore upcoming international trade shows, buyer-seller conclaves, and multi-industry pavilions connecting Indian manufacturing, African resources, and global commercial delegations.
              </p>
              <div className="p-3 bg-white/10 rounded-2xl border border-white/15 text-xs text-purple-100">
                &#9432; <strong>Demo Notice:</strong> Event listings displayed here represent demonstrative summit schedules to simulate exhibition booking and delegate registration workflows.
              </div>
            </div>
            {/* Official Logo */}
            <div className="flex relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden shadow-2xl border-2 border-amber-400/50 bg-slate-950 p-1 shrink-0">
              <img src="/logo.jpg" alt="Official Logo" className="w-full h-full object-cover rounded-xl" />
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm flex flex-wrap gap-2 items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {['All', 'In-Person', 'Conclave', 'Virtual Hybrid'].map((f) => (
              <button
                key={f}
                onClick={() => setFormatFilter(f)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  formatFilter === f
                    ? 'bg-fuchsia-600 text-white shadow-md'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="text-xs text-slate-500 font-semibold">
            Showing <strong className="text-slate-900">{filteredEvents.length}</strong> Trade Events
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((evt) => (
            <div
              key={evt.id}
              className="bg-white rounded-3xl border-2 border-slate-200 hover:border-purple-400 p-6 sm:p-7 hover:shadow-xl transition-all duration-200 hover:-translate-y-1 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-400 to-orange-400 text-slate-950 font-mono shadow-xs">
                    {evt.badge}
                  </span>
                  <span className="text-xs font-bold text-fuchsia-600 bg-fuchsia-50 px-2.5 py-0.5 rounded-full border border-fuchsia-200">
                    {evt.format}
                  </span>
                </div>

                <h3 className="text-xl font-black text-slate-900 group-hover:text-purple-600 transition-colors">
                  {evt.title}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <div className="space-y-1">
                    <span className="text-slate-400 block text-[11px] font-bold">DATE:</span>
                    <span className="font-bold text-slate-800 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-amber-500" />
                      {evt.date}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-slate-400 block text-[11px] font-bold">LOCATION:</span>
                    <span className="font-bold text-slate-800 flex items-center gap-1.5 truncate">
                      <MapPin className="w-3.5 h-3.5 text-blue-500" />
                      <span className="truncate">{evt.location}</span>
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {evt.description}
                </p>

                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    Focused Industrial Categories:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {evt.sectorsFocused.map((sec, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-[11px] px-2.5 py-1 rounded-lg bg-purple-50 text-purple-700 font-semibold border border-purple-200"
                      >
                        {sec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between gap-3">
                <button
                  onClick={() => setSelectedEventModal(evt)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-100 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Inspect</span>
                </button>

                <button
                  onClick={() => openEnquiryModal({
                    title: `Exhibition Enquiry: ${evt.title}`,
                    subtitle: `Reserve an exhibition booth or register as an official trade delegate.`,
                    targetEntity: evt.title,
                    type: 'event_booth',
                  })}
                  className="bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-500 hover:to-orange-500 text-slate-950 px-5 py-2.5 rounded-xl text-xs font-black flex items-center gap-1.5 shadow-md cursor-pointer transition-all"
                >
                  <Ticket className="w-3.5 h-3.5" />
                  <span>Book Booth</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for inspect event */}
        {selectedEventModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 text-slate-900 shadow-2xl relative space-y-5 animate-in fade-in zoom-in-95 duration-150">
              <button
                onClick={() => setSelectedEventModal(null)}
                className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-amber-400 text-slate-950 inline-block">
                  {selectedEventModal.badge}
                </span>
                <h3 className="text-2xl font-black text-slate-900 mt-2">
                  {selectedEventModal.title}
                </h3>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-400 font-bold">Dates:</span>
                  <span className="font-bold text-slate-800">{selectedEventModal.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400 font-bold">Venue & Host City:</span>
                  <span className="font-bold text-slate-800">{selectedEventModal.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400 font-bold">Summit Format:</span>
                  <span className="font-bold text-purple-600">{selectedEventModal.format}</span>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {selectedEventModal.description}
              </p>

              <div className="pt-2 flex flex-wrap gap-3">
                <button
                  onClick={() => {
                    const evt = selectedEventModal;
                    setSelectedEventModal(null);
                    openEnquiryModal({
                      title: `Exhibition Enquiry: ${evt.title}`,
                      subtitle: `Reserve an exhibition booth or register as an official trade delegate.`,
                      targetEntity: evt.title,
                      type: 'event_booth',
                    });
                  }}
                  className="bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-500 hover:to-orange-500 text-slate-950 font-bold px-6 py-3 rounded-xl text-xs shadow-md"
                >
                  Proceed to Booth Reservation
                </button>
                <a
                  href={`https://wa.me/${KUMUD_WHATSAPP_NUMBER}?text=${encodeURIComponent(
                    `Hello Kumud Gameti, I would like to inquire about booking a booth or attending the ${selectedEventModal.title}.`
                  )}`}
                  target="_top"
                  rel="noopener noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-3 rounded-xl text-xs shadow-md flex items-center gap-1.5"
                >
                  <Phone className="w-4 h-4" />
                  <span>WhatsApp Inquiry</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
