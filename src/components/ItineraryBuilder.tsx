import React, { useState } from 'react';
import { 
  DESTINATIONS, 
  generateCustomItinerary 
} from '../data/travelData';
import { 
  TravelerType, 
  TripPace, 
  BudgetTier, 
  PlannedItinerary 
} from '../types/travel';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  DollarSign, 
  ShieldCheck, 
  Sun, 
  Users, 
  User, 
  Heart, 
  PhoneCall, 
  Bot, 
  Printer, 
  Check, 
  Sparkles, 
  Compass, 
  Utensils 
} from 'lucide-react';

interface ItineraryBuilderProps {
  travelerType: TravelerType;
  onChangeTravelerType: (type: TravelerType) => void;
  onSendToVoiceWidget: (itinerary: PlannedItinerary) => void;
  onSendToTextWidget: (itinerary: PlannedItinerary) => void;
  onOpenPrintModal: (itinerary: PlannedItinerary) => void;
}

export const ItineraryBuilder: React.FC<ItineraryBuilderProps> = ({
  travelerType,
  onChangeTravelerType,
  onSendToVoiceWidget,
  onSendToTextWidget,
  onOpenPrintModal,
}) => {
  const [selectedDestId, setSelectedDestId] = useState<string>('kyoto-tokyo');
  const [durationDays, setDurationDays] = useState<number>(7);
  const [pace, setPace] = useState<TripPace>('balanced');
  const [budgetTier, setBudgetTier] = useState<BudgetTier>('boutique');
  const [activeDayIndex, setActiveDayIndex] = useState<number>(0);
  const [checkedPacking, setCheckedPacking] = useState<Record<string, boolean>>({});

  // Generate itinerary in real-time
  const itinerary = generateCustomItinerary(
    selectedDestId,
    travelerType,
    durationDays,
    pace,
    budgetTier
  );

  const activeDay = itinerary.days[activeDayIndex] || itinerary.days[0];

  const togglePackingItem = (item: string) => {
    setCheckedPacking((prev) => ({
      ...prev,
      [item]: !prev[item],
    }));
  };

  return (
    <section id="custom-planner" className="py-20 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
            Interactive Itinerary Engine
          </span>
          <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-bold tracking-tight text-stone-900 text-balance">
            Customize your journey, then consult your concierge.
          </h2>
          <p className="mt-3 text-stone-600 text-base leading-relaxed">
            Adjust your duration, destination, and tempo. Your generated itinerary can be reviewed in real-time with our interactive voice concierge or coordinated with our travel assistant.
          </p>
        </div>

        {/* Filter Controls Island */}
        <div className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 shadow-sm mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* 1. Traveler Dynamic */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2">
                Traveler Dynamic
              </label>
              <div className="grid grid-cols-3 gap-1.5 p-1 bg-stone-100 rounded-xl">
                <button
                  type="button"
                  onClick={() => onChangeTravelerType('family')}
                  className={`flex flex-col items-center py-2 px-1 rounded-lg text-xs font-medium transition-all ${
                    travelerType === 'family'
                      ? 'bg-white text-stone-900 shadow-sm'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  <Users className="w-3.5 h-3.5 mb-1 text-amber-600" />
                  <span>Family</span>
                </button>
                <button
                  type="button"
                  onClick={() => onChangeTravelerType('solo')}
                  className={`flex flex-col items-center py-2 px-1 rounded-lg text-xs font-medium transition-all ${
                    travelerType === 'solo'
                      ? 'bg-white text-stone-900 shadow-sm'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  <User className="w-3.5 h-3.5 mb-1 text-emerald-600" />
                  <span>Solo</span>
                </button>
                <button
                  type="button"
                  onClick={() => onChangeTravelerType('couple')}
                  className={`flex flex-col items-center py-2 px-1 rounded-lg text-xs font-medium transition-all ${
                    travelerType === 'couple'
                      ? 'bg-white text-stone-900 shadow-sm'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  <Heart className="w-3.5 h-3.5 mb-1 text-rose-600" />
                  <span>Couple</span>
                </button>
              </div>
            </div>

            {/* 2. Destination */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2">
                Destination
              </label>
              <select
                value={selectedDestId}
                onChange={(e) => {
                  setSelectedDestId(e.target.value);
                  setActiveDayIndex(0);
                }}
                className="w-full h-11 px-3 bg-stone-100 hover:bg-stone-200/60 border border-stone-200 rounded-xl text-xs font-medium text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-400 transition-colors"
              >
                {DESTINATIONS.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}, {d.country}
                  </option>
                ))}
              </select>
            </div>

            {/* 3. Duration */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2">
                Duration ({durationDays} Days)
              </label>
              <div className="flex items-center gap-1.5 p-1 bg-stone-100 rounded-xl">
                {[3, 5, 7, 10, 14].map((days) => (
                  <button
                    key={days}
                    type="button"
                    onClick={() => {
                      setDurationDays(days);
                      if (activeDayIndex >= days) setActiveDayIndex(0);
                    }}
                    className={`flex-1 py-2 text-xs font-medium rounded-lg transition-all ${
                      durationDays === days
                        ? 'bg-white text-stone-900 shadow-sm font-semibold'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    {days}d
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Tempo & Budget */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2">
                Pacing & Tier
              </label>
              <div className="flex gap-2">
                <select
                  value={pace}
                  onChange={(e) => setPace(e.target.value as TripPace)}
                  className="w-1/2 h-11 px-2.5 bg-stone-100 border border-stone-200 rounded-xl text-xs font-medium text-stone-800 focus:outline-none focus:ring-2 focus:ring-stone-400"
                >
                  <option value="relaxed">Relaxed Pace</option>
                  <option value="balanced">Balanced Pace</option>
                  <option value="active">Active Pace</option>
                </select>
                <select
                  value={budgetTier}
                  onChange={(e) => setBudgetTier(e.target.value as BudgetTier)}
                  className="w-1/2 h-11 px-2.5 bg-stone-100 border border-stone-200 rounded-xl text-xs font-medium text-stone-800 focus:outline-none focus:ring-2 focus:ring-stone-400"
                >
                  <option value="smart">$ Smart Savvy</option>
                  <option value="boutique">$$ Boutique</option>
                  <option value="luxury">$$$ Ultra Luxury</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Main Itinerary Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column (8 cols): Day-by-Day View */}
          <div className="lg:col-span-8 space-y-6">
            {/* Day Selector Pills Bar (Functional Button Controls) */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {itinerary.days.map((d, idx) => (
                <button
                  key={d.dayNumber}
                  onClick={() => setActiveDayIndex(idx)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 shrink-0 ${
                    activeDayIndex === idx
                      ? 'bg-stone-900 text-white shadow-md'
                      : 'bg-white text-stone-700 hover:bg-stone-200/70 border border-stone-200'
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Day {d.dayNumber}</span>
                </button>
              ))}
            </div>

            {/* Active Day Content Card */}
            <div className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 shadow-sm">
              {/* Day Title & Pacing */}
              <div className="border-b border-stone-200 pb-5 mb-6">
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <span className="text-xs font-mono font-semibold uppercase tracking-wider text-amber-700">
                    Day {activeDay.dayNumber} of {itinerary.durationDays}
                  </span>
                  <div className="text-xs text-stone-500 flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{pace.charAt(0).toUpperCase() + pace.slice(1)} Tempo</span>
                  </div>
                </div>
                <h3 className="font-serif text-2xl font-bold text-stone-900 mt-1">
                  {activeDay.theme}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-stone-600 italic bg-stone-50 p-3 rounded-lg border border-stone-200/60">
                  💡 {activeDay.dailyPacingNote}
                </p>
              </div>

              {/* 3 Activities (Morning / Afternoon / Evening) */}
              <div className="space-y-6">
                {activeDay.activities.map((act) => (
                  <div 
                    key={act.id} 
                    className="p-4 sm:p-5 rounded-xl border border-stone-200/80 bg-stone-50/50 hover:bg-stone-50 transition-colors"
                  >
                    <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded text-[11px] font-semibold uppercase tracking-wider bg-stone-200 text-stone-800">
                          {act.timeSlot}
                        </span>
                        <span className="text-xs text-stone-500 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-stone-400" />
                          {act.location}
                        </span>
                      </div>
                      <span className="font-mono text-xs font-semibold text-stone-700 tabular-nums">
                        ~${act.estimatedCostUsd}
                      </span>
                    </div>

                    <h4 className="text-base font-semibold text-stone-900">
                      {act.title}
                    </h4>
                    <p className="mt-1.5 text-xs sm:text-sm text-stone-600 leading-relaxed">
                      {act.description}
                    </p>

                    {act.tips && (
                      <div className="mt-3 pt-3 border-t border-stone-200/70 text-xs text-stone-500 flex items-center gap-2">
                        <span className="font-medium text-stone-700">Concierge Note:</span>
                        <span>{act.tips}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Recommended Meals of the Day */}
              <div className="mt-8 pt-6 border-t border-stone-200">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-500 flex items-center gap-2 mb-4">
                  <Utensils className="w-3.5 h-3.5 text-amber-700" />
                  <span>Curated Dining Recommendations ({travelerType.toUpperCase()} Focus)</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {activeDay.recommendedMeals.map((meal) => (
                    <div key={meal.type} className="p-3 bg-stone-100/70 rounded-xl border border-stone-200/70 text-xs">
                      <strong className="block text-stone-900 font-semibold mb-1">
                        {meal.type}
                      </strong>
                      <p className="text-stone-600 leading-snug">{meal.suggestion}</p>
                      <span className="block mt-1.5 text-[11px] text-amber-800 font-medium">
                        · {meal.vibe}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (4 cols): Overview & Dual AI Action Triggers */}
          <div className="lg:col-span-4 space-y-6">
            {/* Destination Snapshot Card */}
            <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                  Destination Dossier
                </span>
                <span className="text-xs font-medium text-emerald-700 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  {itinerary.destination.safetyRating}
                </span>
              </div>

              <div>
                <h3 className="font-serif text-2xl font-bold text-stone-900">
                  {itinerary.destination.name}
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  {itinerary.destination.region}, {itinerary.destination.country}
                </p>
                <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                  {itinerary.destination.description}
                </p>
              </div>

              {/* Unboxed Metadata */}
              <div className="pt-3 border-t border-stone-100 space-y-2 text-xs text-stone-600">
                <div className="flex justify-between items-center">
                  <span className="text-stone-500">Best Season:</span>
                  <span className="font-medium text-stone-900">{itinerary.destination.bestSeason}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-stone-500">Duration:</span>
                  <span className="font-medium text-stone-900">{itinerary.durationDays} Days / {itinerary.durationDays - 1} Nights</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-stone-500">Traveler Type:</span>
                  <span className="font-medium text-stone-900 capitalize">{itinerary.travelerType} Expedition</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-dashed border-stone-200">
                  <span className="text-stone-700 font-medium">Estimated Budget:</span>
                  <span className="font-mono text-base font-bold text-stone-900 tabular-nums">
                    ~${itinerary.totalEstimatedCostUsd.toLocaleString()} USD
                  </span>
                </div>
              </div>

              {/* Curated Highlights for this archetype */}
              <div className="pt-3 border-t border-stone-100">
                <h4 className="text-xs font-semibold text-stone-800 uppercase tracking-wider mb-2">
                  Tailored Highlights:
                </h4>
                <ul className="space-y-1.5 text-xs text-stone-600">
                  {itinerary.destination.highlightsByArchetype[travelerType].map((hl, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-amber-600 mt-0.5">✓</span>
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* DUAL AI ACTION DOCK */}
            <div className="bg-stone-900 text-stone-100 rounded-2xl p-6 shadow-md space-y-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <h4 className="text-xs font-semibold tracking-wider uppercase text-stone-200">
                  Connect With Assistants
                </h4>
              </div>
              <p className="text-xs text-stone-300 leading-relaxed">
                Send this customized itinerary straight to our travel concierge to review, audit, or coordinate bookings.
              </p>

              {/* Button 1: Left Voice Concierge */}
              <button
                type="button"
                onClick={() => onSendToVoiceWidget(itinerary)}
                className="w-full flex items-center justify-between p-3.5 rounded-xl bg-stone-800 hover:bg-stone-700/90 border border-stone-700 transition-all text-left group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <PhoneCall className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">
                      Discuss via Voice Concierge
                    </span>
                    <span className="text-[11px] text-stone-400">
                      Real-time audio voice consultation
                    </span>
                  </div>
                </div>
                <span className="text-xs text-emerald-400 font-semibold group-hover:translate-x-0.5 transition-transform">
                  Call →
                </span>
              </button>

              {/* Button 2: Right Text Assistant */}
              <button
                type="button"
                onClick={() => onSendToTextWidget(itinerary)}
                className="w-full flex items-center justify-between p-3.5 rounded-xl bg-stone-800 hover:bg-stone-700/90 border border-stone-700 transition-all text-left group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">
                      Sync to Travel Assistant
                    </span>
                    <span className="text-[11px] text-stone-400">
                      Itinerary injection & automated assistance
                    </span>
                  </div>
                </div>
                <span className="text-xs text-blue-400 font-semibold group-hover:translate-x-0.5 transition-transform">
                  Sync →
                </span>
              </button>

              {/* Button 3: Print / Export */}
              <button
                type="button"
                onClick={() => onOpenPrintModal(itinerary)}
                className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-medium text-stone-300 hover:text-white hover:bg-stone-800 transition-colors"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Export / Print Detailed Itinerary</span>
              </button>
            </div>

            {/* Smart Packing Checklist */}
            <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm">
              <h4 className="text-xs font-semibold text-stone-800 uppercase tracking-wider mb-3">
                {travelerType.toUpperCase()} Essentials Checklist
              </h4>
              <div className="space-y-2">
                {itinerary.packingChecklist.map((item) => {
                  const isChecked = !!checkedPacking[item];
                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => togglePackingItem(item)}
                      className="w-full flex items-start gap-2.5 text-left text-xs p-1.5 rounded-lg hover:bg-stone-100 transition-colors"
                    >
                      <div className={`w-4 h-4 rounded border mt-0.5 flex items-center justify-center transition-colors ${
                        isChecked 
                          ? 'bg-stone-900 border-stone-900 text-white' 
                          : 'border-stone-300 bg-white'
                      }`}>
                        {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <span className={`${isChecked ? 'line-through text-stone-400' : 'text-stone-700'}`}>
                        {item}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
