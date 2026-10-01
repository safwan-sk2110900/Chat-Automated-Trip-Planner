import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ArchetypeShowcase } from './components/ArchetypeShowcase';
import { ItineraryBuilder } from './components/ItineraryBuilder';
import { FeaturesBreakdown } from './components/FeaturesBreakdown';
import { Testimonials } from './components/Testimonials';
import { Footer } from './components/Footer';
import { VoiceChatWidget } from './components/VoiceChatWidget';
import { TextChatWidget } from './components/TextChatWidget';
import { DualWidgetMobileBar } from './components/DualWidgetMobileBar';
import { ItineraryModal } from './components/ItineraryModal';
import { TravelerType, PlannedItinerary } from './types/travel';
import { generateCustomItinerary } from './data/travelData';
import { triggerAgentCall } from './utils/voiceAgent';

export default function App() {
  const [selectedTravelerType, setSelectedTravelerType] = useState<TravelerType>('family');
  const [activeItinerary, setActiveItinerary] = useState<PlannedItinerary | null>(() =>
    generateCustomItinerary('kyoto-tokyo', 'family', 7, 'balanced', 'boutique')
  );

  // Dual Widget States
  const [isVoiceOpen, setIsVoiceOpen] = useState(false);
  const [isTextOpen, setIsTextOpen] = useState(false);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);

  // Handlers
  const handleScrollToPlanner = () => {
    document.getElementById('custom-planner')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleArchetypeSelect = (type: TravelerType) => {
    setSelectedTravelerType(type);
    if (activeItinerary) {
      setActiveItinerary(
        generateCustomItinerary(
          activeItinerary.destination.id,
          type,
          activeItinerary.durationDays,
          activeItinerary.pace,
          activeItinerary.budgetTier
        )
      );
    }
  };

  const handleOpenVoice = () => {
    triggerAgentCall();
    setIsVoiceOpen(true);
  };

  const handleSendToVoice = (itin: PlannedItinerary) => {
    setActiveItinerary(itin);
    triggerAgentCall();
    setIsVoiceOpen(true);
  };

  const handleSendToText = (itin: PlannedItinerary) => {
    setActiveItinerary(itin);
    setIsTextOpen(true);
  };

  const handleOpenPrintModal = (itin: PlannedItinerary) => {
    setActiveItinerary(itin);
    setIsPrintModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 flex flex-col font-sans selection:bg-amber-100 selection:text-amber-900 pb-16 lg:pb-0">
      {/* Top Navigation */}
      <Navbar
        onOpenVoiceWidget={handleOpenVoice}
        onOpenTextWidget={() => setIsTextOpen(true)}
        onScrollToPlanner={handleScrollToPlanner}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          selectedType={selectedTravelerType}
          onSelectType={handleArchetypeSelect}
          onOpenVoiceWidget={handleOpenVoice}
          onOpenTextWidget={() => setIsTextOpen(true)}
          onScrollToPlanner={handleScrollToPlanner}
        />

        {/* 3 Travel Archetypes Showcase */}
        <ArchetypeShowcase
          onSelectAndPlan={(type) => {
            handleArchetypeSelect(type);
            handleScrollToPlanner();
          }}
        />

        {/* Core Interactive Itinerary Builder */}
        <ItineraryBuilder
          travelerType={selectedTravelerType}
          onChangeTravelerType={handleArchetypeSelect}
          onSendToVoiceWidget={handleSendToVoice}
          onSendToTextWidget={handleSendToText}
          onOpenPrintModal={handleOpenPrintModal}
        />

        {/* Concierge Services Breakdown */}
        <FeaturesBreakdown />

        {/* Verified Traveler Stories */}
        <Testimonials />
      </main>

      {/* Footer */}
      <Footer
        onOpenVoiceWidget={handleOpenVoice}
        onOpenTextWidget={() => setIsTextOpen(true)}
      />

      {/* Left-Side Widget: Voice Concierge */}
      <VoiceChatWidget
        isOpen={isVoiceOpen}
        onToggle={() => {
          if (!isVoiceOpen) {
            handleOpenVoice();
          } else {
            setIsVoiceOpen(false);
          }
        }}
        activeItinerary={activeItinerary}
      />

      {/* Right-Side Widget: Travel Assistant */}
      <TextChatWidget
        isOpen={isTextOpen}
        onToggle={() => setIsTextOpen(!isTextOpen)}
        activeItinerary={activeItinerary}
        selectedTravelerType={selectedTravelerType}
      />

      {/* Mobile Bottom Dock (under 1024px) */}
      <DualWidgetMobileBar
        isVoiceOpen={isVoiceOpen}
        isTextOpen={isTextOpen}
        onToggleVoice={() => {
          if (!isVoiceOpen) {
            handleOpenVoice();
            setIsTextOpen(false);
          } else {
            setIsVoiceOpen(false);
          }
        }}
        onToggleText={() => {
          setIsTextOpen(!isTextOpen);
          if (!isTextOpen) setIsVoiceOpen(false);
        }}
      />

      {/* Export / Printable Dossier Modal */}
      {isPrintModalOpen && (
        <ItineraryModal
          itinerary={activeItinerary}
          onClose={() => setIsPrintModalOpen(false)}
        />
      )}
    </div>
  );
}
