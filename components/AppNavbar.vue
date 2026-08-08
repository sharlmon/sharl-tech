<script setup lang="ts">
import { ArrowRight, Menu, X } from 'lucide-vue-next'

const route = useRoute()
const mobileMenuOpen = ref(false)

const navigation = [
  { label: 'Services', to: '/services' },
  { label: 'About', to: '/about' },
  { label: 'Portfolio', to: '/portfolio' },
]

function isActive(to: string) {
  if (to === '/portfolio') return route.path.startsWith('/portfolio')
  return route.path === to
}

</script>

<template>
  <nav class="fixed top-4 left-0 right-0 z-50 mx-auto max-w-6xl w-[95%] rounded-full bg-white/90 backdrop-blur-md border border-zinc-200 shadow-sm flex items-center justify-between px-6 py-3.5" aria-label="Main navigation">
    <NuxtLink external to="/" class="flex items-center gap-2.5 rounded-full transition-opacity hover:opacity-75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2">
      <img src="/sharltech-logo.png?v=2" alt="SharlTech Icon" class="h-8 w-auto object-contain">
      <span class="text-lg font-extrabold tracking-tight text-zinc-950">SHARLTECH</span>
    </NuxtLink>

    <div class="hidden items-center gap-8 md:flex">
      <NuxtLink
        v-for="item in navigation"
        :key="item.label"
        external
        :to="item.to"
        class="text-sm font-semibold transition-colors"
        :class="isActive(item.to) ? 'text-zinc-950' : 'text-zinc-500 hover:text-zinc-950'"
        :aria-current="isActive(item.to) ? 'page' : undefined"
      >
        {{ item.label }}
      </NuxtLink>
    </div>

    <div class="flex items-center gap-2">
      <NuxtLink external to="/services" class="button-primary hidden min-h-10 px-5 py-2.5 sm:inline-flex">
        Start Project
        <ArrowRight :size="15" />
      </NuxtLink>
      <button
        type="button"
        class="grid h-10 w-10 place-items-center rounded-full border border-zinc-200 text-zinc-950 transition-colors hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 md:hidden"
        :aria-expanded="mobileMenuOpen"
        aria-controls="mobile-navigation"
        aria-label="Toggle menu"
        @click="mobileMenuOpen = !mobileMenuOpen"
      >
        <X v-if="mobileMenuOpen" :size="20" />
        <Menu v-else :size="20" />
      </button>
    </div>

    <div v-if="mobileMenuOpen" id="mobile-navigation" class="absolute left-0 right-0 top-full mt-2 rounded-3xl border border-zinc-200 bg-white px-5 py-4 shadow-sm md:hidden">
      <NuxtLink
        v-for="item in navigation"
        :key="item.label"
        external
        :to="item.to"
        class="block rounded-lg px-3 py-3 text-sm font-semibold text-zinc-700 transition-colors hover:bg-zinc-100 hover:text-zinc-950"
        @click="mobileMenuOpen = false"
      >
        {{ item.label }}
      </NuxtLink>
      <NuxtLink external to="/services" class="button-primary mt-3 w-full sm:hidden" @click="mobileMenuOpen = false">
        Start Project
        <ArrowRight :size="15" />
      </NuxtLink>
    </div>
  </nav>
</template>
