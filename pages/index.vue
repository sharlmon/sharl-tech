<script setup lang="ts">
import {
  ArrowRight, Bot, Check, ChevronRight, Cloud, Code2, Database, Gauge,
  Menu, Moon, ShieldCheck, Sparkles, Sun, X, Zap,
} from 'lucide-vue-next'

type Plan = {
  name: string
  price: string
  amount: number | null
  description: string
  features: string[]
  featured?: boolean
}

const isDark = ref(false)
const mobileMenuOpen = ref(false)
const checkoutOpen = ref(false)
const checkoutStep = ref(1)
const submitting = ref(false)
const checkoutError = ref('')
const checkoutReference = ref('')
const selectedPlan = ref('Professional')

const checkoutForm = reactive({
  name: '',
  email: '',
  phone: '',
  company: '',
  brief: '',
})

const requestUrl = useRequestURL()
const socialImage = new URL('/og.png', requestUrl.origin).toString()

useSeoMeta({
  ogImage: socialImage,
  ogImageAlt: 'SharlTech high-end web design and technology solutions',
  twitterCard: 'summary_large_image',
  twitterImage: socialImage,
})

const services = [
  {
    icon: Code2,
    number: '01',
    title: 'Custom Software Development',
    description: 'Purpose-built web platforms, mobile experiences and internal tools engineered around your exact operating model.',
    tags: ['Web apps', 'Mobile', 'APIs'],
  },
  {
    icon: Cloud,
    number: '02',
    title: 'Cloud Hosting Infrastructure',
    description: 'Fast, resilient cloud architecture with proactive monitoring, automated backups and security built into every layer.',
    tags: ['99.9% uptime', 'DevOps', 'Security'],
  },
  {
    icon: Bot,
    number: '03',
    title: 'SEO & AI Integrations',
    description: 'Search-led growth systems and practical AI automations that help your team move faster and convert more demand.',
    tags: ['Technical SEO', 'Automation', 'AI'],
  },
  {
    icon: Database,
    number: '04',
    title: 'Business Systems',
    description: 'Connected dashboards, databases and workflow systems that turn fragmented processes into one clear source of truth.',
    tags: ['Dashboards', 'CRM', 'Data'],
  },
  {
    icon: ShieldCheck,
    number: '05',
    title: 'Cybersecurity & Reliability',
    description: 'Practical hardening, access controls and performance monitoring to keep critical digital operations dependable.',
    tags: ['Audits', 'Protection', 'Recovery'],
  },
  {
    icon: Gauge,
    number: '06',
    title: 'Digital Performance',
    description: 'Conversion-focused UX, analytics and continuous optimisation for digital products that need measurable momentum.',
    tags: ['UX strategy', 'Analytics', 'CRO'],
  },
]

const plans: Plan[] = [
  {
    name: 'Starter',
    price: 'KES 35K',
    amount: 35000,
    description: 'A sharp, credible digital launch for focused brands and new ventures.',
    features: ['Up to 5 tailored pages', 'Responsive UI design', 'SEO foundations', 'SSL & launch support'],
  },
  {
    name: 'Professional',
    price: 'KES 85K',
    amount: 85000,
    description: 'A complete growth platform for established teams ready to scale.',
    features: ['Custom UX & development', 'CMS or business integrations', 'Advanced performance setup', 'Analytics & conversion tracking'],
    featured: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    amount: null,
    description: 'A scoped solution for complex platforms, products and infrastructure.',
    features: ['Technical discovery sprint', 'Custom software architecture', 'Cloud & security strategy', 'Priority delivery team'],
  },
]

const selectedPlanData = computed(() => plans.find((plan) => plan.name === selectedPlan.value) || plans[1])

function applyTheme() {
  document.documentElement.classList.toggle('dark', isDark.value)
}

function toggleTheme() {
  isDark.value = !isDark.value
  localStorage.setItem('sharltech-theme', isDark.value ? 'dark' : 'light')
  applyTheme()
}

function openCheckout(plan = 'Professional') {
  selectedPlan.value = plan
  checkoutStep.value = 1
  checkoutError.value = ''
  checkoutReference.value = ''
  checkoutOpen.value = true
  mobileMenuOpen.value = false
  document.body.style.overflow = 'hidden'
}

function closeCheckout() {
  checkoutOpen.value = false
  document.body.style.overflow = ''
}

async function submitCheckout() {
  checkoutError.value = ''
  submitting.value = true
  try {
    const response = await $fetch<{ reference: string }>('/api/mpesa/checkout', {
      method: 'POST',
      body: { ...checkoutForm, plan: selectedPlanData.value.name, amount: selectedPlanData.value.amount },
    })
    checkoutReference.value = response.reference
    checkoutStep.value = 3
  } catch (error: any) {
    checkoutError.value = error?.data?.statusMessage || 'We could not start the M-Pesa prompt. Check your details and try again.'
  } finally {
    submitting.value = false
  }
}

function handleEscape(event: KeyboardEvent) {
  if (event.key === 'Escape' && checkoutOpen.value) closeCheckout()
}

onMounted(() => {
  const savedTheme = localStorage.getItem('sharltech-theme')
  isDark.value = savedTheme ? savedTheme === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches
  applyTheme()
  window.addEventListener('keydown', handleEscape)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleEscape)
  document.body.style.overflow = ''
})
</script>

<template>
  <div class="min-h-screen overflow-x-hidden bg-zinc-50 text-zinc-950 transition-colors duration-300 dark:bg-zinc-950 dark:text-white">
    <div class="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div class="absolute -left-28 top-24 h-80 w-80 rounded-full bg-emerald-300/20 blur-3xl dark:bg-emerald-500/10" />
      <div class="absolute -right-40 top-[32rem] h-96 w-96 rounded-full bg-sky-300/20 blur-3xl dark:bg-sky-500/10" />
      <div class="absolute inset-0 bg-[linear-gradient(to_right,rgba(113,113,122,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(113,113,122,0.06)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:linear-gradient(to_bottom,black,transparent_72%)]" />
    </div>

    <header class="sticky top-0 z-40 px-3 pt-3 sm:px-5">
      <nav class="glass-panel mx-auto flex h-16 max-w-7xl items-center justify-between rounded-2xl px-4 sm:px-6" aria-label="Main navigation">
        <a href="#top" class="group flex items-center gap-3" aria-label="SharlTech home">
          <span class="grid h-9 w-9 place-items-center rounded-xl bg-zinc-950 text-[11px] font-extrabold tracking-tight text-white transition-transform group-hover:rotate-3 dark:bg-white dark:text-zinc-950">ST</span>
          <span class="text-base font-extrabold tracking-tight">SHARL<span class="text-emerald-500">TECH</span></span>
        </a>

        <div class="hidden items-center gap-8 md:flex">
          <a href="#services" class="text-sm font-semibold text-zinc-600 transition hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white">Services</a>
          <a href="#pricing" class="text-sm font-semibold text-zinc-600 transition hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white">Pricing</a>
          <a href="#about" class="text-sm font-semibold text-zinc-600 transition hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white">About</a>
        </div>

        <div class="flex items-center gap-2">
          <button class="grid h-10 w-10 place-items-center rounded-full border border-zinc-200 bg-white/60 text-zinc-700 transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:border-white/10 dark:bg-zinc-900/60 dark:text-zinc-200 dark:hover:bg-zinc-800" type="button" :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'" :aria-pressed="isDark" @click="toggleTheme">
            <Sun v-if="isDark" :size="17" />
            <Moon v-else :size="17" />
          </button>
          <button type="button" class="button-primary hidden min-h-10 px-5 py-2.5 sm:inline-flex" @click="openCheckout()">Start Project <ArrowRight :size="15" /></button>
          <button type="button" class="grid h-10 w-10 place-items-center rounded-full md:hidden" :aria-expanded="mobileMenuOpen" aria-label="Toggle menu" @click="mobileMenuOpen = !mobileMenuOpen">
            <X v-if="mobileMenuOpen" :size="20" /><Menu v-else :size="20" />
          </button>
        </div>
      </nav>

      <div v-if="mobileMenuOpen" class="glass-panel mx-auto mt-2 max-w-7xl rounded-2xl p-3 md:hidden">
        <a v-for="item in ['Services', 'Pricing', 'About']" :key="item" :href="`#${item.toLowerCase()}`" class="block rounded-xl px-4 py-3 text-sm font-semibold hover:bg-zinc-100 dark:hover:bg-white/5" @click="mobileMenuOpen = false">{{ item }}</a>
        <button type="button" class="button-primary mt-2 w-full sm:hidden" @click="openCheckout()">Start Project <ArrowRight :size="15" /></button>
      </div>
    </header>

    <main id="top" class="relative z-10">
      <section class="relative mx-auto flex min-h-[calc(100vh-5rem)] max-w-7xl flex-col justify-center px-5 pb-8 pt-20 sm:px-8 lg:px-10 lg:pt-24">
        <div class="grid items-end gap-14 lg:grid-cols-[1.35fr_0.65fr] lg:gap-12">
          <div>
            <span class="glass-badge animate-fade-in-up">
              <span class="relative flex h-2 w-2"><span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" /><span class="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" /></span>
              Future Ready • Systems Online
            </span>
            <h1 class="mt-8 max-w-5xl animate-fade-in-up text-balance text-[clamp(3.1rem,8.8vw,8rem)] font-extrabold uppercase leading-[0.84] tracking-[-0.075em] [animation-delay:100ms]">High-end web design <span class="text-zinc-400 dark:text-zinc-600">&</span> hosting solutions</h1>
          </div>

          <div class="animate-fade-in-up pb-1 [animation-delay:200ms] lg:pb-3">
            <p class="max-w-xl text-balance text-lg leading-relaxed text-zinc-600 dark:text-zinc-400 lg:text-xl">Elevate your online presence with SHARL-TECH's premium digital services. Security, performance, and innovation integrated.</p>
            <div class="mt-8 flex flex-col gap-3 sm:flex-row">
              <button type="button" class="button-primary" @click="openCheckout()">Start Project <ArrowRight :size="17" /></button>
              <a href="#services" class="button-glass">Explore Services <ChevronRight :size="17" /></a>
            </div>
          </div>
        </div>

        <div class="glass-panel mt-16 grid animate-fade-in-up grid-cols-1 divide-y divide-zinc-200/70 overflow-hidden rounded-3xl [animation-delay:300ms] dark:divide-white/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          <div v-for="metric in [{ value: '50+', label: 'Projects' }, { value: '99.9%', label: 'Uptime' }, { value: '24/7', label: 'Support' }]" :key="metric.label" class="flex items-center justify-between px-7 py-5 sm:block sm:py-6 lg:flex">
            <span class="text-3xl font-extrabold tracking-tight lg:text-4xl">{{ metric.value }}</span><span class="text-[11px] font-bold uppercase tracking-[0.22em] text-zinc-500">{{ metric.label }}</span>
          </div>
        </div>
      </section>

      <section id="services" class="scroll-mt-24 px-5 py-24 sm:px-8 lg:py-32">
        <div class="mx-auto max-w-7xl">
          <div class="animate-fade-in-up lg:flex lg:items-end lg:justify-between">
            <div><p class="section-label">Capabilities</p><h2 class="max-w-4xl text-balance text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">One technology partner. Every layer covered.</h2></div>
            <p class="mt-6 max-w-md text-base leading-relaxed text-zinc-600 dark:text-zinc-400 lg:mt-0">From the first product sketch to reliable infrastructure at scale, we build the systems ambitious companies run on.</p>
          </div>

          <div class="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <article v-for="(service, index) in services" :key="service.title" class="glass-panel group animate-fade-in-up rounded-3xl p-7 transition duration-300 hover:-translate-y-1 hover:border-zinc-300 hover:shadow-xl dark:hover:border-white/20 dark:hover:shadow-black/30 sm:p-8" :style="{ animationDelay: `${100 + index * 70}ms` }">
              <div class="flex items-start justify-between"><span class="grid h-12 w-12 place-items-center rounded-2xl bg-zinc-950 text-white transition duration-300 group-hover:bg-emerald-500 dark:bg-white dark:text-zinc-950 dark:group-hover:bg-emerald-400"><component :is="service.icon" :size="21" :stroke-width="1.8" /></span><span class="text-xs font-bold tracking-[0.18em] text-zinc-400">{{ service.number }}</span></div>
              <h3 class="mt-10 text-2xl font-extrabold tracking-tight">{{ service.title }}</h3>
              <p class="mt-4 leading-relaxed text-zinc-600 dark:text-zinc-400">{{ service.description }}</p>
              <div class="mt-7 flex flex-wrap gap-2"><span v-for="tag in service.tags" :key="tag" class="rounded-full border border-zinc-200 bg-white/50 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-zinc-500 dark:border-white/10 dark:bg-white/5 dark:text-zinc-400">{{ tag }}</span></div>
            </article>
          </div>
        </div>
      </section>

      <section id="about" class="scroll-mt-24 px-5 py-24 sm:px-8 lg:py-32">
        <div class="glass-panel mx-auto grid max-w-7xl overflow-hidden rounded-[2rem] lg:grid-cols-2">
          <div class="p-8 sm:p-12 lg:p-16">
            <p class="section-label">Why SharlTech</p><h2 class="text-balance text-4xl font-extrabold tracking-tight sm:text-6xl">Built beyond the brief.</h2>
            <p class="mt-6 max-w-xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">We combine product thinking, engineering depth and commercial clarity. That means fewer handovers, faster decisions and technology designed to create durable business value.</p>
            <div class="mt-10 grid gap-6 sm:grid-cols-2">
              <div v-for="item in [{ title: 'Senior attention', text: 'Direct collaboration with an experienced delivery team.' }, { title: 'Clear ownership', text: 'One accountable partner from strategy through launch.' }, { title: 'Local insight', text: 'Built in Kenya, designed to perform anywhere.' }, { title: 'Measurable outcomes', text: 'Success defined by business impact, not activity.' }]" :key="item.title">
                <Check class="mb-3 text-emerald-500" :size="20" /><h3 class="font-extrabold tracking-tight">{{ item.title }}</h3><p class="mt-1.5 text-sm leading-relaxed text-zinc-500">{{ item.text }}</p>
              </div>
            </div>
          </div>

          <div class="relative min-h-[30rem] overflow-hidden bg-zinc-950 p-8 text-white sm:p-12 lg:p-16">
            <div class="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(52,211,153,0.2),transparent_35%),radial-gradient(circle_at_80%_80%,rgba(56,189,248,0.16),transparent_35%)]" />
            <div class="relative flex h-full flex-col justify-between">
              <div class="flex items-center justify-between"><span class="glass-badge !border-white/10 !bg-white/5 !text-zinc-300">Delivery system</span><Sparkles class="text-emerald-400" :size="24" /></div>
              <div class="space-y-3">
                <div v-for="(stage, index) in ['Discover the opportunity', 'Design the experience', 'Build the system', 'Launch & optimise']" :key="stage" class="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur-md">
                  <span class="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white text-xs font-extrabold text-zinc-950">0{{ index + 1 }}</span><span class="font-bold tracking-tight">{{ stage }}</span><ArrowRight class="ml-auto text-zinc-500" :size="16" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" class="scroll-mt-24 px-5 py-24 sm:px-8 lg:py-32">
        <div class="mx-auto max-w-7xl">
          <div class="mx-auto max-w-3xl text-center">
            <p class="mb-5 text-xs font-bold uppercase tracking-[0.22em] text-emerald-600 dark:text-emerald-400">Flat-rate project billing</p>
            <h2 class="text-balance text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">One scope. One quote. No surprises.</h2>
            <p class="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">Choose a clear starting point. Every engagement is scoped and agreed as a project before delivery begins.</p>
          </div>

          <div class="mt-14 grid items-stretch gap-4 lg:grid-cols-3">
            <article v-for="(plan, index) in plans" :key="plan.name" class="relative flex animate-fade-in-up flex-col rounded-3xl border p-7 transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-8" :class="plan.featured ? 'border-zinc-950 bg-zinc-950 text-white shadow-2xl shadow-zinc-950/15 dark:border-white dark:bg-white dark:text-zinc-950' : 'glass-panel'" :style="{ animationDelay: `${index * 90}ms` }">
              <span v-if="plan.featured" class="absolute right-6 top-6 rounded-full bg-emerald-400 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.16em] text-zinc-950">Most popular</span>
              <p class="text-sm font-bold" :class="plan.featured ? 'text-emerald-400 dark:text-emerald-600' : 'text-emerald-600 dark:text-emerald-400'">{{ plan.name }}</p>
              <div class="mt-7 flex items-end gap-2"><span class="text-5xl font-extrabold tracking-[-0.06em] sm:text-6xl">{{ plan.price }}</span></div>
              <p class="mt-2 text-xs font-bold uppercase tracking-[0.18em] text-zinc-500">Per project</p>
              <p class="mt-6 min-h-20 leading-relaxed" :class="plan.featured ? 'text-zinc-300 dark:text-zinc-600' : 'text-zinc-600 dark:text-zinc-400'">{{ plan.description }}</p>
              <ul class="mt-7 space-y-4">
                <li v-for="feature in plan.features" :key="feature" class="flex items-start gap-3 text-sm font-semibold"><span class="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full" :class="plan.featured ? 'bg-emerald-400 text-zinc-950 dark:bg-emerald-500' : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-400'"><Check :size="12" :stroke-width="3" /></span>{{ feature }}</li>
              </ul>
              <button type="button" class="mt-9 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full px-5 text-sm font-extrabold transition hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-emerald-500" :class="plan.featured ? 'bg-white text-zinc-950 hover:bg-emerald-400 dark:bg-zinc-950 dark:text-white dark:hover:bg-emerald-600' : 'bg-zinc-950 text-white hover:bg-emerald-600 dark:bg-white dark:text-zinc-950 dark:hover:bg-emerald-400'" @click="openCheckout(plan.name)">{{ plan.amount ? `Choose ${plan.name}` : 'Scope Enterprise' }} <ArrowRight :size="16" /></button>
            </article>
          </div>
          <p class="mt-6 text-center text-sm text-zinc-500">Final scope and project price are confirmed before checkout. Taxes and third-party fees, where applicable, are itemised upfront.</p>
        </div>
      </section>

      <section class="px-5 pb-10 pt-20 sm:px-8 lg:pt-28">
        <div class="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-emerald-400 px-7 py-16 text-zinc-950 shadow-glow sm:px-12 sm:py-20 lg:px-20">
          <div class="absolute inset-0 bg-[radial-gradient(circle_at_85%_15%,rgba(255,255,255,0.8),transparent_22%),linear-gradient(135deg,transparent_50%,rgba(2,44,34,0.12))]" />
          <div class="relative grid items-end gap-10 lg:grid-cols-[1fr_auto]">
            <div><p class="text-xs font-extrabold uppercase tracking-[0.22em]">Your next move</p><h2 class="mt-5 max-w-4xl text-balance text-5xl font-extrabold leading-[0.95] tracking-[-0.055em] sm:text-7xl lg:text-8xl">Let’s build what’s next.</h2><p class="mt-6 max-w-2xl text-lg font-medium text-emerald-950/75">Choose your project, complete a focused brief and approve your M-Pesa payment securely in a few guided steps.</p></div>
            <button type="button" class="inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-zinc-950 px-7 py-4 font-extrabold text-white shadow-xl transition hover:-translate-y-1 hover:bg-white hover:text-zinc-950 focus:outline-none focus:ring-2 focus:ring-zinc-950 focus:ring-offset-2 focus:ring-offset-emerald-400" @click="openCheckout()">Start with M-Pesa <ArrowRight :size="19" /></button>
          </div>
        </div>
      </section>
    </main>

    <footer class="relative z-10 px-5 py-10 sm:px-8">
      <div class="mx-auto flex max-w-7xl flex-col gap-6 border-t border-zinc-200 pt-8 text-sm text-zinc-500 dark:border-white/10 sm:flex-row sm:items-center sm:justify-between">
        <a href="#top" class="flex items-center gap-2 font-extrabold text-zinc-950 dark:text-white"><span class="text-emerald-500">●</span> SHARLTECH</a>
        <p>© {{ new Date().getFullYear() }} SharlTech. Technology, thoughtfully delivered.</p>
        <div class="flex gap-5 font-semibold"><a href="mailto:sharlmon19@gmail.com" class="transition hover:text-emerald-500">Email</a><a href="https://www.linkedin.com/in/sharlmon-junior-701746281" target="_blank" rel="noopener noreferrer" class="transition hover:text-emerald-500">LinkedIn</a></div>
      </div>
    </footer>

    <Teleport to="body">
      <Transition enter-active-class="transition duration-300" enter-from-class="opacity-0" leave-active-class="transition duration-200" leave-to-class="opacity-0">
        <div v-if="checkoutOpen" class="fixed inset-0 z-50 flex items-end justify-center bg-zinc-950/70 p-0 backdrop-blur-sm sm:items-center sm:p-5" role="dialog" aria-modal="true" aria-labelledby="checkout-title" @mousedown.self="closeCheckout">
          <div class="max-h-[94vh] w-full max-w-2xl overflow-y-auto rounded-t-[2rem] border border-zinc-200 bg-zinc-50 p-6 shadow-2xl dark:border-white/10 dark:bg-zinc-950 sm:rounded-[2rem] sm:p-9">
            <div class="flex items-start justify-between gap-6"><div><p class="text-xs font-extrabold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400">Project onboarding</p><h2 id="checkout-title" class="mt-2 text-3xl font-extrabold tracking-tight">{{ checkoutStep === 3 ? 'Prompt sent.' : 'Start your project' }}</h2></div><button type="button" class="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-zinc-200 transition hover:bg-white dark:border-white/10 dark:hover:bg-white/10" aria-label="Close checkout" @click="closeCheckout"><X :size="18" /></button></div>
            <div v-if="checkoutStep < 3" class="mt-8 flex gap-2" aria-label="Checkout progress"><span v-for="step in 2" :key="step" class="h-1.5 flex-1 rounded-full transition-colors" :class="checkoutStep >= step ? 'bg-emerald-500' : 'bg-zinc-200 dark:bg-zinc-800'" /></div>

            <div v-if="checkoutStep === 1" class="mt-8">
              <p class="mb-3 text-sm font-bold">Select a project package</p>
              <div class="grid gap-3 sm:grid-cols-3"><button v-for="plan in plans" :key="plan.name" type="button" class="rounded-2xl border p-4 text-left transition" :class="selectedPlan === plan.name ? 'border-emerald-500 bg-emerald-50 ring-1 ring-emerald-500 dark:bg-emerald-400/10' : 'border-zinc-200 bg-white hover:border-zinc-300 dark:border-white/10 dark:bg-zinc-900 dark:hover:border-white/20'" @click="selectedPlan = plan.name"><span class="block text-sm font-extrabold">{{ plan.name }}</span><span class="mt-1 block text-xs text-zinc-500">{{ plan.price }} / project</span></button></div>
              <div class="mt-6 grid gap-4 sm:grid-cols-2">
                <label class="text-sm font-bold">Name<input v-model="checkoutForm.name" required autocomplete="name" class="mt-2 w-full rounded-xl border-zinc-200 bg-white px-4 py-3 text-sm focus:border-emerald-500 focus:ring-emerald-500 dark:border-white/10 dark:bg-zinc-900" placeholder="Your full name"></label>
                <label class="text-sm font-bold">Work email<input v-model="checkoutForm.email" required type="email" autocomplete="email" class="mt-2 w-full rounded-xl border-zinc-200 bg-white px-4 py-3 text-sm focus:border-emerald-500 focus:ring-emerald-500 dark:border-white/10 dark:bg-zinc-900" placeholder="you@company.com"></label>
                <label class="text-sm font-bold sm:col-span-2">Company <span class="font-normal text-zinc-400">(optional)</span><input v-model="checkoutForm.company" autocomplete="organization" class="mt-2 w-full rounded-xl border-zinc-200 bg-white px-4 py-3 text-sm focus:border-emerald-500 focus:ring-emerald-500 dark:border-white/10 dark:bg-zinc-900" placeholder="Company or organisation"></label>
                <label class="text-sm font-bold sm:col-span-2">What are we building?<textarea v-model="checkoutForm.brief" rows="3" class="mt-2 w-full resize-none rounded-xl border-zinc-200 bg-white px-4 py-3 text-sm focus:border-emerald-500 focus:ring-emerald-500 dark:border-white/10 dark:bg-zinc-900" placeholder="A short outline of the project and its goal" /></label>
              </div>
              <button type="button" class="button-primary mt-7 w-full disabled:cursor-not-allowed disabled:opacity-50" :disabled="!checkoutForm.name || !checkoutForm.email" @click="checkoutStep = 2">Continue to secure payment <ArrowRight :size="16" /></button>
            </div>

            <form v-else-if="checkoutStep === 2" class="mt-8" @submit.prevent="submitCheckout">
              <button type="button" class="mb-5 text-sm font-bold text-zinc-500 transition hover:text-zinc-950 dark:hover:text-white" @click="checkoutStep = 1">← Back to project details</button>
              <div class="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 dark:border-emerald-400/20 dark:bg-emerald-400/10"><div class="flex items-center justify-between gap-4"><div><p class="text-sm font-extrabold">{{ selectedPlanData.name }} project</p><p class="mt-1 text-xs text-zinc-500">Flat project price</p></div><p class="text-xl font-extrabold">{{ selectedPlanData.price }}</p></div></div>
              <div v-if="selectedPlanData.amount" class="mt-6">
                <label class="text-sm font-bold">M-Pesa phone number<input v-model="checkoutForm.phone" required type="tel" inputmode="tel" autocomplete="tel" class="mt-2 w-full rounded-xl border-zinc-200 bg-white px-4 py-3 text-sm focus:border-emerald-500 focus:ring-emerald-500 dark:border-white/10 dark:bg-zinc-900" placeholder="07XX XXX XXX"></label>
                <p class="mt-3 flex items-start gap-2 text-xs leading-relaxed text-zinc-500"><ShieldCheck :size="15" class="mt-0.5 shrink-0 text-emerald-500" /> A secure M-Pesa STK prompt will be sent to this number. Your PIN is entered only on your phone.</p>
                <p v-if="checkoutError" class="mt-4 rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-700 dark:bg-red-500/10 dark:text-red-300">{{ checkoutError }}</p>
                <button type="submit" class="button-primary mt-7 w-full disabled:cursor-not-allowed disabled:opacity-60" :disabled="submitting || !checkoutForm.phone"><span v-if="submitting">Starting secure prompt…</span><template v-else>Send M-Pesa prompt <Zap :size="16" /></template></button>
              </div>
              <div v-else class="mt-6 rounded-2xl border border-zinc-200 p-5 dark:border-white/10"><p class="font-extrabold">Enterprise projects begin with a scoped quote.</p><p class="mt-2 text-sm leading-relaxed text-zinc-500">We’ll review your brief and email a fixed project quote with a secure M-Pesa checkout link.</p><a :href="`mailto:sharlmon19@gmail.com?subject=Enterprise%20project%20brief&body=${encodeURIComponent(checkoutForm.brief)}`" class="button-primary mt-6 w-full">Submit enterprise brief <ArrowRight :size="16" /></a></div>
            </form>

            <div v-else class="mt-10 text-center"><span class="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-400"><Check :size="28" :stroke-width="2.5" /></span><p class="mx-auto mt-5 max-w-md leading-relaxed text-zinc-600 dark:text-zinc-400">Check your phone and approve the M-Pesa prompt. We’ll email your onboarding confirmation as soon as payment is confirmed.</p><p class="mt-4 text-xs font-bold uppercase tracking-wider text-zinc-400">Reference {{ checkoutReference }}</p><button type="button" class="button-glass mt-7" @click="closeCheckout">Done</button></div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>
