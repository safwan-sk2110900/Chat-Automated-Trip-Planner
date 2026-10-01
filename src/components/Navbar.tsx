import React, { useState } from 'react';
import { Compass, PhoneCall, MessageSquare, Menu, X } from 'lucide-react';

interface NavbarProps {
  onOpenVoiceWidget: () => void;
  onOpenTextWidget: () => void;
  onScrollToPlanner: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenVoiceWidget,
  onOpenTextWidget,
  onScrollToPlanner,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-stone-50/90 backdrop-blur-md border-b border-stone-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Zone 1: Single text wordmark */}
        <a 
          href="#" 
          className="group flex items-center gap-2.5 text-stone-900 transition-opacity hover:opacity-90"
        >
          <div className="w-8 h-8 rounded-lg bg-stone-900 flex items-center justify-center text-stone-100 shadow-sm">
            <Compass className="w-4 h-4 text-amber-400 group-hover:rotate-45 transition-transform duration-300" />
          </div>
          <span className="font-serif text-2xl font-bold tracking-tight text-stone-900">
            Odyssey
          </span>
        </a>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-600">
          <a href="#trip-archetypes" className="hover:text-stone-900 transition-colors">
            Trip Archetypes
          </a>
          <a href="#custom-planner" className="hover:text-stone-900 transition-colors">
            Custom Planner
          </a>
          <a href="#ai-ecosystem" className="hover:text-stone-900 transition-colors">
            Concierge Services
          </a>
          <a href="#testimonials" className="hover:text-stone-900 transition-colors">
            Traveler Stories
          </a>
        </nav>

        {/* Zone 3: primary actions */}
        <div className="hidden sm:flex items-center gap-2.5">
          <button
            onClick={onOpenVoiceWidget}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200/80 border border-stone-200 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
            title="Open Voice Consultation"
          >
            <PhoneCall className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
            <span>Voice Call</span>
          </button>

          <button
            onClick={onOpenTextWidget}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200/80 border border-stone-200 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
            title="Open Travel Assistant"
          >
            <MessageSquare className="w-3.5 h-3.5 text-blue-600" />
            <span>Travel Assistant</span>
          </button>
          
          <button
            onClick={onScrollToPlanner}
            className="px-3.5 py-2 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-lg shadow-sm transition-colors whitespace-nowrap cursor-pointer"
          >
            Start Planning
          </button>
        </div>

        {/* Mobile menu toggle */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-stone-700 hover:bg-stone-100 rounded-lg transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-stone-200 bg-stone-50 px-4 pt-2 pb-6 space-y-3">
          <a 
            href="#trip-archetypes" 
            onClick={() => setMobileMenuOpen(false)} 
            className="block py-2 text-sm font-medium text-stone-700 hover:text-stone-900"
          >
            Trip Archetypes (Family / Solo / Couple)
          </a>
          <a 
            href="#custom-planner" 
            onClick={() => setMobileMenuOpen(false)} 
            className="block py-2 text-sm font-medium text-stone-700 hover:text-stone-900"
          >
            Custom Itinerary Planner
          </a>
          <a 
            href="#ai-ecosystem" 
            onClick={() => setMobileMenuOpen(false)} 
            className="block py-2 text-sm font-medium text-stone-700 hover:text-stone-900"
          >
            Concierge Services
          </a>
          <a 
            href="#testimonials" 
            onClick={() => setMobileMenuOpen(false)} 
            className="block py-2 text-sm font-medium text-stone-700 hover:text-stone-900"
          >
            Traveler Stories
          </a>
          <div className="pt-3 border-t border-stone-200 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenVoiceWidget();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-stone-800 bg-stone-200/70 rounded-lg cursor-pointer"
            >
              <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />
              <span>Voice Consultation</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTextWidget();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-stone-800 bg-stone-200/70 rounded-lg cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5 text-blue-600" />
              <span>Travel Assistant Chat</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onScrollToPlanner();
              }}
              className="w-full py-2.5 text-xs font-semibold text-white bg-stone-900 rounded-lg"
            >
              Start Planning Itinerary
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
