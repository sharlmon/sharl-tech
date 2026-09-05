<script setup lang="ts">
import {
  ArrowRight,
  Bot,
  BookOpen,
  Building2,
  Clapperboard,
  CloudCog,
  Code2,
  ExternalLink,
  Film,
  Home,
  LayoutDashboard,
  Layers3,
  MapPin,
  MessageSquareMore,
  Palette,
  Rocket,
  ServerCog,
  ShoppingBag,
  TreePalm,
} from 'lucide-vue-next'

definePageMeta({
  alias: ['/portfolio/projects', '/portfolio/stack'],
})

const route = useRoute()
const { openProjectModal } = useProjectModal()
const siteUrl = 'https://sharl-tech.co.ke'
const canonicalUrl = `${siteUrl}/portfolio`
const socialImage = `${siteUrl}/portfolio-og-white.png`
const description = 'Explore Sharlmon’s engineering background, technology stack and selected software, commercial websites and digital identity work built in Nairobi.'

useSeoMeta({
  title: 'Sharlmon | Full-Stack Engineer & AI Systems Builder at SharlTech',
  description,
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  ogTitle: 'Sharlmon | Full-Stack Engineer & AI Systems Builder',
  ogDescription: description,
  ogType: 'profile',
  ogUrl: canonicalUrl,
  ogSiteName: 'SharlTech',
  ogLocale: 'en_KE',
  ogImage: socialImage,
  ogImageWidth: 1731,
  ogImageHeight: 909,
  ogImageAlt: 'Sharlmon, Full-Stack Engineer and AI Systems Builder at SharlTech',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Sharlmon | Full-Stack Engineer & AI Systems Builder',
  twitterDescription: description,
  twitterImage: socialImage,
  twitterImageAlt: 'Sharlmon, Full-Stack Engineer and AI Systems Builder at SharlTech',
})

useHead({
  link: [{ rel: 'canonical', href: canonicalUrl }],
  script: [
    {
      key: 'sharlmon-profile-structured-data',
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'ProfilePage',
        '@id': `${canonicalUrl}#profilepage`,
        url: canonicalUrl,
        name: 'Sharlmon | Full-Stack Engineer & AI Systems Builder at SharlTech',
        description,
        isPartOf: { '@id': `${siteUrl}/#website` },
        inLanguage: 'en-KE',
        mainEntity: {
          '@type': 'Person',
          '@id': `${canonicalUrl}#sharlmon`,
          name: 'Sharlmon',
          jobTitle: 'Full-Stack Software Engineer and AI Systems Builder',
          description: 'Founder of SharlTech, building scalable SaaS products, multi-agent AI systems and resilient digital infrastructure in Nairobi.',
          worksFor: {
            '@type': 'Organization',
            '@id': `${siteUrl}/#organization`,
            name: 'SharlTech',
            url: `${siteUrl}/`,
          },
          homeLocation: {
            '@type': 'Place',
            name: 'Westlands, Nairobi, Kenya',
          },
          sameAs: ['https://www.linkedin.com/in/sharlmon-junior-701746281'],
          knowsAbout: ['Full-stack software engineering', 'SaaS architecture', 'Artificial intelligence systems', 'Cloud infrastructure', 'E-commerce platforms'],
        },
      }),
    },
  ],
})

const stackGroups = [
  {
    label: 'Frontend',
    icon: Code2,
    tools: ['React', 'Next.js', 'Vue 3', 'Nuxt 3', 'TypeScript', 'JavaScript', 'Tailwind CSS'],
  },
  {
    label: 'Backend & data',
    icon: ServerCog,
    tools: ['Node.js', 'REST APIs', 'Prisma ORM', 'Supabase', 'PocketBase', 'PostgreSQL'],
  },
  {
    label: 'AI & automation',
    icon: Bot,
    tools: ['AI/LLM integration', 'Multi-agent workflows', 'n8n', 'Webhooks', 'API-driven automation'],
  },
  {
    label: 'Infrastructure',
    icon: CloudCog,
    tools: ['Git', 'GitHub Actions', 'Docker', 'Linux', 'Nginx', 'Plesk VPS', 'Vercel', 'GitHub Pages'],
  },
  {
    label: 'Architecture',
    icon: Layers3,
    tools: ['Multi-tenant SaaS', 'RBAC', 'Payment integrations', 'Service workers', 'Responsive web systems'],
  },
]

const projects = [
  {
    number: '01',
    name: 'Kazi Smart',
    type: 'AI hiring ecosystem',
    icon: Bot,
    description: 'Multi-agent job matching with role-based access and integrated transcription.',
    tags: ['Next.js', 'Supabase', 'RBAC'],
    url: null,
  },
  {
    number: '02',
    name: 'Hodari Stores',
    type: 'Multi-tenant commerce',
    icon: ShoppingBag,
    description: 'Headless multi-tenant commerce with M-Pesa and custom retail workflows.',
    tags: ['MedusaJS', 'M-Pesa', 'Multi-tenant'],
    url: null,
  },
  {
    number: '03',
    name: 'Propflow & FindYourKeja',
    type: 'Dual real estate suite',
    icon: Home,
    description: 'Landlord operations and rental discovery split across focused services.',
    tags: ['Microservices', 'B2B SaaS', 'Marketplace'],
    url: null,
  },
  {
    number: '04',
    name: 'Chat2Post AI',
    type: 'Media automation',
    icon: MessageSquareMore,
    description: 'Routes incoming video from messaging webhooks to storage and publishing APIs.',
    tags: ['Webhooks', 'Cloud storage', 'Publishing APIs'],
    url: null,
  },
  {
    number: '05',
    name: 'Rebound',
    type: 'Offline-first PWA',
    icon: Rocket,
    description: 'Offline-first habit tracking powered by custom service workers.',
    tags: ['PWA', 'Service workers', 'Offline-first'],
    url: 'https://reboundnow-today.vercel.app',
  },
  {
    number: '06',
    name: 'Mic-Jasiri Productions',
    type: 'Production house website',
    icon: Film,
    description: 'A cinematic company website presenting film, documentary, commercial and live-event work.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    url: 'https://sharlmon.github.io/micjasiri-website/',
  },
  {
    number: '07',
    name: 'Jitume Logo Competition',
    type: 'Brand identity concept',
    icon: Palette,
    description: 'A visual identity proposal for the national Technopolis logo competition run through Jitume.',
    tags: ['Logo design', 'Identity system', 'Competition entry'],
    url: null,
  },
  {
    number: '08',
    name: 'The Terrace Kilifi',
    type: 'Arts & residency website',
    icon: TreePalm,
    description: 'A warm, image-led website for an independent artist residency on Kilifi Creek.',
    tags: ['TypeScript', 'Responsive UI', 'Vercel'],
    url: 'https://terracekilifiweb.vercel.app/',
  },
  {
    number: '09',
    name: 'Afrofilms',
    type: 'Film platform',
    icon: Clapperboard,
    description: 'A focused entertainment experience for discovering African film and media.',
    tags: ['JavaScript', 'Responsive UI', 'GitHub Pages'],
    url: 'https://sharlmon.github.io/afrofilms/',
  },
  {
    number: '10',
    name: 'Wordly',
    type: 'Dictionary web app',
    icon: BookOpen,
    description: 'Word search, definitions, audio pronunciation and saved favourites in one responsive app.',
    tags: ['JavaScript', 'Dictionary API', 'Local storage'],
    url: 'https://sharlmon.github.io/WORDLY/',
  },
  {
    number: '11',
    name: 'Catalogue Admin',
    type: 'Product administration',
    icon: LayoutDashboard,
    description: 'A React workspace for searching, adding, repricing and removing catalogue products.',
    tags: ['React', 'Vite', 'JSON Server'],
    url: 'https://sharlmon.github.io/reactSPA/',
  },
  {
    number: '12',
    name: 'Irish Trading Enterprises',
    type: 'Construction company website',
    icon: Building2,
    description: 'A multi-page corporate website for civil engineering and construction services in Kenya.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    url: 'https://sharlmon.github.io/IrishTradingSite/',
  },
]

function scrollToPortfolioSection(path: string, hash: string) {
  const sectionId = hash === '#projects' || hash === '#stack'
    ? hash.slice(1)
    : path === '/portfolio/projects'
      ? 'projects'
      : path === '/portfolio/stack'
        ? 'stack'
        : null

  nextTick(() => {
    if (sectionId) document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    else window.scrollTo({ top: 0, behavior: 'smooth' })
  })
}

onMounted(() => scrollToPortfolioSection(route.path, route.hash))
watch(() => route.fullPath, () => scrollToPortfolioSection(route.path, route.hash))
</script>

<template>
  <div class="min-h-screen overflow-x-hidden text-zinc-950 dark:text-zinc-50">
    <AppNavbar />

    <main class="relative z-10 pt-8 sm:pt-12">
      <section class="mx-auto flex min-h-[calc(100vh-8rem)] max-w-7xl flex-col items-center justify-center px-5 py-20 text-center sm:px-8 lg:px-10">
        <div class="inline-flex animate-fade-in-up items-center gap-2 rounded-full border border-zinc-200 bg-white px-3.5 py-2">
          <span class="grid h-8 w-8 place-items-center rounded-full bg-zinc-950 text-[10px] font-extrabold text-white">SM</span>
          <span class="pr-1 text-left"><span class="block text-xs font-extrabold text-zinc-950">Sharlmon</span><span class="mt-0.5 flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-zinc-500"><MapPin :size="10" /> Westlands, Nairobi</span></span>
        </div>

        <h1 class="mt-9 max-w-6xl animate-fade-in-up text-balance text-5xl font-extrabold leading-[0.95] tracking-tighter text-zinc-950 [animation-delay:100ms] sm:text-6xl md:text-7xl lg:text-8xl">
          Architecting Scalable SaaS & AI Ecosystems.
        </h1>

        <p class="mt-9 max-w-4xl animate-fade-in-up text-balance text-lg leading-relaxed text-zinc-600 [animation-delay:200ms] sm:text-xl">
          Hi, I'm Sharlmon. I'm a Full-Stack Software Engineer, AI Systems Builder, and the founder of SharlTech, operating out of Westlands, Nairobi. After pivoting from Aerospace Engineering to pursue software development full-time, I now focus on engineering high-performance web applications, multi-agent AI tools, and resilient digital infrastructure tailored to unique market needs.
        </p>

        <div class="mt-10 flex animate-fade-in-up flex-col gap-3 [animation-delay:300ms] sm:flex-row">
          <NuxtLink to="/portfolio#projects" class="button-primary">Explore selected work <ArrowRight :size="17" /></NuxtLink>
          <NuxtLink to="/portfolio#stack" class="button-glass">View technology stack <Layers3 :size="17" /></NuxtLink>
        </div>

        <div class="glass-panel mt-16 grid w-full max-w-4xl animate-fade-in-up grid-cols-1 divide-y divide-zinc-200/70 overflow-hidden rounded-3xl [animation-delay:400ms] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          <div v-for="fact in [{ value: 'Full-Stack', label: 'Engineering' }, { value: 'AI-Native', label: 'Systems' }, { value: 'Nairobi', label: 'Based' }]" :key="fact.label" class="px-6 py-5">
            <p class="text-xl font-extrabold tracking-tight">{{ fact.value }}</p><p class="mt-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">{{ fact.label }}</p>
          </div>
        </div>
      </section>

      <section id="stack" class="scroll-mt-28 px-5 py-24 sm:px-8 lg:py-32">
        <div class="mx-auto max-w-7xl">
          <div class="mx-auto max-w-3xl text-center">
            <p class="mb-5 text-xs font-bold uppercase tracking-[0.22em] text-emerald-600">Preferred toolkit</p>
            <h2 class="text-balance text-4xl font-extrabold tracking-tight text-zinc-950 sm:text-6xl lg:text-7xl">Tools chosen for real-world scale.</h2>
            <p class="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-zinc-600">A pragmatic stack for shipping fast, staying maintainable and operating with confidence.</p>
          </div>

          <div class="glass-panel mt-14 overflow-hidden rounded-[2rem]">
            <div v-for="(group, groupIndex) in stackGroups" :key="group.label" class="animate-fade-in-up border-b border-zinc-200/70 p-6 last:border-b-0 sm:p-8 lg:grid lg:grid-cols-[14rem_1fr] lg:items-start lg:gap-8" :style="{ animationDelay: `${groupIndex * 100}ms` }">
              <div class="mb-5 flex items-center gap-3 lg:mb-0">
                <span class="grid h-10 w-10 place-items-center rounded-xl bg-zinc-950 text-white"><component :is="group.icon" :size="18" /></span>
                <p class="text-sm font-extrabold tracking-tight">{{ group.label }}</p>
              </div>
              <div class="flex flex-wrap gap-2.5">
                <span v-for="tool in group.tools" :key="tool" class="rounded-full border border-zinc-200 bg-white px-3 py-1 text-sm text-zinc-800">{{ tool }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="projects" class="scroll-mt-40 px-5 py-24 sm:px-8 lg:py-32">
        <div class="mx-auto max-w-7xl">
          <div class="lg:flex lg:items-end lg:justify-between">
            <div><p class="section-label">Featured projects</p><h2 class="max-w-4xl text-balance text-4xl font-extrabold tracking-tight text-zinc-950 sm:text-6xl lg:text-7xl">Systems built around hard problems.</h2></div>
            <p class="mt-6 max-w-md leading-relaxed text-zinc-600 lg:mt-0">Selected work spanning software products, commercial websites, visual identity and digital infrastructure.</p>
          </div>

          <div class="project-grid">
            <article v-for="(project, index) in projects" :key="project.name" class="project-card animate-fade-in-up" :style="{ animationDelay: `${index * 70}ms` }">
              <div class="project-card__top">
                <span class="project-card__icon"><component :is="project.icon" :size="18" :stroke-width="1.8" /></span>
                <span class="project-card__number">{{ project.number }}</span>
              </div>

              <div class="project-card__body">
                <p class="project-card__type">{{ project.type }}</p>
                <h3>{{ project.name }}</h3>
                <p class="project-card__description">{{ project.description }}</p>
              </div>

              <div class="project-card__tags">
                <span v-for="tag in project.tags" :key="tag">{{ tag }}</span>
              </div>

              <a
                v-if="project.url"
                :href="project.url"
                target="_blank"
                rel="noopener noreferrer"
                class="project-card__link"
                :aria-label="`View ${project.name} live (opens in a new tab)`"
              >
                View live site
                <ExternalLink :size="13" aria-hidden="true" />
              </a>
            </article>
          </div>
        </div>
      </section>

      <section class="px-5 pb-10 pt-20 sm:px-8 lg:pt-28">
        <div class="mx-auto max-w-7xl rounded-[2rem] bg-zinc-950 px-7 py-16 text-white sm:px-12 sm:py-20 lg:px-20">
          <div class="grid items-end gap-10 lg:grid-cols-[1fr_auto]">
            <div><p class="text-xs font-extrabold uppercase tracking-[0.22em] text-zinc-400">Have a hard problem?</p><h2 class="mt-5 max-w-4xl text-balance text-5xl font-extrabold leading-[0.95] tracking-[-0.055em] sm:text-7xl lg:text-8xl">Let’s engineer the answer.</h2><p class="mt-6 max-w-2xl text-lg text-zinc-400">Choose the services you need, share the brief and continue directly to a focused WhatsApp consultation.</p></div>
            <button type="button" class="inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-white px-7 py-4 font-extrabold text-zinc-950 transition-colors hover:bg-zinc-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950" aria-haspopup="dialog" aria-controls="project-modal" @click="openProjectModal">Start a project <ArrowRight :size="19" /></button>
          </div>
        </div>
      </section>
    </main>

    <footer class="relative z-10 px-5 py-10 sm:px-8">
      <div class="mx-auto flex max-w-7xl flex-col gap-6 border-t border-zinc-200 pt-8 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
        <NuxtLink to="/" class="flex items-center gap-2 rounded-full font-extrabold text-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2"><span class="text-emerald-500">●</span> SHARLTECH</NuxtLink>
        <p>© {{ new Date().getFullYear() }} SharlTech. Engineered in Nairobi.</p>
        <div class="flex gap-5 font-semibold"><a href="mailto:sharlmon19@gmail.com" class="transition hover:text-emerald-500">Email</a><a href="https://www.linkedin.com/in/sharlmon-junior-701746281" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 transition hover:text-emerald-500">LinkedIn <ExternalLink :size="12" /></a></div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.project-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.8rem;
  margin-top: 3.5rem;
}

.project-card {
  position: relative;
  display: flex;
  min-height: 18.25rem;
  overflow: hidden;
  padding: 1.4rem;
  border: 1px solid #e4e4e7;
  border-radius: 1.25rem;
  background: linear-gradient(145deg, #ffffff 0%, #fafafa 100%);
  flex-direction: column;
  transition: transform 220ms ease, border-color 220ms ease, box-shadow 220ms ease;
}

.project-card::before {
  content: '';
  position: absolute;
  top: 0;
  right: 1.4rem;
  left: 1.4rem;
  height: 2px;
  background: linear-gradient(90deg, #18181b 0 28%, #d4d4d8 28% 100%);
  opacity: 0.7;
}

.project-card:hover {
  border-color: #a1a1aa;
  box-shadow: 0 14px 35px rgba(24, 24, 27, 0.07);
  transform: translateY(-3px);
}

.project-card__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.project-card__icon {
  display: grid;
  width: 2.45rem;
  height: 2.45rem;
  place-items: center;
  border: 1px solid #e4e4e7;
  border-radius: 0.7rem;
  background: rgba(255, 255, 255, 0.72);
}

.project-card__number,
.project-card__type {
  color: #a1a1aa;
  font-size: 0.66rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.project-card__body {
  margin-top: 2.25rem;
}

.project-card__body h3 {
  margin-top: 0.65rem;
  font-size: clamp(1.55rem, 2.15vw, 2.15rem);
  font-weight: 750;
  letter-spacing: -0.055em;
  line-height: 1;
}

.project-card__description {
  margin-top: 0.9rem;
  color: #71717a;
  font-size: 0.88rem;
  line-height: 1.55;
}

.project-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin-top: auto;
  padding-top: 1.5rem;
}

.project-card__tags span {
  padding: 0.28rem 0.55rem;
  border: 1px solid #e4e4e7;
  border-radius: 999px;
  color: #52525b;
  font-size: 0.68rem;
  font-weight: 600;
  line-height: 1;
}

.project-card__link {
  display: inline-flex;
  width: fit-content;
  align-items: center;
  gap: 0.4rem;
  margin-top: 0.9rem;
  padding-bottom: 0.18rem;
  border-bottom: 1px solid #a1a1aa;
  color: #18181b;
  font-size: 0.72rem;
  font-weight: 750;
  transition: border-color 180ms ease, color 180ms ease;
}

.project-card__link:hover {
  border-color: #10b981;
  color: #059669;
}

.project-card__link:focus-visible {
  border-radius: 0.2rem;
  outline: 2px solid #18181b;
  outline-offset: 4px;
}

:global(.dark .project-card) {
  border-color: #3f3f46;
  background: linear-gradient(145deg, #18181b 0%, #111113 100%);
}

:global(.dark .project-card::before) {
  background: linear-gradient(90deg, #fafafa 0 28%, #3f3f46 28% 100%);
}

:global(.dark .project-card:hover) {
  border-color: #71717a;
  box-shadow: 0 14px 35px rgba(0, 0, 0, 0.24);
}

:global(.dark .project-card__icon) {
  border-color: #3f3f46;
  background: rgba(255, 255, 255, 0.04);
}

:global(.dark .project-card__description),
:global(.dark .project-card__tags span) {
  color: #a1a1aa;
}

:global(.dark .project-card__tags span) {
  border-color: #3f3f46;
}

:global(.dark .project-card__link) {
  border-color: #71717a;
  color: #fafafa;
}

:global(.dark .project-card__link:hover) {
  border-color: #34d399;
  color: #34d399;
}

:global(.dark .project-card__link:focus-visible) {
  outline-color: #fafafa;
}

@media (max-width: 980px) {
  .project-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}

@media (max-width: 620px) {
  .project-grid { grid-template-columns: 1fr; margin-top: 2.75rem; }
  .project-card { min-height: 16.75rem; }
}

@media (prefers-reduced-motion: reduce) {
  .project-card { transition: none; }
  .project-card:hover { transform: none; }
}
</style>
