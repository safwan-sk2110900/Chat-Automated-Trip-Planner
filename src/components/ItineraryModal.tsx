import React, { useState } from 'react';
import { X, Printer, Copy, Check, Calendar, MapPin, DollarSign, Download } from 'lucide-react';
import { PlannedItinerary } from '../types/travel';

interface ItineraryModalProps {
  itinerary: PlannedItinerary | null;
  onClose: () => void;
}

export const ItineraryModal: React.FC<ItineraryModalProps> = ({ itinerary, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!itinerary) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyMarkdown = () => {
    let md = `# Odyssey Itinerary: ${itinerary.destination.name}\n`;
    md += `**Traveler Type:** ${itinerary.travelerType.toUpperCase()} | **Duration:** ${itinerary.durationDays} Days | **Estimated Cost:** ~$${itinerary.totalEstimatedCostUsd} USD\n\n`;

    itinerary.days.forEach((d) => {
      md += `## Day ${d.dayNumber}: ${d.theme}\n`;
      md += `*Pacing Note:* ${d.dailyPacingNote}\n\n`;
      d.activities.forEach((a) => {
        md += `- **[${a.timeSlot}] ${a.title}** (${a.location}) ~ $${a.estimatedCostUsd}\n  ${a.description}\n`;
      });
      md += '\n';
    });

    navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden border border-stone-200">
        {/* Modal Header */}
        <div className="bg-stone-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-amber-400" />
            <h3 className="font-serif text-lg font-bold">
              {itinerary.destination.name} — Complete Dossier
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-stone-400 hover:text-white rounded-lg transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-stone-800 text-xs sm:text-sm">
          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-stone-50 rounded-xl border border-stone-200">
            <div>
              <span className="text-[11px] text-stone-500 uppercase tracking-wider block">Duration</span>
              <span className="font-semibold text-stone-900">{itinerary.durationDays} Days</span>
            </div>
            <div>
              <span className="text-[11px] text-stone-500 uppercase tracking-wider block">Archetype</span>
              <span className="font-semibold text-stone-900 capitalize">{itinerary.travelerType}</span>
            </div>
            <div>
              <span className="text-[11px] text-stone-500 uppercase tracking-wider block">Pace</span>
              <span className="font-semibold text-stone-900 capitalize">{itinerary.pace}</span>
            </div>
            <div>
              <span className="text-[11px] text-stone-500 uppercase tracking-wider block">Est. Cost</span>
              <span className="font-semibold text-stone-900 font-mono">~${itinerary.totalEstimatedCostUsd} USD</span>
            </div>
          </div>

          {/* Days */}
          <div className="space-y-6">
            {itinerary.days.map((d) => (
              <div key={d.dayNumber} className="border-b border-stone-200 pb-5">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-mono font-bold text-amber-700 uppercase">
                    Day {d.dayNumber}
                  </span>
                  <span className="text-xs text-stone-500">{d.dailyPacingNote}</span>
                </div>
                <h4 className="font-serif text-base font-bold text-stone-900 mb-3">
                  {d.theme}
                </h4>

                <div className="space-y-3">
                  {d.activities.map((act) => (
                    <div key={act.id} className="p-3 bg-stone-50 rounded-lg text-xs space-y-1">
                      <div className="flex items-center justify-between text-stone-500">
                        <span className="font-semibold text-stone-700">[{act.timeSlot}] {act.title}</span>
                        <span className="font-mono text-stone-800">~${act.estimatedCostUsd}</span>
                      </div>
                      <p className="text-stone-600">{act.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between gap-3 flex-wrap">
          <button
            onClick={handleCopyMarkdown}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-stone-700 bg-white border border-stone-300 rounded-lg hover:bg-stone-100 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Markdown Copied!' : 'Copy as Markdown'}</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors shadow-sm"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Dossier</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-stone-600 hover:text-stone-900 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
