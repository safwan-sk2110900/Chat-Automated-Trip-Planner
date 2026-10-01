/**
 * Utility to trigger the official voice agent session.
 * Connects directly to the <elevenlabs-convai> element in the DOM.
 */
export function triggerAgentCall(): boolean {
  try {
    const el = document.querySelector('elevenlabs-convai') as HTMLElement & {
      shadowRoot?: ShadowRoot | null;
    };

    if (el) {
      // 1. If shadowRoot has rendered the button, click it directly
      if (el.shadowRoot) {
        const btn = el.shadowRoot.querySelector('button');
        if (btn) {
          btn.click();
          return true;
        }
      }

      // 2. Dispatch custom event if defined
      el.dispatchEvent(
        new CustomEvent('elevenlabs-convai:call', {
          bubbles: true,
          composed: true,
          detail: { config: {} },
        })
      );

      // 3. Fallback click on the element
      el.click();
      return true;
    }
  } catch (err) {
    console.error('[VoiceAgent] Failed to trigger call:', err);
  }
  return false;
}
