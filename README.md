# Odyssey Travel Concierge & TripPilot Assistant

A luxury travel planning application that pairs dynamic day-by-day itinerary generation with dual automated assistance: an Interactive Voice Concierge and a TripPilot Travel Assistant backed by live cloud automation workflows.

## 🌟 Key Highlights & Capabilities

### 1. Interactive Itinerary Planning Engine

- **Three Distinct Traveler Archetypes:**
  - **Family Vacation:** Child-friendly attractions, relaxed pacing, spacious suites, and private transport.
  - **Solo Explorer:** Walkable central stays, cultural immersion, off-peak access, and transit-friendly routes.
  - **Couples / Romantic:** Michelin dining, sunset viewpoints, boutique villas, and scenic leisure pacing.
- **Dynamic Day-by-Day Customization:**
  - Live cost breakdowns categorized by Lodging, Dining, Activities, and Transit.
  - Interactive pacing selectors (Relaxed, Balanced, Immersive).
  - Tiered accommodation options (Boutique, Luxury, Ultra-Luxe).
  - Print & PDF-ready itinerary exporting formatted with metadata, timestamps, and day-by-day stops.

### 2. Conversational Voice Concierge

- **Live Hands-Free Audio Consultation:** Embedded voice consultation powered by conversational AI (`agent_8501m3sm7e6cf3avvfk3846asq1r`).
- **Interactive Controls:**
  - Real-time audio waveform visualization.
  - Call duration timer and session tracking.
  - Unobstructed access from the persistent bottom-left orb widget.
  - Coordinated trigger buttons integrated across the Navbar, Hero banner, Itinerary Builder, Mobile Dock, and Footer.

### 3. TripPilot Instant Travel Chatbot

- **Live Automated Webhook Integration:**
  - Permanently bound to the confirmed endpoint: `https://safwankavil24.app.n8n.cloud/webhook/trippilot/chats`
  - Integrated local reverse-proxy (`/api/trippilot-webhook`) ensuring zero cross-origin (CORS) or iframe-sandbox communication failures.
  - Persistent browser session tracking (`sessionId`) supporting multi-turn conversation memory.
- **Context-Aware Payload Architecture:**
  - Transmits user message along with current trip context (destination, duration, traveler archetype, estimated budget).
  - Parses real-time replies from workflow execution outputs.
  - Synchronizes active itinerary cards directly into the message feed upon user prompt.

## 🛠️ Architecture & Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| Framework | React 19 + TypeScript | Component-driven UI architecture and strict typing |
| Build Tool | Vite | Ultra-fast local development server and optimized production bundling |
| Styling | Tailwind CSS v4 | Responsive utility classes, modern typography, and luxury color palettes |
| Icons | Lucide React | Consistent, lightweight vector iconography |
| Voice Interface | Conversational AI Widget Embed | Custom element `<elevenlabs-convai>` with two-way voice streaming |
| Automation | n8n Cloud Webhook Service | Cloud-hosted multi-node orchestration and memory management |

## 📂 Project Structure

```text
├── index.html                    # HTML entry point with metadata & web component embed
├── package.json                  # Application dependencies and execution scripts
├── vite.config.ts                # Vite config & API reverse-proxy routing
├── src/
│   ├── main.tsx                  # React DOM mount point
│   ├── App.tsx                   # Top-level state orchestration & view assembly
│   ├── index.css                 # Global theme definitions & widget layering
│   ├── components/
│   │   ├── Navbar.tsx            # Sticky header with anchor navigation & widget triggers
│   │   ├── Hero.tsx              # Hero showcase with travel archetype switches
│   │   ├── ArchetypeShowcase.tsx # Visual cards detailing the 3 core traveler styles
│   │   ├── ItineraryBuilder.tsx  # Dynamic day-by-day builder, budget & export engine
│   │   ├── FeaturesBreakdown.tsx # Service architecture & value proposition grid
│   │   ├── Testimonials.tsx      # Social proof & traveler ratings
│   │   ├── Footer.tsx            # Footer navigation & agency credentials
│   │   ├── VoiceChatWidget.tsx   # Real-time voice consultation interface
│   │   ├── TextChatWidget.tsx    # Live TripPilot automated chat interface
│   │   ├── DualWidgetMobileBar.tsx # Responsive bottom navigation dock (<1024px)
│   │   └── ItineraryModal.tsx    # Print-optimized export modal
│   ├── data/
│   │   └── travelData.ts         # Itinerary data matrix, budgeting, and day stops
│   ├── types/
│   │   └── travel.ts             # Domain interfaces, message types, and schema models
│   └── utils/
│       └── voiceAgent.ts         # Agent call trigger utilities and DOM dispatcher
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation & Development

1. Install dependencies:

```bash
   npm install
```

2. Start the local development server:

```bash
   npm run dev
```

   The application will boot on `http://localhost:3000`.

3. Validate TypeScript & Build:

```bash
   npm run lint
   npm run build
```

## 🔌 API & Webhook Specifications

### TripPilot Chat Webhook

- **Method:** `POST`
- **Primary Endpoint:** `https://safwankavil24.app.n8n.cloud/webhook/trippilot/chats`
- **Proxy Route:** `/api/trippilot-webhook`
- **Request Headers:**

```http
  Content-Type: application/json
  Accept: application/json
```

- **Payload Schema:**

```json
  {
    "message": "Can you recommend dinner spots in Kyoto?",
    "chatInput": "Can you recommend dinner spots in Kyoto?",
    "sessionId": "session_1727814638000_abc123",
    "travelerType": "family",
    "destination": "Kyoto & Tokyo",
    "country": "Japan",
    "durationDays": 7,
    "budgetTier": "boutique",
    "totalCostUsd": 2400,
    "timestamp": "2026-10-01T20:10:00.000Z"
  }
```

- **Expected Response:**

```json
  {
    "reply": "Hello! I am TripPilot, your travel assistant for Odyssey Travel. Here are top recommended family-friendly dinner options in Kyoto..."
  }
```

## 📱 Responsive & Production Highlights

- **Dual-Widget Non-Interference:** Voice Concierge stays pinned at bottom-left (`z-index: 99999`), while TripPilot Chat stays pinned at bottom-right (`z-index: 50`), ensuring zero visual collision on desktops.
- **Mobile Bottom Navigation Dock:** On viewports under 1024px, floating widgets collapse into a clean, unified bottom bar with instant toggle access.
- **Strict Brand Integrity:** Clean, vendor-neutral luxury travel agency branding with zero exposed configuration inputs or developer consoles.
