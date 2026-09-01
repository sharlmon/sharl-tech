<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next'

const route = useRoute()
const mobileMenuOpen = ref(false)

const navigation = [
  { label: 'Services', to: '/services', motion: 'appear--scale', delay: '0.16s' },
  { label: 'Work', to: '/portfolio', motion: 'appear--soft', delay: '0.28s' },
  { label: 'About', to: '/about', motion: 'appear--scale', delay: '0.4s' },
]

function isActive(to: string) {
  if (to === '/portfolio') return route.path.startsWith('/portfolio')
  return route.path === to
}

function closeMenu() {
  mobileMenuOpen.value = false
}

function toggleMenu() {
  mobileMenuOpen.value = !mobileMenuOpen.value
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
      <NuxtLink external to="/" class="brand appear appear--scale" style="--d: 0.08s" aria-label="SharlTech home">
        <span class="brand-mark"><img src="/sharltech-logo.png?v=2" alt="" aria-hidden="true"></span>
        <span>SHARL<span class="brand-muted">TECH</span></span>
      </NuxtLink>

      <div id="site-navigation" class="desktop-navigation">
        <NuxtLink
          v-for="item in navigation"
          :key="item.label"
          external
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
        <UiLiquidButton to="/services" external variant="metal" size="sm" class="header-cta appear appear--scale" style="--d: 0.34s">
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
          <span />
          <span />
          <span />
        </button>
      </div>

      <div class="menu-backdrop" :class="{ 'is-open': mobileMenuOpen }" aria-hidden="true" @click="closeMenu" />

      <div id="mobile-navigation" class="mobile-navigation" :class="{ 'is-open': mobileMenuOpen }">
        <NuxtLink
          v-for="item in navigation"
          :key="`mobile-${item.label}`"
          external
          :to="item.to"
          class="mobile-nav-link"
          :aria-current="isActive(item.to) ? 'page' : undefined"
          @click="closeMenu"
        >
          <span>{{ item.label }}</span>
          <ArrowRight :size="19" aria-hidden="true" />
        </NuxtLink>
        <UiLiquidButton to="/services" external variant="metal" size="lg" class="mobile-project-link" @click="closeMenu">
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
  gap: 0.29rem;
  border: 1px solid rgba(24, 24, 27, 0.16);
  border-radius: 0.55rem;
  background: rgba(255, 255, 255, 0.72);
  transition: border-color 250ms ease, background 250ms ease;
}

.menu-toggle:hover {
  border-color: rgba(24, 24, 27, 0.34);
  background: rgba(244, 244, 245, 0.92);
}

.menu-toggle span {
  display: block;
  width: 1.05rem;
  height: 1.5px;
  border-radius: 1px;
  background: #18181b;
  transition: transform 250ms ease, opacity 200ms ease;
}

:global(body.menu-open) .menu-toggle span:nth-child(1) { transform: translateY(6px) rotate(45deg); }
:global(body.menu-open) .menu-toggle span:nth-child(2) { opacity: 0; }
:global(body.menu-open) .menu-toggle span:nth-child(3) { transform: translateY(-6px) rotate(-45deg); }

.menu-backdrop,
.mobile-navigation {
  display: none;
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
    background: rgba(255, 255, 255, 0.62);
    opacity: 0;
    transition: opacity 280ms ease, visibility 280ms ease;
  }

  .menu-backdrop.is-open {
    visibility: visible;
    opacity: 1;
    -webkit-backdrop-filter: blur(24px);
    backdrop-filter: blur(24px);
  }

  .mobile-navigation {
    position: fixed;
    inset: 0;
    z-index: 20;
    display: flex;
    visibility: hidden;
    flex-direction: column;
    justify-content: center;
    gap: 0.7rem;
    padding: max(6.5rem, calc(env(safe-area-inset-top) + 6rem)) 1.35rem max(2rem, env(safe-area-inset-bottom));
    opacity: 0;
    transform: translateY(14px);
    transition: opacity 280ms ease, transform 280ms cubic-bezier(0.16, 1, 0.3, 1), visibility 280ms ease;
    pointer-events: none;
  }

  .mobile-navigation.is-open {
    visibility: visible;
    opacity: 1;
    transform: translateY(0);
    pointer-events: auto;
  }

  .mobile-nav-link {
    display: flex;
    min-height: 3.8rem;
    align-items: center;
    justify-content: space-between;
    padding: 0 1.15rem;
    border-bottom: 1px solid rgba(24, 24, 27, 0.14);
    color: #18181b;
    font-size: 1.15rem;
    font-weight: 550;
    letter-spacing: -0.035em;
  }

  .mobile-nav-link[aria-current='page'] {
    color: #71717a;
  }

  .mobile-project-link {
    width: 100%;
    margin-top: 0.35rem;
  }
}
</style>
