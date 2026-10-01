export type TravelerType = 'family' | 'solo' | 'couple';

export type BudgetTier = 'smart' | 'boutique' | 'luxury';

export type TripPace = 'relaxed' | 'balanced' | 'active';

export interface Activity {
  id: string;
  timeSlot: 'Morning' | 'Afternoon' | 'Evening';
  title: string;
  description: string;
  location: string;
  estimatedCostUsd: number;
  highlightType: 'family' | 'solo' | 'couple' | 'general';
  tips?: string;
  tags?: string[];
}

export interface ItineraryDay {
  dayNumber: number;
  theme: string;
  activities: Activity[];
  dailyPacingNote: string;
  recommendedMeals: {
    type: string;
    suggestion: string;
    vibe: string;
  }[];
}

export interface Destination {
  id: string;
  name: string;
  region: string;
  country: string;
  tagline: string;
  description: string;
  bestSeason: string;
  idealDays: number[];
  baseCostPerDay: {
    family: number;
    solo: number;
    couple: number;
  };
  highlightsByArchetype: {
    family: string[];
    solo: string[];
    couple: string[];
  };
  safetyRating: string;
  bgGradient: string;
  accentColor: string;
}

export interface PlannedItinerary {
  id: string;
  destination: Destination;
  travelerType: TravelerType;
  durationDays: number;
  pace: TripPace;
  budgetTier: BudgetTier;
  days: ItineraryDay[];
  totalEstimatedCostUsd: number;
  currency: string;
  packingChecklist: string[];
  travelTips: string[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  text: string;
  timestamp: string;
  itineraryCard?: {
    destination: string;
    travelerType: TravelerType;
    daysCount: number;
    totalCost: number;
  };
  isFromLiveWebhook?: boolean;
}

export interface VoiceTranscriptItem {
  id: string;
  speaker: 'user' | 'agent';
  text: string;
  timestamp: string;
}

export interface TravelWebhookConfig {
  webhookUrl: string;
  customHeaders: Record<string, string>;
}

export interface VoiceConciergeConfig {
  agentId: string;
  voiceId: string;
  model: string;
}
