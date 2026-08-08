<script setup lang="ts">
import { ArrowRight, Check, ChevronRight, Sparkles } from 'lucide-vue-next'

const requestUrl = useRequestURL()
const socialImage = new URL('/og-white.png', requestUrl.origin).toString()

useSeoMeta({
  ogImage: socialImage,
  ogImageAlt: 'SharlTech high-end web design and technology solutions',
  twitterCard: 'summary_large_image',
  twitterImage: socialImage,
})
</script>

<template>
  <div class="min-h-screen overflow-x-hidden bg-white text-zinc-950">
    <AppNavbar />

    <main id="top" class="relative z-10">
      <section class="mx-auto flex min-h-[calc(100vh-5rem)] max-w-7xl flex-col justify-center px-5 py-24 sm:px-8 sm:py-28 lg:px-10 lg:py-32">
        <div class="grid items-end gap-14 lg:grid-cols-[1.35fr_0.65fr] lg:gap-12">
          <div>
            <h1 class="max-w-5xl animate-fade-in-up text-balance text-5xl font-extrabold uppercase leading-[0.9] tracking-tighter text-zinc-950 sm:text-6xl md:text-7xl lg:text-[6.75rem] lg:leading-[0.86]">High-end web design <span class="text-zinc-400">&</span> hosting solutions</h1>
          </div>

          <div class="animate-fade-in-up pb-1 [animation-delay:200ms] lg:pb-3">
            <p class="max-w-xl text-balance text-lg leading-relaxed text-zinc-600 lg:text-xl">Elevate your online presence with SHARL-TECH's premium digital services. Security, performance, and innovation integrated.</p>
            <div class="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#services" class="button-primary">Start Project <ArrowRight :size="17" /></a>
              <a href="#services" class="button-glass">Explore Services <ChevronRight :size="17" /></a>
            </div>
          </div>
        </div>

      </section>

      <section id="services" class="scroll-mt-24 px-5 py-24 sm:px-8 lg:py-32">
        <div class="mx-auto max-w-7xl">
          <div class="animate-fade-in-up lg:flex lg:items-end lg:justify-between">
            <div><p class="section-label">Project scope</p><h2 class="max-w-4xl text-balance text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">Choose exactly what your project needs.</h2></div>
            <p class="mt-6 max-w-md text-base leading-relaxed text-zinc-600 lg:mt-0">Select individual services, share a focused brief and continue directly to a WhatsApp consultation.</p>
          </div>

          <ServiceQuoteSelector class="mt-14 animate-fade-in-up [animation-delay:100ms]" />
        </div>
      </section>

      <section id="about" class="scroll-mt-24 px-5 py-24 sm:px-8 lg:py-32">
        <div class="glass-panel mx-auto grid max-w-7xl overflow-hidden rounded-[2rem] lg:grid-cols-2">
          <div class="p-8 sm:p-12 lg:p-16">
            <p class="section-label">Why SharlTech</p><h2 class="text-balance text-4xl font-extrabold tracking-tight sm:text-6xl">Built beyond the brief.</h2>
            <p class="mt-6 max-w-xl text-lg leading-relaxed text-zinc-600">We combine product thinking, engineering depth and commercial clarity. That means fewer handovers, faster decisions and technology designed to create durable business value.</p>
            <div class="mt-10 grid gap-6 sm:grid-cols-2">
              <div v-for="item in [{ title: 'Senior attention', text: 'Direct collaboration with an experienced delivery team.' }, { title: 'Clear ownership', text: 'One accountable partner from strategy through launch.' }, { title: 'Local insight', text: 'Built in Kenya, designed to perform anywhere.' }, { title: 'Measurable outcomes', text: 'Success defined by business impact, not activity.' }]" :key="item.title">
                <Check class="mb-3 text-emerald-500" :size="20" /><h3 class="font-extrabold tracking-tight">{{ item.title }}</h3><p class="mt-1.5 text-sm leading-relaxed text-zinc-500">{{ item.text }}</p>
              </div>
            </div>
          </div>

          <div class="min-h-[30rem] bg-zinc-950 p-8 text-white sm:p-12 lg:p-16">
            <div class="flex h-full flex-col justify-between">
              <div class="flex items-center justify-between"><span class="glass-badge !border-white/10 !bg-white/5 !text-zinc-300">Delivery system</span><Sparkles class="text-emerald-400" :size="24" /></div>
              <div class="space-y-3">
                <div v-for="(stage, index) in ['Discover the opportunity', 'Design the experience', 'Build the system', 'Launch & optimise']" :key="stage" class="flex items-center gap-4 rounded-2xl border border-white/15 p-4">
                  <span class="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white text-xs font-extrabold text-zinc-950">0{{ index + 1 }}</span><span class="font-bold tracking-tight">{{ stage }}</span><ArrowRight class="ml-auto text-zinc-500" :size="16" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="px-5 pb-10 pt-20 sm:px-8 lg:pt-28">
        <div class="mx-auto max-w-7xl rounded-[2rem] bg-zinc-950 px-7 py-16 text-white sm:px-12 sm:py-20 lg:px-20">
          <div class="grid items-end gap-10 lg:grid-cols-[1fr_auto]">
            <div><p class="text-xs font-extrabold uppercase tracking-[0.22em] text-zinc-400">Your next move</p><h2 class="mt-5 max-w-4xl text-balance text-5xl font-extrabold leading-[0.95] tracking-[-0.055em] sm:text-7xl lg:text-8xl">Let’s build what’s next.</h2><p class="mt-6 max-w-2xl text-lg text-zinc-400">Choose the services you need, share the brief and start a focused WhatsApp consultation with SharlTech.</p></div>
            <a href="#services" class="inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-white px-7 py-4 font-extrabold text-zinc-950 transition-colors hover:bg-zinc-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950">Build your scope <ArrowRight :size="19" /></a>
          </div>
        </div>
      </section>
    </main>

    <footer class="relative z-10 px-5 py-10 sm:px-8">
      <div class="mx-auto flex max-w-7xl flex-col gap-6 border-t border-zinc-200 pt-8 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
        <a href="#top" class="flex items-center gap-2 font-extrabold text-zinc-950"><span class="text-emerald-500">●</span> SHARLTECH</a>
        <p>© {{ new Date().getFullYear() }} SharlTech. Technology, thoughtfully delivered.</p>
        <div class="flex gap-5 font-semibold"><a href="mailto:sharlmon19@gmail.com" class="transition hover:text-emerald-500">Email</a><a href="https://www.linkedin.com/in/sharlmon-junior-701746281" target="_blank" rel="noopener noreferrer" class="transition hover:text-emerald-500">LinkedIn</a></div>
      </div>
    </footer>

  </div>
</template>
