import React from 'react';
import { Compass, PhoneCall, Bot, Shield, Globe } from 'lucide-react';

interface FooterProps {
  onOpenVoiceWidget: () => void;
  onOpenTextWidget: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenVoiceWidget, onOpenTextWidget }) => {
  return (
    <footer className="bg-stone-950 text-stone-400 py-16 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Col 1: Wordmark & Mission */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5 text-white">
              <div className="w-8 h-8 rounded-lg bg-stone-900 border border-stone-800 flex items-center justify-center text-amber-400">
                <Compass className="w-4 h-4" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-white">
                Odyssey
              </span>
            </div>
            <p className="text-xs leading-relaxed text-stone-400">
              Bespoke travel engineering for families, solo explorers, and couples. Integrated with real-time conversational voice intelligence and automated travel assistance.
            </p>
          </div>

          {/* Col 2: Archetypes */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-200">
              Trip Dynamics
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#trip-archetypes" className="hover:text-white transition-colors">
                  The Family Expedition (Kid-Paced)
                </a>
              </li>
              <li>
                <a href="#trip-archetypes" className="hover:text-white transition-colors">
                  The Solo Odysseys (Freedom & Safety)
                </a>
              </li>
              <li>
                <a href="#trip-archetypes" className="hover:text-white transition-colors">
                  The Couple's Escape (Romantic Vistas)
                </a>
              </li>
              <li>
                <a href="#custom-planner" className="hover:text-white transition-colors">
                  Custom Pacing & Budget Calculator
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Concierge Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-200">
              Concierge Services
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={onOpenVoiceWidget}
                  className="flex items-center gap-1.5 hover:text-white transition-colors text-left cursor-pointer"
                >
                  <PhoneCall className="w-3 h-3 text-emerald-400" />
                  <span>Voice Concierge</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenTextWidget}
                  className="flex items-center gap-1.5 hover:text-white transition-colors text-left cursor-pointer"
                >
                  <Bot className="w-3 h-3 text-blue-400" />
                  <span>Travel Assistant Chat</span>
                </button>
              </li>
              <li>
                <a href="#custom-planner" className="hover:text-white transition-colors">
                  Interactive Route Mapping
                </a>
              </li>
              <li>
                <a href="#custom-planner" className="hover:text-white transition-colors">
                  Custom Pacing & Day Logs
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Destinations */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-200">
              Featured Dossiers
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#custom-planner" className="hover:text-white transition-colors">
                  Kyoto & Tokyo, Japan
                </a>
              </li>
              <li>
                <a href="#custom-planner" className="hover:text-white transition-colors">
                  Amalfi Coast & Capri, Italy
                </a>
              </li>
              <li>
                <a href="#custom-planner" className="hover:text-white transition-colors">
                  Swiss Alps & Lucerne, Switzerland
                </a>
              </li>
              <li>
                <a href="#custom-planner" className="hover:text-white transition-colors">
                  Bali & Nusa Penida, Indonesia
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            © {new Date().getFullYear()} Odyssey Travel Technologies. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-stone-400" />
              <span>Global Travel Network</span>
            </span>
            <span aria-hidden="true">·</span>
            <span>Privacy</span>
            <span aria-hidden="true">·</span>
            <span>Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
