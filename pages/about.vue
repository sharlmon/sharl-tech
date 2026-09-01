<script setup lang="ts">
import { ArrowRight, Check, MapPin, Target, Users } from 'lucide-vue-next'

const siteUrl = 'https://sharl-tech.co.ke'
const canonicalUrl = `${siteUrl}/about`
const socialImage = `${siteUrl}/og-white.png`
const description = 'Meet SharlTech, a Nairobi technology company combining product strategy, software engineering, cloud infrastructure and AI to build durable digital systems.'

useSeoMeta({
  title: 'About SharlTech | Nairobi Software & Technology Company',
  description,
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  ogTitle: 'About SharlTech | Nairobi Software & Technology Company',
  ogDescription: description,
  ogType: 'website',
  ogUrl: canonicalUrl,
  ogSiteName: 'SharlTech',
  ogLocale: 'en_KE',
  ogImage: socialImage,
  ogImageWidth: 1730,
  ogImageHeight: 909,
  ogImageAlt: 'About SharlTech, a software and technology company in Nairobi',
  twitterCard: 'summary_large_image',
  twitterTitle: 'About SharlTech | Nairobi Software & Technology Company',
  twitterDescription: description,
  twitterImage: socialImage,
  twitterImageAlt: 'About SharlTech, a software and technology company in Nairobi',
})

useHead({
  link: [{ rel: 'canonical', href: canonicalUrl }],
  script: [
    {
      key: 'sharltech-about-structured-data',
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'AboutPage',
            '@id': `${canonicalUrl}#webpage`,
            url: canonicalUrl,
            name: 'About SharlTech | Nairobi Software & Technology Company',
            description,
            isPartOf: { '@id': `${siteUrl}/#website` },
            mainEntity: { '@id': `${siteUrl}/#organization` },
            inLanguage: 'en-KE',
          },
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
              { '@type': 'ListItem', position: 2, name: 'About', item: canonicalUrl },
            ],
          },
        ],
      }),
    },
  ],
})

const principles = [
  { title: 'Senior attention', text: 'Direct collaboration with experienced engineering leadership from discovery through launch.', icon: Users },
  { title: 'Business outcomes', text: 'Technical decisions are tied to customer experience, operational efficiency and commercial value.', icon: Target },
  { title: 'Nairobi perspective', text: 'Local market understanding combined with engineering standards designed to perform globally.', icon: MapPin },
]
</script>

<template>
  <div class="min-h-screen bg-white text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50">
    <AppNavbar />

    <main class="pt-24">
      <section class="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
        <p class="section-label animate-fade-in-up">About SharlTech</p>
        <h1 class="max-w-6xl animate-fade-in-up text-balance text-5xl font-extrabold leading-[0.95] tracking-tighter text-zinc-950 [animation-delay:100ms] sm:text-6xl md:text-7xl lg:text-8xl">
          Technology built with clarity, ownership and purpose.
        </h1>
        <p class="mt-8 max-w-4xl animate-fade-in-up text-lg leading-relaxed text-zinc-600 [animation-delay:200ms] sm:text-xl">
          SharlTech is an independent technology company based in Westlands, Nairobi. We combine product thinking, full-stack software engineering, cloud infrastructure and AI systems expertise to build dependable digital products for organisations in Kenya and beyond.
        </p>
      </section>

      <section class="border-y border-zinc-200 bg-zinc-50 px-5 py-20 sm:px-8 lg:py-28">
        <div class="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div><p class="section-label">Our approach</p><h2 class="text-balance text-4xl font-extrabold tracking-tight sm:text-6xl">Built beyond the brief.</h2></div>
          <div>
            <p class="text-xl leading-relaxed text-zinc-700">Good technology is not measured by code volume or feature count. It is measured by how reliably it solves the right problem, how confidently it can be operated and how well it supports the business behind it.</p>
            <p class="mt-6 leading-relaxed text-zinc-600">Every SharlTech engagement connects strategy, experience design, engineering and deployment under one accountable delivery process. That reduces handovers, speeds up decisions and creates systems that remain maintainable after launch.</p>
          </div>
        </div>
      </section>

      <section aria-labelledby="principles-heading" class="px-5 py-24 sm:px-8 lg:py-32">
        <div class="mx-auto max-w-7xl">
          <h2 id="principles-heading" class="max-w-4xl text-balance text-4xl font-extrabold tracking-tight sm:text-6xl">How SharlTech works.</h2>
          <div class="mt-12 grid gap-4 lg:grid-cols-3">
            <article v-for="(principle, index) in principles" :key="principle.title" class="animate-fade-in-up rounded-3xl border border-zinc-200 bg-white p-8" :style="{ animationDelay: `${index * 90}ms` }">
              <component :is="principle.icon" :size="22" aria-hidden="true" />
              <h3 class="mt-10 text-2xl font-extrabold tracking-tight">{{ principle.title }}</h3>
              <p class="mt-4 leading-relaxed text-zinc-600">{{ principle.text }}</p>
            </article>
          </div>

          <div class="mt-16 grid gap-4 rounded-[2rem] bg-zinc-950 p-8 text-white sm:p-12 lg:grid-cols-2 lg:p-16">
            <div><p class="text-xs font-extrabold uppercase tracking-[0.22em] text-zinc-400">Delivery system</p><h2 class="mt-5 text-4xl font-extrabold tracking-tight sm:text-6xl">From opportunity to dependable operation.</h2></div>
            <ol class="space-y-3">
              <li v-for="(stage, index) in ['Discover the opportunity', 'Design the experience', 'Build the system', 'Launch and optimise']" :key="stage" class="flex items-center gap-4 rounded-2xl border border-white/15 p-4"><span class="grid h-8 w-8 place-items-center rounded-full bg-white text-xs font-extrabold text-zinc-950">0{{ index + 1 }}</span><span class="font-bold">{{ stage }}</span><Check class="ml-auto text-zinc-400" :size="18" /></li>
            </ol>
          </div>
        </div>
      </section>

      <section class="px-5 pb-10 sm:px-8">
        <div class="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 rounded-[2rem] border border-zinc-200 bg-white px-7 py-14 sm:px-12 lg:flex-row lg:items-end lg:px-16">
          <div><p class="section-label">Work with SharlTech</p><h2 class="max-w-3xl text-4xl font-extrabold tracking-tight sm:text-6xl">Bring us the difficult problem.</h2></div>
          <NuxtLink external to="/services" class="button-primary">Choose your services <ArrowRight :size="18" /></NuxtLink>
        </div>
      </section>
    </main>

    <footer class="px-5 py-10 sm:px-8">
      <div class="mx-auto flex max-w-7xl flex-col gap-6 border-t border-zinc-200 pt-8 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
        <NuxtLink external to="/" class="font-extrabold text-zinc-950">SHARLTECH</NuxtLink>
        <p>© {{ new Date().getFullYear() }} SharlTech. Engineered in Nairobi.</p>
        <div class="flex gap-5 font-semibold"><a href="mailto:sharlmon19@gmail.com">Email</a><a href="https://www.linkedin.com/in/sharlmon-junior-701746281" target="_blank" rel="noopener noreferrer">LinkedIn</a></div>
      </div>
    </footer>
  </div>
</template>
