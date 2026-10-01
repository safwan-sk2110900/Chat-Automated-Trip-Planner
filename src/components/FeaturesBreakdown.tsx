import React from 'react';
import { PhoneCall, Bot, Workflow, Sparkles, Shield, Cpu, Zap, Compass } from 'lucide-react';

export const FeaturesBreakdown: React.FC = () => {
  return (
    <section id="ai-ecosystem" className="py-20 bg-stone-900 text-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
            Dual AI Architecture
          </span>
          <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white text-balance">
            Two specialized intelligences working in synchronized unison.
          </h2>
          <p className="mt-3 text-stone-400 text-base leading-relaxed">
            Rather than a single bloated generic bot, Odyssey splits responsibilities between conversational voice spontaneity and deterministic workflow automation.
          </p>
        </div>

        {/* 2-Column Asymmetric Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Card 1: Interactive Voice Concierge */}
          <div className="bg-stone-800/80 border border-stone-700/80 rounded-2xl p-7 flex flex-col justify-between hover:border-emerald-500/50 transition-colors">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono uppercase text-emerald-400">
                  Left Dock · Conversational Voice
                </span>
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                  <PhoneCall className="w-4 h-4" />
                </div>
              </div>

              <h3 className="font-serif text-2xl font-bold text-white mb-2">
                Conversational Voice Concierge
              </h3>
              <p className="text-stone-300 text-xs sm:text-sm leading-relaxed mb-6">
                Hands-free audio dialogue for spontaneous travel moments. When walking through a cobblestone alley in Positano or waiting on a Shinkansen platform, speak naturally to review alternative afternoon plans.
              </p>

              <div className="space-y-3 pt-2 border-t border-stone-700/60 text-xs">
                <div className="flex items-start gap-2.5">
                  <Zap className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                  <span className="text-stone-300">
                    <strong className="text-white">Low-Latency Streaming Audio:</strong> Natural interruptions, speech rhythm, and nuanced emotional cadence.
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Compass className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                  <span className="text-stone-300">
                    <strong className="text-white">Contextual Memory:</strong> Automatically loads your active itinerary, budget tier, and traveler dynamic.
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Cpu className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                  <span className="text-stone-300">
                    <strong className="text-white">Real-Time Synthesis:</strong> Instant audio responses calibrated to your travel schedule and pacing needs.
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-stone-700/60 flex items-center justify-between text-xs text-stone-400">
              <span>Interactive Audio</span>
              <span aria-hidden="true">·</span>
              <span>Web Audio API</span>
              <span aria-hidden="true">·</span>
              <span>Ultra-Low Latency</span>
            </div>
          </div>

          {/* Card 2: Automated Travel Concierge */}
          <div className="bg-stone-800/80 border border-stone-700/80 rounded-2xl p-7 flex flex-col justify-between hover:border-blue-500/50 transition-colors">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono uppercase text-blue-400">
                  Right Dock · Workflow Automation
                </span>
                <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
                  <Bot className="w-4 h-4" />
                </div>
              </div>

              <h3 className="font-serif text-2xl font-bold text-white mb-2">
                Automated Travel Concierge
              </h3>
              <p className="text-stone-300 text-xs sm:text-sm leading-relaxed mb-6">
                Structured execution and automated workflows. Seamlessly coordinates restaurant bookings, activity confirmations, and schedule updates tailored to your travel preferences.
              </p>

              <div className="space-y-3 pt-2 border-t border-stone-700/60 text-xs">
                <div className="flex items-start gap-2.5">
                  <Workflow className="w-3.5 h-3.5 text-blue-400 mt-0.5 shrink-0" />
                  <span className="text-stone-300">
                    <strong className="text-white">Connected Workflows:</strong> Syncs reservations and travel alerts directly with your personal calendar and offline notes.
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Sparkles className="w-3.5 h-3.5 text-blue-400 mt-0.5 shrink-0" />
                  <span className="text-stone-300">
                    <strong className="text-white">Smart Recommendations:</strong> Delivers verified hidden gems, walking maps, and child-friendly pacing tips.
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Shield className="w-3.5 h-3.5 text-blue-400 mt-0.5 shrink-0" />
                  <span className="text-stone-300">
                    <strong className="text-white">Continuous Sync:</strong> Real-time HTTP integrations guarantee instantaneous communication with travel services.
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-stone-700/60 flex items-center justify-between text-xs text-stone-400">
              <span>Live Cloud Integration</span>
              <span aria-hidden="true">·</span>
              <span>Encrypted Payloads</span>
              <span aria-hidden="true">·</span>
              <span>Automated Concierge</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
