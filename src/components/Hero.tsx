import React from 'react';
import { Users, User, Heart, Sparkles, ArrowRight, PhoneCall, Bot } from 'lucide-react';
import { TravelerType } from '../types/travel';

interface HeroProps {
  selectedType: TravelerType;
  onSelectType: (type: TravelerType) => void;
  onOpenVoiceWidget: () => void;
  onOpenTextWidget: () => void;
  onScrollToPlanner: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  selectedType,
  onSelectType,
  onOpenVoiceWidget,
  onOpenTextWidget,
  onScrollToPlanner,
}) => {
  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden">
      {/* Subtle architectural ambient background glow */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[1000px] h-[550px] bg-gradient-to-b from-amber-200/25 via-stone-200/20 to-transparent blur-3xl opacity-70 -z-10"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          {/* Natural kicker / sub-headline (unboxed) */}
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-stone-500 uppercase tracking-widest">
            <span>Bespoke Travel Engineering</span>
            <span aria-hidden="true">·</span>
            <span>Kyoto, Amalfi, Swiss Alps & Bali</span>
            <span aria-hidden="true">·</span>
            <span>Real-Time AI Agents</span>
          </div>

          {/* Primary Marquee Display Heading */}
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-stone-900 leading-[1.12] text-balance">
            Bespoke itineraries crafted for families, solo explorers, and couples.
          </h1>

          {/* Concrete Value Proposition */}
          <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-2xl mx-auto">
            Design hour-by-hour journeys calibrated to your exact travel rhythm.
            Consult your trip verbally with our <span className="font-medium text-stone-900 underline decoration-emerald-400 decoration-2 underline-offset-4">interactive voice concierge</span> on the left, 
            or coordinate bookings and updates through our <span className="font-medium text-stone-900 underline decoration-blue-400 decoration-2 underline-offset-4">instant travel assistant</span> on the right.
          </p>

          {/* Archetype Quick Selector - Functional Segmented Control */}
          <div className="pt-4 flex flex-col items-center gap-3">
            <span className="text-xs font-medium text-stone-500">
              Select your travel dynamic to personalize itineraries & travel concierge logic:
            </span>
            <div className="inline-flex p-1.5 bg-stone-200/70 border border-stone-300/80 rounded-xl shadow-inner gap-1.5">
              <button
                type="button"
                onClick={() => onSelectType('family')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedType === 'family'
                    ? 'bg-white text-stone-900 shadow-sm'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100/50'
                }`}
              >
                <Users className="w-3.5 h-3.5 text-amber-600" />
                <span>Family (Kid Pacing & Suites)</span>
              </button>

              <button
                type="button"
                onClick={() => onSelectType('solo')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedType === 'solo'
                    ? 'bg-white text-stone-900 shadow-sm'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100/50'
                }`}
              >
                <User className="w-3.5 h-3.5 text-emerald-600" />
                <span>Solo (Safety & Freedom)</span>
              </button>

              <button
                type="button"
                onClick={() => onSelectType('couple')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedType === 'couple'
                    ? 'bg-white text-stone-900 shadow-sm'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100/50'
                }`}
              >
                <Heart className="w-3.5 h-3.5 text-rose-600" />
                <span>Couples (Romance & Sunset Dining)</span>
              </button>
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onScrollToPlanner}
              className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              <span>Build My Custom Itinerary</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenVoiceWidget}
              className="inline-flex items-center gap-2.5 px-5 py-3.5 text-sm font-semibold text-stone-800 bg-white hover:bg-stone-100/80 border border-stone-300 rounded-xl shadow-sm transition-all cursor-pointer"
            >
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <PhoneCall className="w-4 h-4 text-emerald-600" />
              <span>Voice Consultation</span>
            </button>

            <button
              onClick={onOpenTextWidget}
              className="inline-flex items-center gap-2.5 px-5 py-3.5 text-sm font-semibold text-stone-800 bg-white hover:bg-stone-100/80 border border-stone-300 rounded-xl shadow-sm transition-all cursor-pointer"
            >
              <Bot className="w-4 h-4 text-blue-600" />
              <span>Travel Assistant Chat</span>
            </button>
          </div>

          {/* Value Highlights */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-stone-500">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-600" />
              <span>Interactive Conversational Voice Concierge</span>
            </div>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-600" />
              <span>Instant Automated Booking & Workflow Engine</span>
            </div>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-600" />
              <span>Bespoke Hour-by-Hour Schedules</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
