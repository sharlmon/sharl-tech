<script setup lang="ts">
const whatsappUrl = 'https://wa.me/254707575397?text=Hi%20Sharlmon%2C%20I%27d%20like%20to%20discuss%20a%20project.'
</script>

<template>
  <div class="whatsapp-float">
    <span id="whatsapp-float-label" class="whatsapp-float__label" role="tooltip">
      Let’s talk on WhatsApp
    </span>
    <a
      :href="whatsappUrl"
      class="whatsapp-float__button"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Let’s talk on WhatsApp (opens in a new tab)"
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
.whatsapp-float {
  position: fixed;
  right: max(1rem, env(safe-area-inset-right));
  bottom: max(1rem, env(safe-area-inset-bottom));
  z-index: 40;
  display: flex;
  align-items: center;
  gap: 0.65rem;
}

.whatsapp-float__button {
  position: relative;
  display: grid;
  width: 3.5rem;
  height: 3.5rem;
  flex: 0 0 auto;
  place-items: center;
  border: 1px solid rgba(24, 24, 27, 0.2);
  border-radius: 1rem;
  background: rgba(255, 255, 255, 0.88);
  color: #18181b;
  box-shadow: 0 12px 36px rgba(9, 9, 11, 0.14);
  -webkit-backdrop-filter: blur(18px);
  backdrop-filter: blur(18px);
  transition: transform 180ms ease, border-color 180ms ease, background-color 180ms ease, color 180ms ease, box-shadow 180ms ease;
}

.whatsapp-float__button::after {
  content: '';
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  width: 0.42rem;
  height: 0.42rem;
  border: 2px solid rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  background: #10b981;
}

.whatsapp-float__button svg {
  width: 1.65rem;
  height: 1.65rem;
}

.whatsapp-float__button:hover {
  transform: translateY(-3px);
  border-color: #18181b;
  background: #18181b;
  color: #fff;
  box-shadow: 0 18px 44px rgba(9, 9, 11, 0.22);
}

.whatsapp-float__button:focus-visible {
  outline: 2px solid #18181b;
  outline-offset: 4px;
}

.whatsapp-float__label {
  padding: 0.68rem 0.85rem;
  border: 1px solid rgba(24, 24, 27, 0.16);
  border-radius: 0.75rem;
  background: rgba(255, 255, 255, 0.92);
  color: #18181b;
  box-shadow: 0 10px 30px rgba(9, 9, 11, 0.12);
  font-size: 0.76rem;
  font-weight: 700;
  line-height: 1;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transform: translateX(0.45rem) scale(0.97);
  transform-origin: right center;
  -webkit-backdrop-filter: blur(18px);
  backdrop-filter: blur(18px);
  transition: opacity 160ms ease, transform 160ms ease;
}

.whatsapp-float:hover .whatsapp-float__label,
.whatsapp-float:focus-within .whatsapp-float__label {
  opacity: 1;
  transform: translateX(0) scale(1);
}

:global(.dark .whatsapp-float__button) {
  border-color: rgba(255, 255, 255, 0.2);
  background: rgba(24, 24, 27, 0.9);
  color: #fafafa;
  box-shadow: 0 14px 40px rgba(0, 0, 0, 0.38);
}

:global(.dark .whatsapp-float__button::after) { border-color: #18181b; }

:global(.dark .whatsapp-float__button:hover) {
  border-color: #fafafa;
  background: #fafafa;
  color: #18181b;
}

:global(.dark .whatsapp-float__button:focus-visible) { outline-color: #fafafa; }

:global(.dark .whatsapp-float__label) {
  border-color: rgba(255, 255, 255, 0.16);
  background: rgba(24, 24, 27, 0.94);
  color: #fafafa;
  box-shadow: 0 12px 34px rgba(0, 0, 0, 0.42);
}

@media (max-width: 640px) {
  .whatsapp-float {
    right: max(0.75rem, env(safe-area-inset-right));
    bottom: max(0.75rem, env(safe-area-inset-bottom));
  }

  .whatsapp-float__button {
    width: 3.2rem;
    height: 3.2rem;
    border-radius: 0.9rem;
  }

  .whatsapp-float__button svg {
    width: 1.5rem;
    height: 1.5rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .whatsapp-float__button,
  .whatsapp-float__label {
    transition: none;
  }
}
</style>
