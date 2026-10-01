import React from 'react';
import { Star, Quote, MapPin } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const reviews = [
    {
      name: 'Elena & Marcus Vance',
      travelerGroup: 'Family of 4 (Ages 5 & 8)',
      trip: '10 Days in Kyoto & Tokyo',
      quote: 'Normally planning a trip with two young kids is overwhelming. The pacing recommendation—stopping marquee sightseeing at 11:30 AM before afternoon meltdowns—saved our trip. We spoke directly to the voice concierge on train platforms to swap museum tickets when it rained!',
      date: 'April 2026',
      rating: 5,
    },
    {
      name: 'Julian Thorne',
      travelerGroup: 'Solo Photographer & Nomad',
      trip: '7 Days in Swiss Alps & Lucerne',
      quote: 'Traveling solo can feel like dining with awkward glances. Odyssey routed me to chef counters and alpine huts where independent explorers gather naturally. The automated travel system synced weather alerts directly to my offline notes every morning at 7:00 AM.',
      date: 'August 2026',
      rating: 5,
    },
    {
      name: 'Sofia & Mateo Rossi',
      travelerGroup: 'Couples 5th Anniversary Escape',
      trip: '5 Days along the Amalfi Coast',
      quote: 'The cliffside dinner reservation at sunset was flawless. Every day had a relaxed flow with no rushed schedules. We called the voice agent while sipping espresso in Positano to charter a private wooden Riva boat to Capri. Pure magic.',
      date: 'June 2026',
      rating: 5,
    },
  ];

  return (
    <section id="testimonials" className="py-20 bg-stone-50 border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
            Verified Traveler Experiences
          </span>
          <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-bold tracking-tight text-stone-900 text-balance">
            Real travelers, authentic journeys, zero generic itineraries.
          </h2>
          <p className="mt-3 text-stone-600 text-base leading-relaxed">
            See how our distinct archetypes deliver effortless vacation memories.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((r, i) => (
            <div
              key={i}
              className="bg-white border border-stone-200/90 rounded-2xl p-7 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow"
            >
              <div>
                {/* 5 Stars */}
                <div className="flex items-center gap-1 mb-4 text-amber-500">
                  {[...Array(r.rating)].map((_, s) => (
                    <Star key={s} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>

                <p className="text-stone-700 text-xs sm:text-sm leading-relaxed italic">
                  "{r.quote}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-100">
                <h4 className="font-semibold text-stone-900 text-sm">
                  {r.name}
                </h4>
                <div className="text-xs text-stone-500 mt-0.5">
                  <span>{r.travelerGroup}</span>
                </div>
                <div className="text-[11px] text-amber-800 font-medium flex items-center gap-1 mt-1">
                  <MapPin className="w-3 h-3" />
                  <span>{r.trip}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
