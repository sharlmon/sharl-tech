<script setup lang="ts">
import { Menu, X } from 'lucide-vue-next'
import '~/assets/css/chess.css'
import { contact, footerWork, navLinks } from '~/data/site'

const { openProjectModal } = useProjectModal()
const route = useRoute()

useHead({
  link: [
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@500;600;700&family=Space+Grotesk:wght@400;500;600&display=swap' },
  ],
})

const isDark = ref(false)
const menuOpen = ref(false)

function toggleTheme() {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark', isDark.value)
  document.documentElement.style.colorScheme = isDark.value ? 'dark' : 'light'
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', isDark.value ? '#0a0a0a' : '#fafafa')
  try { localStorage.setItem('sharltech-theme', isDark.value ? 'dark' : 'light') } catch (_) { /* private mode */ }
}

onMounted(() => { isDark.value = document.documentElement.classList.contains('dark') })
watch(() => route.fullPath, () => { menuOpen.value = false })
</script>

<template>
  <div class="cx">
    <a href="#main" class="cx-skip">Skip to content</a>

    <header class="cx-nav">
      <div class="cx-nav__bar">
        <NuxtLink to="/chess" class="cx-brand" aria-label="Sharlmon, home">
          <span class="cx-tile">SM</span>
          <span>Sharlmon</span>
        </NuxtLink>
        <nav class="cx-links" aria-label="Main">
          <NuxtLink v-for="link in navLinks" :key="link.to" :to="link.to">{{ link.label }}</NuxtLink>
        </nav>
        <div class="cx-tools">
          <UiThemeToggle :is-dark="isDark" @toggle="toggleTheme" />
          <button type="button" class="cx-btn cx-btn--small" aria-haspopup="dialog" aria-controls="project-modal" @click="openProjectModal">Start a project</button>
          <button type="button" class="cx-burger" :aria-expanded="menuOpen" aria-controls="cx-menu" :aria-label="menuOpen ? 'Close menu' : 'Open menu'" @click="menuOpen = !menuOpen">
            <X v-if="menuOpen" :size="20" aria-hidden="true" />
            <Menu v-else :size="20" aria-hidden="true" />
          </button>
        </div>
      </div>
      <nav id="cx-menu" class="cx-menu" :class="{ 'is-open': menuOpen }" aria-label="Mobile">
        <NuxtLink v-for="link in navLinks" :key="link.to" :to="link.to" :tabindex="menuOpen ? 0 : -1">{{ link.label }}</NuxtLink>
      </nav>
    </header>

    <main id="main">
      <slot />
    </main>

    <footer class="cx-foot">
      <div class="cx-foot__grid">
        <div>
          <NuxtLink to="/chess" class="cx-brand" aria-label="Sharlmon, home">
            <span class="cx-tile">SM</span>
            <span>Sharlmon</span>
          </NuxtLink>
          <p class="cx-foot__about">A software engineer in Nairobi building websites, business systems and automation for organisations in Kenya and beyond.</p>
          <p class="cx-foot__status"><span class="cx-foot__dot" aria-hidden="true" /> Available for work · Westlands, Nairobi</p>
        </div>
        <div>
          <h4>Pages</h4>
          <ul>
            <li v-for="link in navLinks" :key="link.to"><NuxtLink :to="link.to">{{ link.label }}</NuxtLink></li>
          </ul>
        </div>
        <div>
          <h4>Selected work</h4>
          <ul>
            <li v-for="item in footerWork" :key="item.href"><a :href="item.href" target="_blank" rel="noopener noreferrer">{{ item.label }} ↗</a></li>
          </ul>
        </div>
        <div>
          <h4>Get in touch</h4>
          <ul>
            <li><a :href="contact.whatsapp" target="_blank" rel="noopener noreferrer">WhatsApp ↗</a></li>
            <li><a :href="`mailto:${contact.email}`">{{ contact.email }}</a></li>
            <li><a :href="contact.github" target="_blank" rel="noopener noreferrer">GitHub ↗</a></li>
            <li><a :href="contact.linkedin" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a></li>
          </ul>
        </div>
      </div>
      <div class="cx-foot__bottom">
        <p>© {{ new Date().getFullYear() }} Sharlmon · SharlTech. Built in Nairobi.</p>
        <nav aria-label="Footer">
          <NuxtLink to="/portfolio">Classic portfolio</NuxtLink>
          <UiThemeToggle :is-dark="isDark" @toggle="toggleTheme" />
        </nav>
      </div>
    </footer>
  </div>
</template>
