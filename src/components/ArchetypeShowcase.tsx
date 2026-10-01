import React from 'react';
import { Users, User, Heart, Shield, Clock, Baby, Coffee, Wine, Sparkles, Compass, CheckCircle2 } from 'lucide-react';
import { TravelerType } from '../types/travel';

interface ArchetypeShowcaseProps {
  onSelectAndPlan: (type: TravelerType) => void;
}

export const ArchetypeShowcase: React.FC<ArchetypeShowcaseProps> = ({ onSelectAndPlan }) => {
  return (
    <section id="trip-archetypes" className="py-20 bg-stone-100/70 border-y border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
            Travel Archetypes & Curation Logic
          </span>
          <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-bold tracking-tight text-stone-900 text-balance">
            Engineered around how you actually experience the world.
          </h2>
          <p className="mt-3 text-stone-600 text-base leading-relaxed">
            A family with two toddlers demands drastically different logistics than a solo creative sabbatical or a cliffside honeymoon. Every itinerary, voice response, and webhook workflow adapts dynamically.
          </p>
        </div>

        {/* 3 Archetype Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: Family */}
          <div className="group flex flex-col bg-white border border-stone-200/90 rounded-2xl p-7 shadow-sm hover:shadow-md transition-all">
            {/* Visual Header / Atmospheric Banner */}
            <div className="relative h-44 rounded-xl overflow-hidden bg-gradient-to-br from-amber-800/80 via-stone-900 to-amber-950 p-5 flex flex-col justify-between text-white">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono tracking-wider uppercase text-amber-300">
                  01. Archetype
                </span>
                <div className="w-8 h-8 rounded-lg bg-white/10 backdrop-blur-md flex items-center justify-center">
                  <Users className="w-4 h-4 text-amber-300" />
                </div>
              </div>
              <div>
                <h3 className="font-serif text-2xl font-bold text-white">
                  The Family Expedition
                </h3>
                <p className="text-xs text-amber-100/80 mt-1">
                  Multi-generational harmony without parental burnout.
                </p>
              </div>
            </div>

            {/* Core Pillars */}
            <div className="mt-6 space-y-4 flex-1">
              <div className="flex items-start gap-3">
                <Baby className="w-4 h-4 text-amber-700 mt-0.5 shrink-0" />
                <div className="text-xs leading-normal">
                  <strong className="text-stone-900 font-semibold block">Kid Pacing & Nap Breaks:</strong>
                  <span className="text-stone-600">Zero rushing. Dedicated 2-hour midday recovery windows and stroller-cleared walking paths.</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Shield className="w-4 h-4 text-amber-700 mt-0.5 shrink-0" />
                <div className="text-xs leading-normal">
                  <strong className="text-stone-900 font-semibold block">Family Suites & Safety Mapping:</strong>
                  <span className="text-stone-600">Connecting rooms, verified childproof balconies, and pre-indexed 24/7 pediatric clinics.</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Sparkles className="w-4 h-4 text-amber-700 mt-0.5 shrink-0" />
                <div className="text-xs leading-normal">
                  <strong className="text-stone-900 font-semibold block">Dual-Generation Engagement:</strong>
                  <span className="text-stone-600">Activities captivating for 6-year-olds and 70-year-olds alike (interactive workshops, private boat charters).</span>
                </div>
              </div>
            </div>

            {/* Unboxed Metadata */}
            <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
              <span>Avg $380 - $520/day</span>
              <span aria-hidden="true">·</span>
              <span>4 - 6 Travelers</span>
              <span aria-hidden="true">·</span>
              <span>Relaxed Pacing</span>
            </div>

            {/* Action */}
            <button
              onClick={() => onSelectAndPlan('family')}
              className="mt-5 w-full py-2.5 px-4 text-xs font-semibold text-stone-900 bg-stone-100 hover:bg-stone-200 border border-stone-200 rounded-lg transition-colors text-center"
            >
              Plan Family Itinerary
            </button>
          </div>

          {/* Card 2: Solo */}
          <div className="group flex flex-col bg-white border border-stone-200/90 rounded-2xl p-7 shadow-sm hover:shadow-md transition-all">
            {/* Visual Header / Atmospheric Banner */}
            <div className="relative h-44 rounded-xl overflow-hidden bg-gradient-to-br from-emerald-900/90 via-stone-900 to-teal-950 p-5 flex flex-col justify-between text-white">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono tracking-wider uppercase text-emerald-300">
                  02. Archetype
                </span>
                <div className="w-8 h-8 rounded-lg bg-white/10 backdrop-blur-md flex items-center justify-center">
                  <User className="w-4 h-4 text-emerald-300" />
                </div>
              </div>
              <div>
                <h3 className="font-serif text-2xl font-bold text-white">
                  The Solo Odysseys
                </h3>
                <p className="text-xs text-emerald-100/80 mt-1">
                  Radical autonomy, creative rejuvenation & verified safety.
                </p>
              </div>
            </div>

            {/* Core Pillars */}
            <div className="mt-6 space-y-4 flex-1">
              <div className="flex items-start gap-3">
                <Compass className="w-4 h-4 text-emerald-700 mt-0.5 shrink-0" />
                <div className="text-xs leading-normal">
                  <strong className="text-stone-900 font-semibold block">Spontaneous Freedom:</strong>
                  <span className="text-stone-600">Zero compromises. Wake up, pivot your day, and follow hidden artisan alleys without consensus meetings.</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Coffee className="w-4 h-4 text-emerald-700 mt-0.5 shrink-0" />
                <div className="text-xs leading-normal">
                  <strong className="text-stone-900 font-semibold block">Social Counter Dining:</strong>
                  <span className="text-stone-600">Vetted open-kitchen chef bars and social boutique stays where solo travelers are warmly embraced.</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Shield className="w-4 h-4 text-emerald-700 mt-0.5 shrink-0" />
                <div className="text-xs leading-normal">
                  <strong className="text-stone-900 font-semibold block">Independent Safety Radar:</strong>
                  <span className="text-stone-600">Neighborhood walkability metrics, illuminated transit hubs, and 1-tap live location check-ins.</span>
                </div>
              </div>
            </div>

            {/* Unboxed Metadata */}
            <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
              <span>Avg $140 - $210/day</span>
              <span aria-hidden="true">·</span>
              <span>1 Independent Traveler</span>
              <span aria-hidden="true">·</span>
              <span>Flexible Pacing</span>
            </div>

            {/* Action */}
            <button
              onClick={() => onSelectAndPlan('solo')}
              className="mt-5 w-full py-2.5 px-4 text-xs font-semibold text-stone-900 bg-stone-100 hover:bg-stone-200 border border-stone-200 rounded-lg transition-colors text-center"
            >
              Plan Solo Itinerary
            </button>
          </div>

          {/* Card 3: Couple */}
          <div className="group flex flex-col bg-white border border-stone-200/90 rounded-2xl p-7 shadow-sm hover:shadow-md transition-all">
            {/* Visual Header / Atmospheric Banner */}
            <div className="relative h-44 rounded-xl overflow-hidden bg-gradient-to-br from-rose-950 via-stone-900 to-amber-950 p-5 flex flex-col justify-between text-white">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono tracking-wider uppercase text-rose-300">
                  03. Archetype
                </span>
                <div className="w-8 h-8 rounded-lg bg-white/10 backdrop-blur-md flex items-center justify-center">
                  <Heart className="w-4 h-4 text-rose-300" />
                </div>
              </div>
              <div>
                <h3 className="font-serif text-2xl font-bold text-white">
                  The Couple's Escape
                </h3>
                <p className="text-xs text-rose-100/80 mt-1">
                  Intimacy, candlelit vistas & unforgettable shared memories.
                </p>
              </div>
            </div>

            {/* Core Pillars */}
            <div className="mt-6 space-y-4 flex-1">
              <div className="flex items-start gap-3">
                <Wine className="w-4 h-4 text-rose-700 mt-0.5 shrink-0" />
                <div className="text-xs leading-normal">
                  <strong className="text-stone-900 font-semibold block">Sunset Prime Reservations:</strong>
                  <span className="text-stone-600">Front-row cliffside tables timed to the minute with dusk lighting and sommelier pairings.</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Sparkles className="w-4 h-4 text-rose-700 mt-0.5 shrink-0" />
                <div className="text-xs leading-normal">
                  <strong className="text-stone-900 font-semibold block">Secluded Romance Stays:</strong>
                  <span className="text-stone-600">Private plunge pools, Hinoki tubs, terrace breakfast hampers, and adult-only peaceful retreats.</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-rose-700 mt-0.5 shrink-0" />
                <div className="text-xs leading-normal">
                  <strong className="text-stone-900 font-semibold block">Unhurried Leisure:</strong>
                  <span className="text-stone-600">Zero frantic tourist checklists. Mornings linger over cappuccinos, afternoons drift on tranquil waters.</span>
                </div>
              </div>
            </div>

            {/* Unboxed Metadata */}
            <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
              <span>Avg $290 - $440/day</span>
              <span aria-hidden="true">·</span>
              <span>2 Partners</span>
              <span aria-hidden="true">·</span>
              <span>Bespoke Luxury Pacing</span>
            </div>

            {/* Action */}
            <button
              onClick={() => onSelectAndPlan('couple')}
              className="mt-5 w-full py-2.5 px-4 text-xs font-semibold text-stone-900 bg-stone-100 hover:bg-stone-200 border border-stone-200 rounded-lg transition-colors text-center"
            >
              Plan Couples Itinerary
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
