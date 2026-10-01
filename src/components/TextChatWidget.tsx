import React, { useState, useEffect, useRef } from 'react';
import { 
  Send, 
  Bot, 
  Minimize2, 
  RefreshCw,
  Compass
} from 'lucide-react';
import { ChatMessage, PlannedItinerary, TravelerType } from '../types/travel';

interface TextChatWidgetProps {
  isOpen: boolean;
  onToggle: () => void;
  activeItinerary?: PlannedItinerary | null;
  selectedTravelerType: TravelerType;
}

// Confirmed live travel webhook endpoint
const CONFIRMED_WEBHOOK_URL = 'https://safwankavil24.app.n8n.cloud/webhook/trippilot/chats';
const PROXY_WEBHOOK_URL = '/api/trippilot-webhook';

export const TextChatWidget: React.FC<TextChatWidgetProps> = ({
  isOpen,
  onToggle,
  activeItinerary,
  selectedTravelerType,
}) => {
  // Persistent session ID required by the webhook workflow
  const [sessionId] = useState<string>(() => {
    try {
      const stored = sessionStorage.getItem('trippilot_session_id');
      if (stored) return stored;
      const created = 'session_' + Date.now() + '_' + Math.random().toString(36).substring(2, 9);
      sessionStorage.setItem('trippilot_session_id', created);
      return created;
    } catch {
      return 'session_' + Date.now();
    }
  });

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'assistant',
      text: `Hello! I'm your Odyssey travel assistant. How can I help you plan your adventure today? You can ask me to look up travel packages, review pacing, or customize your itinerary.`,
      timestamp: 'Ready',
    },
  ]);

  const [inputVal, setInputVal] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Handle active itinerary synchronization
  useEffect(() => {
    if (activeItinerary) {
      setMessages((prev) => {
        if (prev.some((m) => m.itineraryCard?.destination === activeItinerary.destination.name)) {
          return prev;
        }
        return [
          ...prev,
          {
            id: `itin-sync-${Date.now()}`,
            sender: 'system',
            text: `Synced active itinerary: ${activeItinerary.destination.name} (${activeItinerary.durationDays} Days, ${activeItinerary.travelerType})`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            itineraryCard: {
              destination: activeItinerary.destination.name,
              travelerType: activeItinerary.travelerType,
              daysCount: activeItinerary.durationDays,
              totalCost: activeItinerary.totalEstimatedCostUsd,
            },
          },
        ];
      });
    }
  }, [activeItinerary]);

  // Send message via live HTTP POST call to confirmed webhook
  const handleSendMessage = async (textToSend: string) => {
    const trimmed = textToSend.trim();
    if (!trimmed || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: trimmed,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal('');
    setIsLoading(true);

    const payload = {
      message: trimmed,
      chatInput: trimmed,
      sessionId: sessionId,
      travelerType: selectedTravelerType,
      destination: activeItinerary?.destination.name || 'Kyoto & Tokyo',
      country: activeItinerary?.destination.country || 'Japan',
      durationDays: activeItinerary?.durationDays || 7,
      budgetTier: activeItinerary?.budgetTier || 'boutique',
      totalCostUsd: activeItinerary?.totalEstimatedCostUsd || 2400,
      timestamp: new Date().toISOString(),
    };

    let replyReceived = false;

    // Helper to extract reply text from webhook response
    const parseReply = (data: any): string => {
      if (!data) return 'Request acknowledged.';
      if (typeof data.reply === 'string' && data.reply.trim()) return data.reply;
      if (typeof data.output === 'string' && data.output.trim()) return data.output;
      if (typeof data.response === 'string' && data.response.trim()) return data.response;
      if (typeof data.message === 'string' && data.message.trim() && data.message !== 'Error in workflow') return data.message;
      if (typeof data.text === 'string' && data.text.trim()) return data.text;
      if (typeof data === 'string') return data;
      return JSON.stringify(data);
    };

    try {
      // 1. Primary Direct POST call to confirmed URL
      const response = await fetch(CONFIRMED_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json().catch(() => null);
        const replyText = parseReply(data);

        setMessages((prev) => [
          ...prev,
          {
            id: `reply-${Date.now()}`,
            sender: 'assistant',
            text: replyText,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ]);
        replyReceived = true;
      }
    } catch (directError) {
      console.warn('Direct webhook call had network/CORS error, trying proxy fallback...', directError);
    }

    // 2. If direct call failed or had CORS issue in iframe, use the proxy
    if (!replyReceived) {
      try {
        const proxyResponse = await fetch(PROXY_WEBHOOK_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        if (proxyResponse.ok) {
          const data = await proxyResponse.json().catch(() => null);
          const replyText = parseReply(data);

          setMessages((prev) => [
            ...prev,
            {
              id: `reply-${Date.now()}`,
              sender: 'assistant',
              text: replyText,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            },
          ]);
          replyReceived = true;
        } else {
          const errData = await proxyResponse.json().catch(() => null);
          const msg = errData?.message || 'Could not complete request with travel assistant';
          setMessages((prev) => [
            ...prev,
            {
              id: `reply-${Date.now()}`,
              sender: 'assistant',
              text: `Notice: ${msg}. Please try asking again.`,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            },
          ]);
          replyReceived = true;
        }
      } catch (proxyError) {
        console.error('Proxy call error:', proxyError);
      }
    }

    if (!replyReceived) {
      setMessages((prev) => [
        ...prev,
        {
          id: `reply-${Date.now()}`,
          sender: 'assistant',
          text: "I am having trouble reaching the travel assistant service right now. Please verify your connection or try again in a moment.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }

    setIsLoading(false);
  };

  const samplePromptChips = [
    'hello',
    'What trip packages do you offer?',
    'Plan a 5-day family trip to Tokyo',
    'Recommend dinner spots'
  ];

  // Collapsed bottom-right floating trigger button
  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50 pointer-events-auto hidden lg:block">
        <button
          type="button"
          onClick={onToggle}
          className="group cursor-pointer flex items-center gap-3 px-4 py-3 bg-stone-900 hover:bg-stone-800 text-white rounded-2xl shadow-xl hover:shadow-2xl border border-stone-700/80 transition-all hover:scale-[1.02] active:scale-95"
          aria-label="Open Travel Chatbot"
        >
          <div className="relative pointer-events-none">
            <div className="w-9 h-9 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
              <Bot className="w-4 h-4" />
            </div>
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full border-2 border-stone-900" />
          </div>
          <div className="text-left pointer-events-none">
            <span className="text-xs font-bold text-white block">
              Travel Assistant
            </span>
            <span className="text-[11px] text-stone-400 flex items-center gap-1">
              <span>Instant Chat</span>
              <span className="text-blue-400">· Ready</span>
            </span>
          </div>
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 pointer-events-auto w-96 max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col transition-all">
      {/* Top Bar Header */}
      <div className="bg-stone-900 text-white px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center">
            <Bot className="w-3.5 h-3.5" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
              <span>Travel Assistant</span>
              <span className="text-[10px] px-1.5 py-0.2 bg-blue-500/20 text-blue-300 rounded font-mono">
                ACTIVE
              </span>
            </h3>
            <span className="text-[10px] text-stone-400">
              Trip planning & automated concierge
            </span>
          </div>
        </div>

        <button
          onClick={onToggle}
          className="p-1.5 text-stone-400 hover:text-white rounded-lg transition-colors cursor-pointer"
          aria-label="Minimize chatbot"
        >
          <Minimize2 className="w-4 h-4" />
        </button>
      </div>

      {/* Production Chat Interface */}
      <div className="p-3.5 flex flex-col space-y-3">
        {/* Messages Stream */}
        <div className="h-80 overflow-y-auto space-y-2.5 p-1 pr-2">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex flex-col ${
                m.sender === 'user'
                  ? 'items-end'
                  : m.sender === 'system'
                  ? 'items-center my-1'
                  : 'items-start'
              }`}
            >
              {m.sender === 'system' ? (
                <div className="bg-stone-100 border border-stone-200 rounded-lg px-3 py-1 text-[11px] text-stone-600 flex items-center gap-1.5 shadow-2xs">
                  <Compass className="w-3 h-3 text-stone-500" />
                  <span>{m.text}</span>
                </div>
              ) : (
                <div
                  className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed shadow-2xs ${
                    m.sender === 'user'
                      ? 'bg-stone-900 text-white rounded-br-xs'
                      : 'bg-stone-100 border border-stone-200/80 text-stone-900 rounded-bl-xs'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{m.text}</p>
                  <div
                    className={`mt-1 text-[10px] text-right ${
                      m.sender === 'user' ? 'text-stone-400' : 'text-stone-400'
                    }`}
                  >
                    {m.timestamp}
                  </div>
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-2 text-xs text-stone-500 bg-stone-50 p-2.5 rounded-xl border border-stone-200/60 max-w-[80%]">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-blue-600" />
              <span>Contacting travel assistant...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {samplePromptChips.map((chip, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleSendMessage(chip)}
              className="text-[10px] bg-stone-100 hover:bg-stone-200 text-stone-700 px-2.5 py-1 rounded-full border border-stone-200 transition-colors cursor-pointer"
            >
              "{chip}"
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage(inputVal);
          }}
          className="flex items-center gap-1.5 pt-1 border-t border-stone-100"
        >
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder={`Ask travel assistant (${selectedTravelerType})...`}
            className="flex-1 px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={!inputVal.trim() || isLoading}
            className="p-2 bg-stone-900 hover:bg-stone-800 disabled:opacity-50 text-white rounded-xl transition-colors cursor-pointer"
            title="Send Message"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
