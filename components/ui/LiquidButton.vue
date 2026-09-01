<script setup lang="ts">
type Variant = 'solid' | 'ghost' | 'metal' | 'light'
type Size = 'sm' | 'md' | 'lg'

const props = withDefaults(defineProps<{
  to?: string
  href?: string
  variant?: Variant
  size?: Size
  external?: boolean
}>(), {
  variant: 'solid',
  size: 'md',
  external: false,
})

</script>

<template>
  <NuxtLink
    v-if="to"
    :to="to"
    :external="external"
    class="liquid-button"
    :class="[`liquid-button--${variant}`, `liquid-button--${size}`]"
  >
    <span class="liquid-button__surface" aria-hidden="true" />
    <span class="liquid-button__content"><slot /></span>
  </NuxtLink>
  <a
    v-else-if="href"
    :href="href"
    class="liquid-button"
    :class="[`liquid-button--${variant}`, `liquid-button--${size}`]"
  >
    <span class="liquid-button__surface" aria-hidden="true" />
    <span class="liquid-button__content"><slot /></span>
  </a>
  <button
    v-else
    type="button"
    class="liquid-button"
    :class="[`liquid-button--${variant}`, `liquid-button--${size}`]"
  >
    <span class="liquid-button__surface" aria-hidden="true" />
    <span class="liquid-button__content"><slot /></span>
  </button>
</template>

<style scoped>
.liquid-button {
  position: relative;
  isolation: isolate;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 0.55rem;
  font-weight: 650;
  letter-spacing: -0.025em;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  transform: translateZ(0);
  transition: transform 300ms cubic-bezier(0.16, 1, 0.3, 1), border-color 300ms ease, box-shadow 300ms ease, filter 300ms ease;
}

.liquid-button::after {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 2;
  background: linear-gradient(115deg, transparent 20%, rgba(255, 255, 255, 0.55) 48%, transparent 76%);
  transform: translateX(-135%);
  transition: transform 650ms ease;
  pointer-events: none;
}

.liquid-button:hover {
  transform: translateY(-1px);
}

.liquid-button:hover::after {
  transform: translateX(135%);
}

.liquid-button:active {
  transform: translateY(1px);
}

.liquid-button:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 3px;
}

.liquid-button__surface {
  position: absolute;
  inset: 0;
  z-index: -1;
  border-radius: inherit;
  box-shadow: inset 1px 1px 0 rgba(255, 255, 255, 0.32), inset -1px -1px 0 rgba(0, 0, 0, 0.22);
  pointer-events: none;
}

.liquid-button__content {
  position: relative;
  z-index: 3;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.55rem;
}

.liquid-button--solid {
  border: 1px solid #ffffff;
  background: linear-gradient(180deg, #ffffff 0%, #e9e9e9 48%, #cfcfcf 100%);
  color: #101010;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.95), 0 8px 24px rgba(255, 255, 255, 0.1);
}

.liquid-button--solid:hover {
  border-color: #f2f6ff;
  box-shadow: inset 0 1px 0 #ffffff, 0 0 26px rgba(186, 208, 255, 0.4), 0 10px 22px rgba(255, 255, 255, 0.14);
}

.liquid-button--ghost {
  border: 1px solid rgba(210, 218, 230, 0.52);
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.13), rgba(0, 0, 0, 0.52) 48%, rgba(155, 175, 205, 0.12));
  color: #ffffff;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.16);
  -webkit-backdrop-filter: blur(16px);
  backdrop-filter: blur(16px);
}

.liquid-button--ghost:hover {
  border-color: rgba(225, 235, 255, 0.82);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.24), 0 0 24px rgba(170, 200, 255, 0.28);
}

.liquid-button--metal {
  border: 1px solid rgba(205, 205, 205, 0.58);
  background: linear-gradient(105deg, #050505 0%, #292929 48%, #4a4a4a 100%);
  color: #f4f4f4;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.12), 0 5px 16px rgba(0, 0, 0, 0.24);
}

.liquid-button--metal:hover {
  border-color: rgba(238, 238, 238, 0.92);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.18), 0 7px 18px rgba(0, 0, 0, 0.22);
  filter: brightness(1.06);
}

.liquid-button--light {
  border: 1px solid rgba(24, 24, 27, 0.16);
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.94), rgba(244, 244, 245, 0.76) 50%, rgba(255, 255, 255, 0.88));
  color: #18181b;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.98), 0 8px 24px rgba(24, 24, 27, 0.08);
  -webkit-backdrop-filter: blur(18px) saturate(140%);
  backdrop-filter: blur(18px) saturate(140%);
}

.liquid-button--light:hover {
  border-color: rgba(24, 24, 27, 0.34);
  box-shadow: inset 0 1px 0 #ffffff, 0 0 24px rgba(148, 163, 184, 0.2), 0 12px 28px rgba(24, 24, 27, 0.1);
}

:global(.dark .liquid-button--metal) {
  border-color: rgba(255, 255, 255, 0.72);
  background: linear-gradient(105deg, #ffffff 0%, #e4e4e7 50%, #a1a1aa 100%);
  color: #18181b;
  box-shadow: inset 0 1px 0 #ffffff, 0 5px 18px rgba(0, 0, 0, 0.28);
}

:global(.dark .liquid-button--light) {
  border-color: rgba(255, 255, 255, 0.15);
  background: rgba(39, 39, 42, 0.78);
  color: #fafafa;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08), 0 8px 24px rgba(0, 0, 0, 0.18);
}

.liquid-button--sm { min-height: 2.35rem; padding: 0 1rem; font-size: 0.8rem; }
.liquid-button--md { min-height: 2.75rem; padding: 0 1.2rem; font-size: 0.875rem; }
.liquid-button--lg { min-height: 3rem; padding: 0 1.35rem; font-size: 0.94rem; }

@media (prefers-reduced-motion: reduce) {
  .liquid-button,
  .liquid-button::after {
    transition: none;
  }
}
</style>
