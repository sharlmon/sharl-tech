<script setup lang="ts">
import { Moon, Sun } from 'lucide-vue-next'

defineProps<{
  isDark: boolean
}>()

defineEmits<{
  toggle: []
}>()
</script>

<template>
  <button
    type="button"
    class="theme-toggle"
    :class="{ 'is-dark': isDark }"
    :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
    :title="isDark ? 'Light mode' : 'Dark mode'"
    :aria-pressed="isDark"
    @click="$emit('toggle')"
  >
    <span class="theme-toggle__icon theme-toggle__icon--moon" aria-hidden="true">
      <Moon :size="15" :stroke-width="1.5" />
    </span>
    <span class="theme-toggle__icon theme-toggle__icon--sun" aria-hidden="true">
      <Sun :size="15" :stroke-width="1.5" />
    </span>
    <span class="theme-toggle__thumb" aria-hidden="true">
      <Moon v-if="isDark" :size="15" :stroke-width="1.5" />
      <Sun v-else :size="15" :stroke-width="1.5" />
    </span>
  </button>
</template>

<style scoped>
.theme-toggle {
  position: relative;
  display: inline-flex;
  width: 4rem;
  height: 2rem;
  flex: 0 0 auto;
  align-items: center;
  justify-content: space-between;
  padding: 0.25rem 0.52rem;
  overflow: hidden;
  border: 1px solid #e4e4e7;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.86);
  color: #18181b;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.45), 0 4px 14px rgba(24, 24, 27, 0.06);
  cursor: pointer;
  -webkit-backdrop-filter: blur(12px);
  backdrop-filter: blur(12px);
  transition: border-color 300ms ease, background-color 300ms ease, box-shadow 300ms ease;
}

.theme-toggle.is-dark {
  border-color: #3f3f46;
  background: #09090b;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.04), 0 4px 14px rgba(0, 0, 0, 0.22);
}

.theme-toggle__icon {
  position: relative;
  z-index: 1;
  display: grid;
  width: 1.25rem;
  height: 1.25rem;
  place-items: center;
  transition: color 300ms ease, opacity 300ms ease;
}

.theme-toggle__icon--moon {
  color: #18181b;
  opacity: 0.7;
}

.theme-toggle__icon--sun {
  color: #71717a;
  opacity: 0;
}

.is-dark .theme-toggle__icon--moon {
  color: #fafafa;
  opacity: 0;
}

.is-dark .theme-toggle__icon--sun {
  color: #71717a;
  opacity: 1;
}

.theme-toggle__thumb {
  position: absolute;
  top: 0.2rem;
  left: 0.2rem;
  z-index: 2;
  display: grid;
  width: 1.5rem;
  height: 1.5rem;
  place-items: center;
  border-radius: 50%;
  background: #e4e4e7;
  color: #3f3f46;
  box-shadow: 0 2px 7px rgba(24, 24, 27, 0.16);
  transform: translateX(2rem);
  transition: transform 300ms cubic-bezier(0.2, 0.8, 0.2, 1), background-color 300ms ease, color 300ms ease;
}

.is-dark .theme-toggle__thumb {
  background: #27272a;
  color: #fafafa;
  transform: translateX(0);
}

.theme-toggle:hover {
  border-color: #a1a1aa;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.5), 0 7px 18px rgba(24, 24, 27, 0.1);
}

.theme-toggle.is-dark:hover { border-color: #71717a; }

.theme-toggle:focus-visible {
  outline: 2px solid #18181b;
  outline-offset: 3px;
}

.theme-toggle.is-dark:focus-visible { outline-color: #fafafa; }

@media (prefers-reduced-motion: reduce) {
  .theme-toggle,
  .theme-toggle__icon,
  .theme-toggle__thumb {
    transition: none;
  }
}
</style>
