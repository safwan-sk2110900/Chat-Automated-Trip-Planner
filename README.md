# Odyssey Travel – AI Concierge Automation (n8n + ElevenLabs)

An AI automation project that connects two conversational agents to a travel-planning front end:

- **TripPilot**: a text chatbot backed by a cloud-hosted **n8n** workflow with session memory.
- **Voice Concierge**: a hands-free voice agent powered by an **ElevenLabs Conversational AI** agent.

Both agents run on the **same n8n workflow**. The website connects to ElevenLabs for voice, and the ElevenLabs agent has the same `trippilot/chats` webhook added as a tool. The text chatbot and the voice agent therefore share one backend brain.

The landing page is a lightweight mockup that serves as the host surface for both agents. The focus of this repo is the agent configuration, webhook contract, workflow orchestration, and context passing.

---

## System Overview

```
┌──────────────────────────┐
│  Website (mockup host)   │
└───────┬──────────┬───────┘
        │          │
   Text chat    Voice call
        │          │
        │          ▼
        │   ┌───────────────────────────┐
        │   │ ElevenLabs Voice Agent    │
        │   │ (two-way voice streaming) │
        │   └─────────────┬─────────────┘
        │                 │ Webhook tool
        │                 │ (same endpoint)
        ▼                 ▼
┌──────────────────────────────────────────────┐
│ n8n Cloud Webhook: /webhook/trippilot/chats  │
│  → AI Agent node → Memory (sessionId) → Reply│
└──────────────────────────────────────────────┘
```

**Why one workflow for both agents:** all travel logic, prompts, memory and integrations live in a single place. Updating the n8n workflow improves the chatbot and the voice agent at once, and both give consistent answers.

---

## 1. TripPilot Chatbot – n8n Workflow

### Endpoint

| Item | Value |
|---|---|
| Method | `POST` |
| Production URL | `https://safwankavil24.app.n8n.cloud/webhook/trippilot/chats` |
| Headers | `Content-Type: application/json`, `Accept: application/json` |

The text chat reaches n8n through a local reverse proxy configured in `vite.config.ts`. This avoids CORS errors and iframe-sandbox failures.

### Request Payload

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

| Field | Purpose |
|---|---|
| `message` | The user's raw message |
| `chatInput` | Duplicate of `message`, in the key name n8n's chat/AI Agent nodes expect by default |
| `sessionId` | Generated in the browser and persisted; used as the memory key for multi-turn context |
| `travelerType` | `family`, `solo`, or `couples`; steers tone and recommendations |
| `destination`, `country` | Current trip context from the itinerary builder |
| `durationDays` | Trip length |
| `budgetTier` | `boutique`, `luxury`, or `ultra-luxe` |
| `totalCostUsd` | Live estimated budget |
| `timestamp` | ISO 8601 request time |

### Expected Response

```json
{
  "reply": "Hello! I am TripPilot, your travel assistant for Odyssey Travel. Here are top recommended family-friendly dinner options in Kyoto..."
}
```

The UI reads the `reply` field and renders it in the message feed. If an active itinerary exists, the matching itinerary cards are synchronized into the feed alongside the reply.

### Recommended Workflow Structure (n8n)

| # | Node | Role |
|---|---|---|
| 1 | **Webhook** (POST, path `trippilot/chats`) | Receives the payload; response mode set to "Respond to Webhook" |
| 2 | **Set / Edit Fields** | Maps `chatInput`, `sessionId`, and trip-context fields |
| 3 | **AI Agent** | Uses a system prompt that injects `travelerType`, `destination`, `durationDays`, `budgetTier`, `totalCostUsd` |
| 4 | **Chat Model** | LLM that powers the agent |
| 5 | **Window Buffer Memory** | Session key = `{{ $json.sessionId }}` for multi-turn memory |
| 6 | **Respond to Webhook** | Returns `{ "reply": "{{ $json.output }}" }` |

**Suggested system prompt skeleton:**

```text
You are TripPilot, the travel assistant for Odyssey Travel.
Current trip context:
- Traveler type: {{travelerType}}
- Destination: {{destination}}, {{country}}
- Duration: {{durationDays}} days
- Budget tier: {{budgetTier}} (est. ${{totalCostUsd}})

Tailor every recommendation to this context. Keep answers concise and
friendly, and start the first reply of a session with a short greeting.
```

### Workflow Checklist

- [ ] Workflow is **Active** (production URL only responds when active)
- [ ] Webhook method is `POST` and path is `trippilot/chats`
- [ ] Memory node session key is mapped to `sessionId`
- [ ] Respond to Webhook returns JSON with a `reply` key
- [ ] Test with the sample payload above before connecting the UI

### Quick Test

```bash
curl -X POST "https://safwankavil24.app.n8n.cloud/webhook/trippilot/chats" \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Recommend dinner spots in Kyoto",
    "chatInput": "Recommend dinner spots in Kyoto",
    "sessionId": "test_session_001",
    "travelerType": "family",
    "destination": "Kyoto & Tokyo",
    "country": "Japan",
    "durationDays": 7,
    "budgetTier": "boutique",
    "totalCostUsd": 2400
  }'
```

---

## 2. Voice Concierge – ElevenLabs Conversational AI

### Agent Configuration

| Item | Value |
|---|---|
| Provider | ElevenLabs Conversational AI |
| Embed | Custom element `<elevenlabs-convai>` |
| Mode | Two-way, hands-free voice streaming |
| Backend | n8n workflow, via a webhook tool |

### Connecting the Website to ElevenLabs

The website embeds the ElevenLabs widget, so the voice call runs inside the page.

```html
<elevenlabs-convai agent-id="YOUR_AGENT_ID"></elevenlabs-convai>
<script src="https://unpkg.com/@elevenlabs/convai-widget-embed" async type="text/javascript"></script>
```

### Connecting ElevenLabs to n8n (Webhook Tool)

In the ElevenLabs agent settings, the same TripPilot webhook is added as a **tool**:

| Setting | Value |
|---|---|
| Tool type | Webhook |
| Method | `POST` |
| URL | `https://safwankavil24.app.n8n.cloud/webhook/trippilot/chats` |
| Body | `message` / `chatInput` (what the caller asked), `sessionId`, and trip context fields where available |

When the caller asks something that needs travel knowledge, the voice agent calls this tool. n8n runs the AI Agent, returns `reply`, and the voice agent speaks it. Voice and text therefore use the same prompts, memory and logic.

### Behavior

- Real-time audio waveform visualization
- Call duration timer and session tracking
- Persistent orb widget pinned at the bottom-left
- Triggerable from the Navbar, Hero, Itinerary Builder, Mobile Dock, and Footer via a shared DOM dispatcher in `src/utils/voiceAgent.ts`

### Agent Setup Checklist (ElevenLabs dashboard)

- [ ] System prompt defines the concierge persona, covering the three traveler archetypes (family, solo, couples)
- [ ] First message / greeting is set
- [ ] Voice and language are selected
- [ ] Webhook tool added and pointed at the n8n `trippilot/chats` endpoint
- [ ] Agent prompt tells it when to call the tool (any destination, itinerary, dining, or budget question)
- [ ] Allowed domains include the deployment domain and `localhost`
- [ ] Microphone permission flow tested in the target browsers

---

## 3. Dual-Agent Layout and Interaction

| Agent | Position | z-index |
|---|---|---|
| Voice Concierge (ElevenLabs) | Bottom-left | `99999` |
| TripPilot Chat (n8n) | Bottom-right | `50` |

On viewports under **1024px**, both widgets collapse into a unified bottom dock (`DualWidgetMobileBar.tsx`) with one-tap toggles. This keeps the agents from overlapping.

---

## 4. Agent-Related Code Map

```
├── vite.config.ts                  # Reverse proxy to the n8n webhook
├── index.html                      # ElevenLabs widget embed
├── src/
│   ├── components/
│   │   ├── TextChatWidget.tsx      # TripPilot UI: sessionId, payload build, reply parsing
│   │   ├── VoiceChatWidget.tsx     # Voice consultation UI, waveform, call timer
│   │   └── DualWidgetMobileBar.tsx # Mobile dock for both agents
│   ├── utils/
│   │   └── voiceAgent.ts           # Voice call trigger utilities and DOM dispatcher
│   └── types/
│       └── travel.ts               # Message and payload schema types
```

Supporting files (landing page mockup):

```
src/App.tsx, Navbar.tsx, Hero.tsx, ArchetypeShowcase.tsx,
ItineraryBuilder.tsx, ItineraryModal.tsx, FeaturesBreakdown.tsx,
Testimonials.tsx, Footer.tsx, data/travelData.ts
```

---

## 5. Context Passing: How the Agents Know the Trip

The itinerary builder holds the live trip state. TripPilot reads it on every message:

1. User changes archetype, pacing, accommodation tier, or destination.
2. State updates in `App.tsx`.
3. `TextChatWidget` builds the payload with the latest `travelerType`, `destination`, `durationDays`, `budgetTier`, and `totalCostUsd`.
4. n8n injects those values into the agent prompt, so answers always match the current plan.

The voice agent reaches the same workflow through its webhook tool, so spoken answers use the same prompt and memory logic.

---

## 6. Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| Automation | **n8n Cloud** | Webhook, AI Agent orchestration, session memory |
| Voice | **ElevenLabs Conversational AI** | `<elevenlabs-convai>` widget; calls n8n through a webhook tool |
| Proxy | Vite dev-server proxy | CORS-safe bridge from the text chat to n8n |
| Host app | React 19 + TypeScript + Vite | Landing page mockup that hosts the agents |
| Styling / Icons | Tailwind CSS v4, Lucide React | UI for the host surface |

---

## 7. Getting Started

**Prerequisites:** Node.js v18+ and npm or yarn.

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint     # TypeScript validation
npm run build    # Production bundle
```

**Verify the agents:**

1. Open `http://localhost:3000`.
2. Click the bottom-right chat and send a message. Check the n8n **Executions** tab for the run.
3. Click the bottom-left orb and start a voice call. Ask a travel question and confirm a new run appears in the n8n **Executions** tab (this confirms the webhook tool works).

---

## 8. Troubleshooting

| Symptom | Likely cause |
|---|---|
| Chat returns 404 | n8n workflow is inactive, or the test URL is used instead of the production URL |
| Chat returns a CORS error | Request bypassed the local proxy |
| Reply is empty | Respond to Webhook node is not returning a `reply` key |
| No memory between turns | Memory node session key is not mapped to `sessionId` |
| Voice agent answers but never triggers n8n | Webhook tool missing or its URL is wrong, or the prompt doesn't tell the agent when to call it |
| Voice widget doesn't load | Domain not in the agent's allowlist, or the embed script is blocked |
| Mic not working | Browser permission denied, or the page is not served over HTTPS (localhost is exempt) |
