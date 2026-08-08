<script setup lang="ts">
import { ArrowRight, Bot, CloudCog, Code2, Search, ShoppingBag, Smartphone } from 'lucide-vue-next'

const siteUrl = 'https://sharl-tech.co.ke'
const canonicalUrl = `${siteUrl}/services`
const socialImage = `${siteUrl}/og-white.png`
const description = 'Explore SharlTech services in Nairobi: custom web applications, headless e-commerce, cloud infrastructure, SEO, PWAs and AI automation workflows.'

const services = [
  { name: 'Custom Web Application', icon: Code2, description: 'Secure, high-performance software designed around your workflows, customers and commercial goals.' },
  { name: 'Headless E-Commerce Integration', icon: ShoppingBag, description: 'Flexible storefronts, custom retail logic and reliable checkout integrations for modern commerce.' },
  { name: 'Cloud Hosting & Infrastructure Setup', icon: CloudCog, description: 'Production-ready hosting, deployments, caching and server configuration built for resilience.' },
  { name: 'SEO Optimization', icon: Search, description: 'Technical and on-page improvements that make your site easier to crawl, understand and discover.' },
  { name: 'Progressive Web App Development', icon: Smartphone, description: 'Installable, responsive web experiences with offline capabilities and app-like performance.' },
  { name: 'AI & Automation Workflows', icon: Bot, description: 'Purpose-built AI agents and automated workflows that reduce repetitive work and unlock new services.' },
]

useSeoMeta({
  title: 'Software Development, Cloud & AI Services Kenya | SharlTech',
  description,
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  ogTitle: 'Software Development, Cloud & AI Services Kenya | SharlTech',
  ogDescription: description,
  ogType: 'website',
  ogUrl: canonicalUrl,
  ogSiteName: 'SharlTech',
  ogLocale: 'en_KE',
  ogImage: socialImage,
  ogImageWidth: 1730,
  ogImageHeight: 909,
  ogImageAlt: 'SharlTech software, cloud infrastructure and AI services',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Software Development, Cloud & AI Services Kenya | SharlTech',
  twitterDescription: description,
  twitterImage: socialImage,
  twitterImageAlt: 'SharlTech software, cloud infrastructure and AI services',
})

useHead({
  link: [{ rel: 'canonical', href: canonicalUrl }],
  script: [
    {
      key: 'sharltech-services-structured-data',
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'CollectionPage',
            '@id': `${canonicalUrl}#webpage`,
            url: canonicalUrl,
            name: 'Software Development, Cloud & AI Services Kenya | SharlTech',
            description,
            isPartOf: { '@id': `${siteUrl}/#website` },
            about: { '@id': `${siteUrl}/#organization` },
            inLanguage: 'en-KE',
            mainEntity: {
              '@type': 'ItemList',
              itemListElement: services.map((service, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                item: {
                  '@type': 'Service',
                  name: service.name,
                  description: service.description,
                  provider: { '@id': `${siteUrl}/#organization` },
                  areaServed: [{ '@type': 'Country', name: 'Kenya' }, 'Worldwide'],
                },
              })),
            },
          },
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
              { '@type': 'ListItem', position: 2, name: 'Services', item: canonicalUrl },
            ],
          },
        ],
      }),
    },
  ],
})
</script>

<template>
  <div class="min-h-screen bg-white text-zinc-950">
    <AppNavbar />

    <main class="pt-24">
      <section class="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
        <p class="section-label animate-fade-in-up">Technology services in Nairobi</p>
        <h1 class="max-w-6xl animate-fade-in-up text-balance text-5xl font-extrabold leading-[0.95] tracking-tighter text-zinc-950 [animation-delay:100ms] sm:text-6xl md:text-7xl lg:text-8xl">
          Software, infrastructure and AI built around your business.
        </h1>
        <p class="mt-8 max-w-3xl animate-fade-in-up text-lg leading-relaxed text-zinc-600 [animation-delay:200ms] sm:text-xl">
          SharlTech designs and engineers dependable digital products for ambitious organisations in Kenya and beyond—from custom applications and e-commerce to cloud systems, search visibility and intelligent automation.
        </p>
      </section>

      <section aria-labelledby="service-capabilities" class="border-y border-zinc-200 bg-zinc-50 px-5 py-20 sm:px-8 lg:py-28">
        <div class="mx-auto max-w-7xl">
          <h2 id="service-capabilities" class="max-w-4xl text-balance text-4xl font-extrabold tracking-tight sm:text-6xl">Focused capabilities. One accountable technology partner.</h2>
          <div class="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <article v-for="(service, index) in services" :key="service.name" class="animate-fade-in-up rounded-3xl border border-zinc-200 bg-white p-7" :style="{ animationDelay: `${index * 70}ms` }">
              <component :is="service.icon" :size="22" aria-hidden="true" />
              <h3 class="mt-8 text-xl font-extrabold tracking-tight">{{ service.name }}</h3>
              <p class="mt-3 leading-relaxed text-zinc-600">{{ service.description }}</p>
            </article>
          </div>
        </div>
      </section>

      <section aria-labelledby="project-scope" class="px-5 py-24 sm:px-8 lg:py-32">
        <div class="mx-auto max-w-7xl">
          <div class="lg:flex lg:items-end lg:justify-between">
            <div><p class="section-label">Request a custom quote</p><h2 id="project-scope" class="max-w-4xl text-balance text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">Choose exactly what your project needs.</h2></div>
            <p class="mt-6 max-w-md leading-relaxed text-zinc-600 lg:mt-0">Select your services and share a focused brief. SharlTech will use it to prepare for your consultation.</p>
          </div>
          <ServiceQuoteSelector class="mt-14" />
        </div>
      </section>

      <section class="px-5 pb-10 sm:px-8">
        <div class="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 rounded-[2rem] bg-zinc-950 px-7 py-14 text-white sm:px-12 lg:flex-row lg:items-end lg:px-16">
          <div><p class="text-xs font-extrabold uppercase tracking-[0.22em] text-zinc-400">See the engineering behind the work</p><h2 class="mt-4 max-w-3xl text-4xl font-extrabold tracking-tight sm:text-6xl">Explore systems built for real-world scale.</h2></div>
          <NuxtLink external to="/portfolio" class="inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-white px-7 py-4 font-extrabold text-zinc-950 transition-colors hover:bg-zinc-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950">View portfolio <ArrowRight :size="19" /></NuxtLink>
        </div>
      </section>
    </main>

    <footer class="px-5 py-10 sm:px-8">
      <div class="mx-auto flex max-w-7xl flex-col gap-6 border-t border-zinc-200 pt-8 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
        <NuxtLink external to="/" class="font-extrabold text-zinc-950">SHARLTECH</NuxtLink>
        <p>© {{ new Date().getFullYear() }} SharlTech. Technology, thoughtfully delivered.</p>
        <div class="flex gap-5 font-semibold"><a href="mailto:sharlmon19@gmail.com">Email</a><a href="https://www.linkedin.com/in/sharlmon-junior-701746281" target="_blank" rel="noopener noreferrer">LinkedIn</a></div>
      </div>
    </footer>
  </div>
</template>
