import React, { useState, useEffect, useRef } from 'react';
import { 
  PhoneCall, 
  PhoneOff, 
  Mic, 
  MicOff, 
  Minimize2, 
  Sparkles, 
  Volume2
} from 'lucide-react';
import { PlannedItinerary, VoiceTranscriptItem } from '../types/travel';
import { triggerAgentCall } from '../utils/voiceAgent';

interface VoiceChatWidgetProps {
  isOpen: boolean;
  onToggle: () => void;
  activeItinerary?: PlannedItinerary | null;
}

export const VoiceChatWidget: React.FC<VoiceChatWidgetProps> = ({
  isOpen,
  onToggle,
  activeItinerary,
}) => {
  // Call States: 'idle' | 'connecting' | 'connected'
  const [callState, setCallState] = useState<'idle' | 'connecting' | 'connected'>('idle');
  const [isMuted, setIsMuted] = useState(false);
  const [callDuration, setCallDuration] = useState(0);

  const [transcripts, setTranscripts] = useState<VoiceTranscriptItem[]>([
    {
      id: 'init-1',
      speaker: 'agent',
      text: "Greetings! I'm your Odyssey Voice Concierge. I'm ready to review your travel dates, pacing, or customize activities for your trip.",
      timestamp: 'Ready',
    },
  ]);

  // Waveform animation
  const [waveHeights, setWaveHeights] = useState<number[]>([20, 45, 75, 30, 60, 85, 40, 65, 25, 55, 70, 35]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const transcriptEndRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll transcript
  useEffect(() => {
    transcriptEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [transcripts]);

  // Timer effect for voice call
  useEffect(() => {
    if (callState === 'connected') {
      timerRef.current = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      setCallDuration(0);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [callState]);

  // Waveform Animation for Voice Mode
  useEffect(() => {
    if (callState !== 'connected') {
      setWaveHeights([15, 20, 15, 20, 15, 20, 15, 20, 15, 20, 15, 20]);
      return;
    }
    const waveInterval = setInterval(() => {
      setWaveHeights((prev) =>
        prev.map(() => Math.floor(Math.random() * (isMuted ? 10 : 80)) + 15)
      );
    }, 120);
    return () => clearInterval(waveInterval);
  }, [callState, isMuted]);

  // Start Call Handler - connects directly to the real agent
  const startCall = () => {
    setCallState('connecting');

    // Trigger the real live voice agent
    const triggered = triggerAgentCall();

    setTimeout(() => {
      setCallState('connected');

      setTranscripts((prev) => [
        ...prev,
        {
          id: `agent-${Date.now()}`,
          speaker: 'agent',
          text: activeItinerary
            ? `Live voice connection active. Reviewing ${activeItinerary.durationDays}-day ${activeItinerary.travelerType} trip to ${activeItinerary.destination.name}. Speak naturally into your microphone.`
            : "Live voice connection active. Speak naturally into your microphone to consult your travel plans.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }, 600);
  };

  const endCall = () => {
    // End real agent call
    triggerAgentCall();
    setCallState('idle');
  };

  const speakMessage = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.05;
      window.speechSynthesis.speak(utterance);
    }
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remaining = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remaining.toString().padStart(2, '0')}`;
  };

  // If collapsed: Sleek bottom-left floating dock button
  if (!isOpen) {
    return (
      <div className="fixed bottom-6 left-24 z-40 hidden lg:block">
        <button
          type="button"
          onClick={onToggle}
          className="group cursor-pointer flex items-center gap-3 px-4 py-3 bg-stone-900 hover:bg-stone-800 text-white rounded-2xl shadow-xl hover:shadow-2xl border border-stone-700/80 transition-all hover:scale-[1.02] active:scale-95"
          aria-label="Open Voice Concierge"
        >
          <div className="relative pointer-events-none">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <PhoneCall className="w-4 h-4 animate-bounce" />
            </div>
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-stone-900" />
          </div>
          <div className="text-left pointer-events-none">
            <span className="text-xs font-bold text-white block">
              Voice Concierge
            </span>
            <span className="text-[11px] text-stone-400 flex items-center gap-1">
              <span>Interactive Audio</span>
              <span className="text-emerald-400">· Ready</span>
            </span>
          </div>
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 left-6 z-50 pointer-events-auto w-96 max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col transition-all">
      {/* Top Bar Header */}
      <div className="bg-stone-900 text-white px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <PhoneCall className="w-3.5 h-3.5" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
              <span>Voice Concierge</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                callState === 'connected'
                  ? 'bg-emerald-500/20 text-emerald-300'
                  : callState === 'connecting'
                  ? 'bg-amber-500/20 text-amber-300'
                  : 'bg-stone-700 text-stone-300'
              }`}>
                {callState === 'connected' ? 'LIVE CALL' : callState === 'connecting' ? 'CONNECTING...' : 'STANDBY'}
              </span>
            </h3>
            <span className="text-[10px] text-stone-400">
              {callState === 'connected'
                ? `In consultation · ${formatTime(callDuration)}`
                : callState === 'connecting'
                ? 'Connecting audio...'
                : 'Verbal itinerary & travel planning'}
            </span>
          </div>
        </div>

        <button
          onClick={onToggle}
          className="p-1.5 text-stone-400 hover:text-white rounded-lg transition-colors cursor-pointer"
          aria-label="Minimize voice widget"
        >
          <Minimize2 className="w-4 h-4" />
        </button>
      </div>

      {/* Production Voice Call Interface */}
      <div className="p-4 flex flex-col space-y-4 max-h-[490px] overflow-y-auto">
        {/* Audio Waveform Stage */}
        <div className="bg-stone-900 rounded-xl p-5 text-center text-white space-y-3.5 shadow-inner">
          <div className="flex items-center justify-between text-xs text-stone-400">
            <span className="flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${callState === 'connected' ? 'bg-emerald-400 animate-ping' : 'bg-stone-500'}`} />
              {callState === 'connected' ? 'Streaming Audio' : 'Concierge Ready'}
            </span>
            <span className="font-mono tabular-nums">
              {callState === 'connected' ? formatTime(callDuration) : '00:00'}
            </span>
          </div>

          {/* Waveform Bars */}
          <div className="h-16 flex items-center justify-center gap-1 px-4">
            {waveHeights.map((h, i) => (
              <div
                key={i}
                style={{ height: `${h}%` }}
                className={`w-1.5 rounded-full transition-all duration-100 ${
                  callState === 'connected'
                    ? 'bg-gradient-to-t from-emerald-500 to-teal-300'
                    : 'bg-stone-700'
                }`}
              />
            ))}
          </div>

          {activeItinerary && (
            <div className="text-[11px] text-stone-300 bg-stone-800/80 py-1.5 px-3 rounded-lg border border-stone-700 truncate">
              Active Context: {activeItinerary.destination.name} ({activeItinerary.travelerType})
            </div>
          )}

          {/* Call Controls */}
          <div className="flex items-center justify-center gap-4 pt-1">
            {callState === 'connected' ? (
              <>
                <button
                  type="button"
                  onClick={() => setIsMuted(!isMuted)}
                  className={`p-3 rounded-full transition-colors cursor-pointer ${
                    isMuted ? 'bg-rose-500 text-white' : 'bg-stone-800 text-stone-200 hover:bg-stone-700'
                  }`}
                  title={isMuted ? 'Unmute microphone' : 'Mute microphone'}
                >
                  {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </button>

                <button
                  type="button"
                  onClick={endCall}
                  className="p-3.5 bg-rose-600 hover:bg-rose-500 text-white rounded-full shadow-lg transition-colors cursor-pointer"
                  title="End voice call"
                >
                  <PhoneOff className="w-5 h-5" />
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={startCall}
                disabled={callState === 'connecting'}
                className="flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-full shadow-lg transition-all hover:scale-105 cursor-pointer"
              >
                <PhoneCall className="w-4 h-4" />
                <span>{callState === 'connecting' ? 'Connecting...' : 'Start Voice Consultation'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Live Conversation Transcript Stream */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[11px] font-semibold text-stone-500 uppercase tracking-wider">
            <span>Live Consultation Stream</span>
            <span className="flex items-center gap-1 text-[10px] text-emerald-600 font-medium">
              <Sparkles className="w-3 h-3" />
              <span>Real-Time</span>
            </span>
          </div>

          <div className="bg-stone-50 border border-stone-200 rounded-xl p-3 h-44 overflow-y-auto space-y-2 text-xs">
            {transcripts.map((t) => (
              <div
                key={t.id}
                className={`p-2.5 rounded-xl ${
                  t.speaker === 'agent'
                    ? 'bg-white border border-stone-200/90 text-stone-900 shadow-xs'
                    : 'bg-emerald-600 text-white ml-6 shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] mb-1">
                  <span className={`font-semibold ${t.speaker === 'agent' ? 'text-emerald-700' : 'text-emerald-100'}`}>
                    {t.speaker === 'agent' ? 'Voice Concierge' : 'You'}
                  </span>
                  <span className={t.speaker === 'agent' ? 'text-stone-400' : 'text-emerald-200'}>
                    {t.timestamp}
                  </span>
                </div>
                <p className="leading-relaxed whitespace-pre-wrap">{t.text}</p>
              </div>
            ))}
            <div ref={transcriptEndRef} />
          </div>
        </div>

        {/* Quick Voice Pacing Tips */}
        <div className="bg-stone-100/70 border border-stone-200 rounded-xl p-2.5 text-[11px] text-stone-600 flex items-center gap-2">
          <Volume2 className="w-4 h-4 text-stone-500 shrink-0" />
          <span>Speak naturally to adjust activity pacing, request toddler nap windows, or book dinner reservations.</span>
        </div>
      </div>
    </div>
  );
};
