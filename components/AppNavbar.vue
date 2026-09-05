<script setup lang="ts">
import { ArrowRight, Menu, X } from 'lucide-vue-next'

const route = useRoute()
const { openProjectModal } = useProjectModal()
const mobileMenuOpen = ref(false)
const isDark = ref(false)

const navigation = [
  { label: 'Services', to: '/services', motion: 'appear--scale', delay: '0.16s' },
  { label: 'Work', to: '/portfolio#projects', motion: 'appear--soft', delay: '0.28s' },
  { label: 'About', to: '/about', motion: 'appear--scale', delay: '0.4s' },
]

function isActive(to: string) {
  const path = to.split('#')[0]
  if (path === '/portfolio') return route.path.startsWith('/portfolio')
  return route.path === path
}

function closeMenu() {
  mobileMenuOpen.value = false
}

function openProjectModalFromMenu() {
  closeMenu()
  nextTick(openProjectModal)
}

function toggleMenu() {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

function toggleTheme() {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark', isDark.value)
  document.documentElement.style.colorScheme = isDark.value ? 'dark' : 'light'
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', isDark.value ? '#09090b' : '#ffffff')
  localStorage.setItem('sharltech-theme', isDark.value ? 'dark' : 'light')
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') closeMenu()
}

function handleResize() {
  if (window.matchMedia('(min-width: 901px)').matches) closeMenu()
}

watch(mobileMenuOpen, (isOpen) => {
  document.body.classList.toggle('menu-open', isOpen)
})

watch(() => route.fullPath, closeMenu)

onMounted(() => {
  isDark.value = document.documentElement.classList.contains('dark')
  window.addEventListener('keydown', handleKeydown)
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  document.body.classList.remove('menu-open')
  window.removeEventListener('keydown', handleKeydown)
  window.removeEventListener('resize', handleResize)
})
</script>

<template>
  <header class="site-header">
    <nav class="navbar-shell" aria-label="Main navigation">
      <NuxtLink to="/" class="brand appear appear--scale" style="--d: 0.08s" aria-label="SharlTech home">
        <span class="brand-mark"><img src="/sharltech-logo.png?v=2" alt="" aria-hidden="true"></span>
        <span>SHARL<span class="brand-muted">TECH</span></span>
      </NuxtLink>

      <div id="site-navigation" class="desktop-navigation">
        <NuxtLink
          v-for="item in navigation"
          :key="item.label"
          :to="item.to"
          class="nav-pill appear"
          :class="[item.motion, { 'is-active': isActive(item.to) }]"
          :style="{ '--d': item.delay }"
          :aria-current="isActive(item.to) ? 'page' : undefined"
        >
          {{ item.label }}
        </NuxtLink>
      </div>

      <div class="header-actions">
        <UiThemeToggle
          :is-dark="isDark"
          class="appear appear--scale"
          style="--d: 0.3s"
          @toggle="toggleTheme"
        />

        <UiLiquidButton
          variant="metal"
          size="sm"
          class="header-cta appear appear--scale"
          style="--d: 0.34s"
          aria-haspopup="dialog"
          aria-controls="project-modal"
          @click="openProjectModal"
        >
          Start project
          <ArrowRight :size="15" aria-hidden="true" />
        </UiLiquidButton>

        <button
          type="button"
          class="menu-toggle appear appear--scale"
          style="--d: 0.34s"
          :aria-expanded="mobileMenuOpen"
          aria-controls="mobile-navigation"
          :aria-label="mobileMenuOpen ? 'Close menu' : 'Open menu'"
          @click="toggleMenu"
        >
          <X v-if="mobileMenuOpen" :size="20" aria-hidden="true" />
          <Menu v-else :size="20" aria-hidden="true" />
        </button>
      </div>

      <div class="menu-backdrop" :class="{ 'is-open': mobileMenuOpen }" aria-hidden="true" @click="closeMenu" />

      <div id="mobile-navigation" class="mobile-navigation" :class="{ 'is-open': mobileMenuOpen }">
        <NuxtLink
          v-for="item in navigation"
          :key="`mobile-${item.label}`"
          :to="item.to"
          class="mobile-nav-link"
          :aria-current="isActive(item.to) ? 'page' : undefined"
          @click="closeMenu"
        >
          <span>{{ item.label }}</span>
          <ArrowRight :size="19" aria-hidden="true" />
        </NuxtLink>
        <UiLiquidButton
          variant="metal"
          size="lg"
          class="mobile-project-link"
          aria-haspopup="dialog"
          aria-controls="project-modal"
          @click="openProjectModalFromMenu"
        >
          Start a Project
          <ArrowRight :size="17" aria-hidden="true" />
        </UiLiquidButton>
      </div>
    </nav>
  </header>
</template>

<style scoped>
.site-header {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 50;
  padding: 1rem 1.1rem 0;
  pointer-events: none;
}

.navbar-shell {
  position: relative;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  width: min(100%, 72rem);
  min-height: 3.65rem;
  margin: 0 auto;
  padding: 0.55rem 0.65rem 0.55rem 1rem;
  border: 1px solid rgba(24, 24, 27, 0.12);
  border-radius: 1rem;
  background: rgba(255, 255, 255, 0.78);
  box-shadow: 0 10px 32px rgba(24, 24, 27, 0.055);
  -webkit-backdrop-filter: blur(20px);
  backdrop-filter: blur(20px);
  pointer-events: auto;
}

.brand {
  position: relative;
  z-index: 30;
  display: inline-flex;
  align-items: center;
  justify-self: start;
  gap: 0.65rem;
  border-radius: 0.5rem;
  color: #18181b;
  font-size: 0.9rem;
  font-weight: 750;
  letter-spacing: -0.045em;
}

.brand:focus-visible,
.nav-pill:focus-visible,
.mobile-nav-link:focus-visible,
.menu-toggle:focus-visible {
  outline: 2px solid #18181b;
  outline-offset: 3px;
}

.brand-mark {
  display: grid;
  width: 2rem;
  height: 1.65rem;
  place-items: center;
  overflow: hidden;
  border-radius: 0.35rem;
  background: #ffffff;
}

.brand-mark img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.brand-muted {
  color: #71717a;
  font-weight: 550;
}

.desktop-navigation {
  display: flex;
  align-items: center;
  justify-self: center;
  gap: 1.4rem;
}

.nav-pill {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.55rem 0.15rem;
  border-radius: 0.25rem;
  color: #71717a;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: -0.02em;
  transition: color 200ms ease;
}

.nav-pill:hover,
.nav-pill.is-active {
  color: #18181b;
}

.header-actions {
  position: relative;
  z-index: 30;
  display: flex;
  align-items: center;
  justify-self: end;
  gap: 0.5rem;
}

.menu-toggle {
  display: none;
  width: 2.75rem;
  height: 2.75rem;
  place-items: center;
  border: 1px solid rgba(24, 24, 27, 0.16);
  border-radius: 0.55rem;
  background: rgba(255, 255, 255, 0.72);
  color: #18181b;
  transition: border-color 250ms ease, background 250ms ease;
}

.menu-toggle:hover {
  border-color: rgba(24, 24, 27, 0.34);
  background: rgba(244, 244, 245, 0.92);
}

.menu-backdrop,
.mobile-navigation {
  display: none;
}

:global(.dark .navbar-shell) {
  border-color: rgba(255, 255, 255, 0.12);
  background: rgba(24, 24, 27, 0.8);
  box-shadow: 0 10px 32px rgba(0, 0, 0, 0.22);
}

:global(.dark .brand),
:global(.dark .nav-pill:hover),
:global(.dark .nav-pill.is-active) {
  color: #fafafa;
}

:global(.dark .brand-mark) {
  background: #ffffff;
}

:global(.dark .brand-muted),
:global(.dark .nav-pill) {
  color: #a1a1aa;
}

:global(.dark .menu-toggle) {
  border-color: rgba(255, 255, 255, 0.14);
  background: rgba(255, 255, 255, 0.06);
  color: #e4e4e7;
}

:global(.dark .menu-toggle:hover) {
  border-color: rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.1);
  color: #ffffff;
}

:global(.dark .brand:focus-visible),
:global(.dark .nav-pill:focus-visible),
:global(.dark .mobile-nav-link:focus-visible),
:global(.dark .menu-toggle:focus-visible) {
  outline-color: #fafafa;
}

@media (min-width: 1280px) {
  .site-header { padding-top: 1.35rem; }
  .navbar-shell { min-height: 3.75rem; }
  .nav-pill { font-size: 0.82rem; }
}

@media (max-width: 900px) {
  .site-header {
    padding: max(0.75rem, env(safe-area-inset-top)) 0.75rem 0;
  }

  .navbar-shell {
    grid-template-columns: 1fr auto;
    min-height: 3.6rem;
    padding: 0.42rem 0.45rem 0.42rem 0.75rem;
  }

  .desktop-navigation { display: none; }
  .menu-toggle { display: grid; }
  .header-cta { display: none; }

  .menu-backdrop {
    position: fixed;
    inset: 0;
    z-index: 10;
    display: block;
    visibility: hidden;
    background: rgba(244, 244, 245, 0.66);
    opacity: 0;
    transition: opacity 280ms ease, visibility 280ms ease;
  }

  :global(.dark .menu-backdrop) {
    background: rgba(9, 9, 11, 0.76);
  }

  .menu-backdrop.is-open {
    visibility: visible;
    opacity: 1;
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
  }

  .mobile-navigation {
    position: fixed;
    top: max(5rem, calc(env(safe-area-inset-top) + 4.65rem));
    right: 0.75rem;
    left: 0.75rem;
    z-index: 20;
    display: flex;
    visibility: hidden;
    max-height: calc(100dvh - 5.75rem - env(safe-area-inset-top));
    overflow-y: auto;
    flex-direction: column;
    justify-content: flex-start;
    gap: 0;
    padding: 0.55rem;
    border: 1px solid rgba(24, 24, 27, 0.12);
    border-radius: 1rem;
    background: rgba(255, 255, 255, 0.94);
    box-shadow: 0 20px 60px rgba(24, 24, 27, 0.14);
    opacity: 0;
    transform: translateY(-8px) scale(0.985);
    transform-origin: top center;
    transition: opacity 220ms ease, transform 260ms cubic-bezier(0.16, 1, 0.3, 1), visibility 220ms ease;
    pointer-events: none;
    -webkit-backdrop-filter: blur(24px) saturate(140%);
    backdrop-filter: blur(24px) saturate(140%);
  }

  .mobile-navigation.is-open {
    visibility: visible;
    opacity: 1;
    transform: translateY(0) scale(1);
    pointer-events: auto;
  }

  :global(.dark .mobile-navigation) {
    border-color: rgba(255, 255, 255, 0.13);
    background: rgba(24, 24, 27, 0.95);
    box-shadow: 0 20px 64px rgba(0, 0, 0, 0.42);
  }

  .mobile-nav-link {
    display: flex;
    min-height: 3.25rem;
    align-items: center;
    justify-content: space-between;
    padding: 0 0.8rem;
    border-bottom: 1px solid rgba(24, 24, 27, 0.14);
    border-radius: 0.55rem;
    color: #18181b;
    font-size: 0.98rem;
    font-weight: 600;
    letter-spacing: -0.035em;
    transition: background-color 180ms ease, color 180ms ease;
  }

  .mobile-nav-link:hover { background: rgba(24, 24, 27, 0.045); }

  :global(.dark .mobile-nav-link) {
    border-color: rgba(255, 255, 255, 0.14);
    color: #fafafa;
  }

  :global(.dark .mobile-nav-link:hover) { background: rgba(255, 255, 255, 0.06); }

  .mobile-nav-link[aria-current='page'] {
    color: #71717a;
  }

  .mobile-project-link {
    width: 100%;
    margin-top: 0.65rem;
  }
}
</style>
