<script setup lang="ts">
const whatsappUrl = 'https://wa.me/254707575397?text=Hi%20Sharlmon%2C%20I%27d%20like%20to%20discuss%20a%20project.'
</script>

<template>
  <div class="whatsapp-float">
    <span id="whatsapp-float-label" class="whatsapp-float__label" role="tooltip">
      <span class="whatsapp-float__dot" aria-hidden="true" />
      Chat on WhatsApp
    </span>
    <a
      :href="whatsappUrl"
      class="whatsapp-float__button"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp (opens in a new tab)"
      aria-describedby="whatsapp-float-label"
    >
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path
          fill="currentColor"
          d="M16.05 4.25A11.7 11.7 0 0 0 6.1 22.1L4.5 27.75l5.8-1.52a11.72 11.72 0 1 0 5.75-21.98Zm0 21.35c-1.73 0-3.42-.46-4.9-1.33l-.35-.2-3.44.9.92-3.35-.23-.35a9.65 9.65 0 1 1 8 4.33Zm5.3-7.22c-.29-.15-1.72-.85-1.99-.94-.26-.1-.46-.15-.65.14-.19.3-.75.94-.92 1.13-.17.2-.34.22-.63.08-.29-.15-1.23-.45-2.34-1.45a8.8 8.8 0 0 1-1.62-2.01c-.17-.3-.02-.45.13-.6.13-.13.29-.34.44-.51.14-.17.19-.3.29-.49.1-.2.05-.37-.03-.51-.07-.15-.65-1.57-.9-2.15-.23-.56-.47-.49-.65-.5h-.55c-.19 0-.51.08-.77.37-.27.3-1.02 1-1.02 2.43s1.04 2.82 1.19 3.01c.14.2 2.05 3.13 4.97 4.39.69.3 1.23.48 1.66.61.69.22 1.32.19 1.82.12.55-.08 1.72-.7 1.96-1.38.24-.68.24-1.26.17-1.38-.07-.12-.26-.2-.55-.34Z"
        />
      </svg>
    </a>
  </div>
</template>

<style scoped>
/* WhatsApp green + white glyph, black ring and label, a pulsing halo and a repeating bounce. */
.whatsapp-float {
  position: fixed;
  right: max(1rem, env(safe-area-inset-right));
  bottom: max(1rem, env(safe-area-inset-bottom));
  z-index: 40;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  animation: whatsapp-bounce 2.8s ease-in-out 1s infinite;
}

.whatsapp-float__button {
  position: relative;
  display: grid;
  width: 3.9rem;
  height: 3.9rem;
  flex: 0 0 auto;
  place-items: center;
  border: 3px solid #09090b;
  border-radius: 50%;
  background: #25d366;
  color: #ffffff;
  box-shadow: 0 10px 28px rgba(37, 211, 102, 0.55), 0 3px 0 #09090b;
  transition: transform 180ms ease, background-color 180ms ease, color 180ms ease, border-color 180ms ease;
}

.whatsapp-float__button::before {
  content: '';
  position: absolute;
  inset: -3px;
  z-index: -1;
  border-radius: 50%;
  background: #25d366;
  opacity: 0.55;
  animation: whatsapp-halo 2s ease-out infinite;
}

.whatsapp-float__button svg {
  width: 2.05rem;
  height: 2.05rem;
  filter: drop-shadow(0 1px 0 rgba(0, 0, 0, 0.25));
}

.whatsapp-float__button:hover {
  transform: scale(1.08);
  border-color: #25d366;
  background: #09090b;
  color: #25d366;
}

.whatsapp-float__button:focus-visible {
  outline: 3px solid #ffffff;
  outline-offset: 3px;
  box-shadow: 0 0 0 6px #09090b;
}

.whatsapp-float__label {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.72rem 1rem;
  border: 2px solid #25d366;
  border-radius: 999px;
  background: #09090b;
  color: #ffffff;
  box-shadow: 0 10px 28px rgba(9, 9, 11, 0.35);
  font-size: 0.8rem;
  font-weight: 800;
  line-height: 1;
  white-space: nowrap;
  pointer-events: none;
}

.whatsapp-float__dot {
  width: 0.55rem;
  height: 0.55rem;
  border-radius: 50%;
  background: #25d366;
  animation: whatsapp-dot 1.6s ease-in-out infinite;
}

.whatsapp-float:hover,
.whatsapp-float:focus-within {
  animation-play-state: paused;
}

@keyframes whatsapp-bounce {
  0%, 52%, 100% { transform: translateY(0); }
  10% { transform: translateY(-0.95rem); }
  20% { transform: translateY(0); }
  28% { transform: translateY(-0.5rem); }
  36% { transform: translateY(0); }
  42% { transform: translateY(-0.2rem); }
  48% { transform: translateY(0); }
}

@keyframes whatsapp-halo {
  0% { transform: scale(1); opacity: 0.55; }
  100% { transform: scale(1.75); opacity: 0; }
}

@keyframes whatsapp-dot {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.45; transform: scale(0.7); }
}

/* On dark pages the black ring would vanish, so use white. */
:global(.dark .whatsapp-float__button) {
  border-color: #ffffff;
  box-shadow: 0 10px 28px rgba(37, 211, 102, 0.5), 0 3px 0 #ffffff;
}

:global(.dark .whatsapp-float__button:hover) {
  border-color: #25d366;
  background: #09090b;
  color: #25d366;
}

:global(.dark .whatsapp-float__label) {
  border-color: #25d366;
  background: #09090b;
  color: #ffffff;
  box-shadow: 0 12px 34px rgba(0, 0, 0, 0.55);
}

:global(.dark .whatsapp-float__button:focus-visible) {
  outline-color: #25d366;
  box-shadow: 0 0 0 6px #ffffff;
}

@media (max-width: 640px) {
  .whatsapp-float {
    right: max(0.75rem, env(safe-area-inset-right));
    bottom: max(0.75rem, env(safe-area-inset-bottom));
  }

  /* Keep the screen clear on phones: the label only shows when the button is focused. */
  .whatsapp-float__label {
    display: none;
  }

  .whatsapp-float:focus-within .whatsapp-float__label {
    display: inline-flex;
  }

  .whatsapp-float__button {
    width: 3.6rem;
    height: 3.6rem;
  }

  .whatsapp-float__button svg {
    width: 1.9rem;
    height: 1.9rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .whatsapp-float,
  .whatsapp-float__button,
  .whatsapp-float__button::before,
  .whatsapp-float__dot {
    animation: none;
    transition: none;
  }

  .whatsapp-float__button::before {
    display: none;
  }
}
</style>
