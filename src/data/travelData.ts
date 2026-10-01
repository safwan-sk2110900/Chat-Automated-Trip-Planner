import { Destination, TravelerType, TripPace, BudgetTier, PlannedItinerary, ItineraryDay } from '../types/travel';

export const DESTINATIONS: Destination[] = [
  {
    id: 'kyoto-tokyo',
    name: 'Kyoto & Tokyo',
    region: 'Kansai & Kanto',
    country: 'Japan',
    tagline: 'Ancient Shrines, Bullet Trains & Neon Metropolis',
    description: 'A harmonious blend of tranquil cedar temples, culinary alleyways, and hyper-modern urban culture.',
    bestSeason: 'March - May & October - November',
    idealDays: [5, 7, 10, 14],
    baseCostPerDay: {
      family: 380,
      solo: 140,
      couple: 290,
    },
    highlightsByArchetype: {
      family: ['Studio Ghibli Museum & park play', 'Bullet train bento lunch box experience', 'Early morning Arashiyama bamboo stroll', 'Interactive teamLab digital art'],
      solo: ['Solo bar counters in Golden Gai & Omoide Yokocho', 'Zen meditation session at Kennin-ji', 'Boutique capsule & ryokan architecture', 'Quiet Kyoto backstreet photography walks'],
      couple: ['Private machiya townhouse with wooden Hinoki tub', 'Multi-course Kaiseki dinner in Gion', 'Sunset stroll along the Kamo River', 'Couples pottery workshop in Kiyomizu'],
    },
    safetyRating: '9.9/10 (Global Gold Standard)',
    bgGradient: 'from-amber-950/80 via-stone-900/90 to-stone-950',
    accentColor: '#D97706',
  },
  {
    id: 'amalfi-coast',
    name: 'Amalfi Coast & Capri',
    region: 'Campania',
    country: 'Italy',
    tagline: 'Cliffside Terraces, Limoncello Groves & Azure Seas',
    description: 'Sun-drenched Mediterranean cliffs, pastel villages cascading into sapphire waters, and historic coastal paths.',
    bestSeason: 'May - June & September - October',
    idealDays: [3, 5, 7, 10],
    baseCostPerDay: {
      family: 460,
      solo: 190,
      couple: 390,
    },
    highlightsByArchetype: {
      family: ['Private wooden boat excursion to Blue Grotto', 'Hands-on family gelato making in Sorrento', 'Gentle ferry hops between pastel fishing villages', 'Lemon grove walk with fresh honey & lemonade'],
      solo: ['Path of the Gods clifftop hiking trail', 'Ravello cliffside gardens with panoramic reading spots', 'Vespa ride along the coastal corniche', 'Seaside espresso bars with friendly local dialogue'],
      couple: ['Sunset Aperitivo on a private vintage Riva boat', 'Candlelit cliffside dining in Positano', 'Secluded swim cove beneath Faraglioni rocks', 'Fragrance crafting atelier in Capri'],
    },
    safetyRating: '9.4/10 (High Tourism Safety)',
    bgGradient: 'from-sky-950/80 via-stone-900/90 to-stone-950',
    accentColor: '#0284C7',
  },
  {
    id: 'swiss-alps',
    name: 'Swiss Alps & Lucerne',
    region: 'Central Switzerland',
    country: 'Switzerland',
    tagline: 'Glacier Peaks, Cogwheel Railways & Alpine Lakes',
    description: 'Crisp mountain air, pristine alpine reflections, picturesque wooden chalets, and world-class scenic rail transit.',
    bestSeason: 'June - September (Summer) & Dec - March (Snow)',
    idealDays: [5, 7, 10],
    baseCostPerDay: {
      family: 520,
      solo: 210,
      couple: 440,
    },
    highlightsByArchetype: {
      family: ['Mount Pilatus world-steepest cogwheel railway', 'Swiss chocolate factory interactive tasting', 'Gentle flower-lined meadow trails with cowbells', 'Lake Lucerne vintage paddle steamer cruise'],
      solo: ['High alpine hut-to-hut trekking on Eiger Trail', 'Solo paragliding descent over Interlaken', 'Scenic Glacier Express journey with travel journal', 'Quiet alpine hostel fondue gatherings'],
      couple: ['Private cedar hot tub overlooking the Matterhorn', 'Candlelit fondue dinner inside a warm glass igloo', 'Horse-drawn sleigh ride in car-free Zermatt', 'Scenic helicopter flight over Aletsch Glacier'],
    },
    safetyRating: '9.8/10 (Pristine Alpine Security)',
    bgGradient: 'from-emerald-950/80 via-stone-900/90 to-stone-950',
    accentColor: '#059669',
  },
  {
    id: 'bali-ubud',
    name: 'Bali & Nusa Penida',
    region: 'Lesser Sunda',
    country: 'Indonesia',
    tagline: 'Emerald Rice Terraces, Spiritual Sanctuaries & Ocean Cliffs',
    description: 'A sanctuary of lush rainforests, warm ocean swells, ancient Hindu water temples, and vibrant wellness retreats.',
    bestSeason: 'April - October (Dry Season)',
    idealDays: [5, 7, 10, 14],
    baseCostPerDay: {
      family: 260,
      solo: 85,
      couple: 190,
    },
    highlightsByArchetype: {
      family: ['Sacred Monkey Forest sanctuary guided stroll', 'Private pool villa with dedicated family cooking class', 'Sea turtle release sanctuary visit', 'Gentle river rafting through jungle canyons'],
      solo: ['Ubud yoga shala morning sound baths', 'Canggu beachfront co-working & surf lessons', 'Mount Batur sunrise volcano trek with group', 'Boutique scooter exploration of hidden waterfalls'],
      couple: ['Floating breakfast in private jungle infinity pool', 'Couples organic herbal flower bath in Ubud spa', 'Sunset fresh seafood dinner on Jimbaran sands', 'Private speedboat day trip to secluded Diamond Beach'],
    },
    safetyRating: '9.1/10 (Welcoming Island Community)',
    bgGradient: 'from-teal-950/80 via-stone-900/90 to-stone-950',
    accentColor: '#0D9488',
  }
];

export function generateCustomItinerary(
  destinationId: string,
  travelerType: TravelerType,
  durationDays: number,
  pace: TripPace,
  budgetTier: BudgetTier
): PlannedItinerary {
  const destination = DESTINATIONS.find((d) => d.id === destinationId) || DESTINATIONS[0];

  const budgetMultiplier = budgetTier === 'smart' ? 0.75 : budgetTier === 'luxury' ? 1.7 : 1.1;
  const baseDayCost = destination.baseCostPerDay[travelerType];
  const totalCost = Math.round(baseDayCost * durationDays * budgetMultiplier);

  const days: ItineraryDay[] = [];

  for (let i = 1; i <= durationDays; i++) {
    days.push(createDayItinerary(destination, travelerType, i, durationDays, pace));
  }

  const packingList = getPackingList(travelerType, destination);
  const travelTips = getTravelTips(travelerType, destination);

  return {
    id: `itin-${destination.id}-${travelerType}-${durationDays}d`,
    destination,
    travelerType,
    durationDays,
    pace,
    budgetTier,
    days,
    totalEstimatedCostUsd: totalCost,
    currency: 'USD',
    packingChecklist: packingList,
    travelTips,
  };
}

function createDayItinerary(
  dest: Destination,
  type: TravelerType,
  dayNum: number,
  totalDays: number,
  pace: TripPace
): ItineraryDay {
  // Day archetypes
  let theme = '';
  let pacingNote = '';

  if (dayNum === 1) {
    theme = 'Arrival, Local Acclimatization & Evening Neighborhood Stroll';
    pacingNote = type === 'family' 
      ? 'Gentle arrival pacing. Check into hotel, unpack comfortably, and enjoy a stroller-friendly dinner nearby.' 
      : type === 'solo' 
      ? 'Unpack at boutique accommodation, register local eSIM, and discover a welcoming solo-friendly cafe.' 
      : 'Check into romantic suite, unpack, and toast sunset drinks on the terrace before an intimate dinner.';
  } else if (dayNum === totalDays) {
    theme = 'Farewell Vistas, Keepsake Hunting & Signature Dinner';
    pacingNote = type === 'family' 
      ? 'Pack without hurry, souvenir hunting for children, and a celebratory family lunch before departure transit.' 
      : type === 'solo' 
      ? 'Final reflective journal time at a panoramic overlook and postal card dispatch.' 
      : 'Leisurely late checkout, final private viewpoint walk, and celebratory farewell lunch.';
  } else {
    const midThemes = [
      'Heritage Temples & Architectural Wonders',
      'Culinary Discoveries & Hands-On Workshop',
      'Scenic Nature Escapes & Panoramic Ridges',
      'Hidden Neighborhoods & Artisan Markets',
      'Coastal Waters & Sunset Catamaran Cruising',
      'Art Sanctuaries & Cultural Immersion',
    ];
    theme = midThemes[(dayNum - 2) % midThemes.length];
    pacingNote = pace === 'relaxed' 
      ? 'Unhurried schedule with a 2-hour midday rest break and plenty of breathing room.' 
      : pace === 'active' 
      ? 'Dynamic itinerary covering 3 marquee zones with efficient transit links.' 
      : 'Well-balanced rhythm combining morning exploration with leisurely late afternoon free time.';
  }

  const activities = [
    {
      id: `d${dayNum}-act1`,
      timeSlot: 'Morning' as const,
      title: type === 'family' 
        ? `${dest.name} Highlights Walk & Kid-Friendly Exploration` 
        : type === 'solo' 
        ? `Quiet Morning Photography & Hidden Alley Exploration in ${dest.name}` 
        : `Private Morning Stroll & Scenic Coffee Overlook in ${dest.name}`,
      description: type === 'family' 
        ? 'Arrive early before peak crowds. Spacious pedestrian walkways with nearby rest stops and clean family facilities.' 
        : type === 'solo' 
        ? 'Soak in the serene morning light at your own pace with a local espresso or matcha in hand.' 
        : 'Savor an intimate morning walk hand-in-hand through historic courtyards with panoramic scenic backdrops.',
      location: `${dest.name} Historical District`,
      estimatedCostUsd: type === 'family' ? 45 : type === 'solo' ? 18 : 35,
      highlightType: type,
      tips: type === 'family' ? 'Bring a compact stroller and light snacks.' : type === 'solo' ? 'Great time for uninterrupted street photography.' : 'Perfect lighting for romantic couple portraits.',
      tags: ['Culture', 'Scenic', 'Easy Walking'],
    },
    {
      id: `d${dayNum}-act2`,
      timeSlot: 'Afternoon' as const,
      title: type === 'family' 
        ? 'Interactive Craft Workshop & Nature Park Walk' 
        : type === 'solo' 
        ? 'Self-Guided Artisan Route & Remote-Friendly Terrace' 
        : 'Couples Wine/Tea Tasting & Boutique Hideaway',
      description: type === 'family' 
        ? 'Hands-on cultural workshop designed for both young travelers and adults, followed by expansive gardens.' 
        : type === 'solo' 
        ? 'Visit small independent makers, craft ateliers, and chat with local artisans without rush.' 
        : 'Private curated tasting session guided by a master sommelier or culinary historian.',
      location: `${dest.name} Cultural Quarter`,
      estimatedCostUsd: type === 'family' ? 85 : type === 'solo' ? 35 : 95,
      highlightType: type,
      tips: 'Book tickets 24 hours prior via our concierge.',
      tags: ['Culinary', 'Workshop', 'Artisan'],
    },
    {
      id: `d${dayNum}-act3`,
      timeSlot: 'Evening' as const,
      title: type === 'family' 
        ? 'Early Family Dinner at Welcoming Local Trattoria/Bistro' 
        : type === 'solo' 
        ? 'Vibrant Counter Dining & Social Conversation' 
        : 'Candlelit Sunset Dinner with Cliff/Skyline Views',
      description: type === 'family' 
        ? 'Child-welcoming hospitality with flexible menus, quick service, and high chairs available.' 
        : type === 'solo' 
        ? 'Savor exquisite regional dishes at a friendly open-kitchen chef counter where solo diners are celebrated.' 
        : 'Private table reserved along the terrace rail overlooking twilight views with curated wine pairing.',
      location: `${dest.name} Waterfront / Old Town`,
      estimatedCostUsd: type === 'family' ? 95 : type === 'solo' ? 42 : 140,
      highlightType: type,
      tips: type === 'couple' ? 'Dress code: Smart casual, jackets recommended.' : 'Reservations pre-confirmed.',
      tags: ['Gastronomy', 'Evening Vibe'],
    },
  ];

  return {
    dayNumber: dayNum,
    theme,
    activities,
    dailyPacingNote: pacingNote,
    recommendedMeals: [
      {
        type: 'Breakfast',
        suggestion: type === 'family' ? 'Hotel buffet or family bakery with fresh juices' : type === 'solo' ? 'Local artisan coffee bar' : 'Scenic veranda breakfast',
        vibe: 'Energizing start',
      },
      {
        type: 'Lunch',
        suggestion: type === 'family' ? 'Casual noodle/pasta house with quick seating' : type === 'solo' ? 'Street food market stall or bento box' : 'Terrace bistrot with regional specialities',
        vibe: 'Authentic flavors',
      },
      {
        type: 'Dinner',
        suggestion: type === 'family' ? 'Spacious tavern with child menu' : type === 'solo' ? 'Chef counter or cozy izakaya' : 'Fine dining candlelit table',
        vibe: 'Relaxed closure',
      },
    ],
  };
}

function getPackingList(type: TravelerType, dest: Destination): string[] {
  const common = [
    'Universal power adapter & power bank',
    'Comfortable broken-in walking shoes',
    'Lightweight rain jacket & sun protection',
    'Digital copies of passports & travel insurance',
  ];

  if (type === 'family') {
    return [
      ...common,
      'Compact foldable travel stroller',
      'Kid travel first-aid kit (fever meds, band-aids, rehydration)',
      'Noise-reducing headphones for flights',
      'Offline tablet with downloaded audiobooks and games',
      'Reusable snack pouches & spill-proof water bottles',
    ];
  } else if (type === 'solo') {
    return [
      ...common,
      'Anti-theft crossbody sling with RFID protection',
      'High-quality compact journal & sketching pen',
      'Secondary backup debit/credit card in separate pouch',
      'AirTags or SmartTags inside all bags',
      'Compact tripod or magnetic phone mount for solo photos',
    ];
  } else {
    return [
      ...common,
      'Smart casual evening attire & dress shoes for romantic reservations',
      'Portable bluetooth mini-speaker for hotel terrace wine nights',
      'Dual headphone audio splitter or shared airpods for train rides',
      'Instant Polaroid or Leica camera for keepsake snapshots',
    ];
  }
}

function getTravelTips(type: TravelerType, dest: Destination): string[] {
  if (type === 'family') {
    return [
      'Schedule marquee sights between 9:00 AM and 11:30 AM before crowds peak and toddler fatigue sets in.',
      'Always carry small treats or drawing notebooks for train transfers and restaurant waiting times.',
      'Our concierge has pre-mapped public family restrooms and pediatric pharmacies in your route notes.',
    ];
  } else if (type === 'solo') {
    return [
      'Share your live itinerary tracking link with a trusted contact back home.',
      'Sit at the bar or chef counter; it invites effortless conversations with staff and fellow independent travelers.',
      'Keep offline Google Maps or Citymapper regions downloaded for zero-stress navigation without data.',
    ];
  } else {
    return [
      'Notify restaurants at booking that you are celebrating a special couple getaway for prime terrace seating.',
      'Leave at least two free afternoons completely unscheduled for spontaneous wandering and couple downtime.',
      'Order one shared aperitivo board and try contrasting regional wines for tasting together.',
    ];
  }
}
