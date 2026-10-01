import React from 'react';
import { PhoneCall, Bot } from 'lucide-react';

interface DualWidgetMobileBarProps {
  isVoiceOpen: boolean;
  isTextOpen: boolean;
  onToggleVoice: () => void;
  onToggleText: () => void;
}

export const DualWidgetMobileBar: React.FC<DualWidgetMobileBarProps> = ({
  isVoiceOpen,
  isTextOpen,
  onToggleVoice,
  onToggleText,
}) => {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-stone-900/95 backdrop-blur-md border-t border-stone-800 px-4 py-2.5 shadow-2xl">
      <div className="max-w-md mx-auto grid grid-cols-2 gap-3">
        {/* Left: Voice Widget Button */}
        <button
          onClick={onToggleVoice}
          className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            isVoiceOpen
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'bg-stone-800 text-stone-200 hover:bg-stone-700'
          }`}
          aria-label="Toggle Voice Concierge"
        >
          <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
          <span className="truncate">Voice Concierge</span>
        </button>

        {/* Right: Text Chatbot Button */}
        <button
          onClick={onToggleText}
          className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            isTextOpen
              ? 'bg-blue-600 text-white shadow-sm'
              : 'bg-stone-800 text-stone-200 hover:bg-stone-700'
          }`}
          aria-label="Toggle Travel Assistant"
        >
          <Bot className="w-3.5 h-3.5 text-blue-400" />
          <span className="truncate">Travel Assistant</span>
        </button>
      </div>
    </div>
  );
};
