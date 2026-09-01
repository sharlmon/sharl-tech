<script setup lang="ts">
import { ArrowRight, Check, Gauge, Globe2, Sparkles, Workflow } from 'lucide-vue-next'

const siteUrl = 'https://sharl-tech.co.ke'
const canonicalUrl = `${siteUrl}/`
const socialImage = `${siteUrl}/og-white.png`
const description = 'SharlTech is a Nairobi technology company building custom web applications, e-commerce platforms, cloud infrastructure, SEO and AI automation.'

useSeoMeta({
  title: 'SharlTech | Custom Software, Web Design & Cloud Hosting Kenya',
  description,
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  ogTitle: 'SharlTech | Custom Software & Technology Solutions in Kenya',
  ogDescription: description,
  ogType: 'website',
  ogUrl: canonicalUrl,
  ogSiteName: 'SharlTech',
  ogLocale: 'en_KE',
  ogImage: socialImage,
  ogImageWidth: 1730,
  ogImageHeight: 909,
  ogImageAlt: 'SharlTech high-end web design and technology solutions',
  twitterCard: 'summary_large_image',
  twitterTitle: 'SharlTech | Custom Software & Technology Solutions in Kenya',
  twitterDescription: description,
  twitterImage: socialImage,
  twitterImageAlt: 'SharlTech high-end web design and technology solutions',
})

useHead({
  link: [{ rel: 'canonical', href: canonicalUrl }],
  script: [
    {
      key: 'sharltech-home-structured-data',
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'WebSite',
            '@id': `${siteUrl}/#website`,
            url: canonicalUrl,
            name: 'SharlTech',
            alternateName: ['Sharl-Tech', 'sharl-tech.co.ke'],
            publisher: { '@id': `${siteUrl}/#organization` },
            inLanguage: 'en-KE',
          },
          {
            '@type': 'Organization',
            '@id': `${siteUrl}/#organization`,
            name: 'SharlTech',
            alternateName: 'Sharl-Tech',
            url: canonicalUrl,
            logo: {
              '@type': 'ImageObject',
              url: `${siteUrl}/sharltech-logo.png`,
              width: 915,
              height: 521,
            },
            image: socialImage,
            description,
            email: 'mailto:sharlmon19@gmail.com',
            telephone: '+254707575397',
            founder: {
              '@type': 'Person',
              name: 'Sharlmon',
              jobTitle: 'Full-Stack Software Engineer and AI Systems Builder',
            },
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Westlands',
              addressRegion: 'Nairobi',
              addressCountry: 'KE',
            },
            areaServed: [{ '@type': 'Country', name: 'Kenya' }, 'Worldwide'],
            sameAs: ['https://www.linkedin.com/in/sharlmon-junior-701746281'],
            knowsAbout: ['Custom software development', 'Web application development', 'Cloud hosting', 'E-commerce', 'Search engine optimization', 'Artificial intelligence automation'],
          },
          {
            '@type': 'WebPage',
            '@id': `${canonicalUrl}#webpage`,
            url: canonicalUrl,
            name: 'SharlTech | Custom Software, Web Design & Cloud Hosting Kenya',
            description,
            isPartOf: { '@id': `${siteUrl}/#website` },
            about: { '@id': `${siteUrl}/#organization` },
            inLanguage: 'en-KE',
          },
        ],
      }),
    },
  ],
})
</script>

<template>
  <div class="min-h-screen overflow-x-hidden bg-white text-zinc-950">
    <AppNavbar />

    <main id="top" class="relative z-10">
      <section class="home-hero" aria-labelledby="home-heading">
        <div class="wave-field" aria-hidden="true">
          <span class="wave wave--1" />
          <span class="wave wave--2" />
          <span class="wave wave--3" />
          <span class="wave wave--4" />
          <span class="wave wave--5" />
          <span class="wave wave--6" />
        </div>

        <div class="hero-layout">
          <div class="hero-copy">
            <div class="hero-badge appear appear--pop" style="--d: 0.22s">
              <Sparkles class="badge-star" :size="17" aria-hidden="true" />
              <span>Software · Cloud · AI</span>
            </div>

            <h1 id="home-heading" class="hero-heading">
              <span class="headline-line"><span class="appear appear--mask" style="--d: 0.42s">High-end digital systems</span></span>
              <span class="headline-line"><span class="appear appear--mask" style="--d: 0.62s"><em>engineered</em> to scale.</span></span>
            </h1>

            <p class="hero-lede appear appear--soft" style="--d: 0.82s; animation-duration: 1.25s">
              SharlTech designs and builds secure web applications, cloud infrastructure and AI workflows for ambitious organisations in Kenya and beyond.
            </p>

            <div class="hero-actions">
              <UiLiquidButton to="/services" external variant="metal" size="lg" class="appear appear--btn" style="--d: 0.96s">
                Start a Project
                <ArrowRight :size="17" aria-hidden="true" />
              </UiLiquidButton>
              <UiLiquidButton to="/portfolio" external variant="light" size="lg" class="appear appear--side" style="--d: 1.1s">
                See Selected Work
                <ArrowRight :size="17" aria-hidden="true" />
              </UiLiquidButton>
            </div>
          </div>

          <div class="hero-stats" aria-label="SharlTech highlights">
            <div class="hero-stat appear appear--stat" style="--d: 1.12s">
              <Workflow class="hero-stat-icon" :size="20" aria-hidden="true" />
              <span>Six focused digital capabilities</span>
            </div>
            <div class="hero-stat appear appear--stat" style="--d: 1.28s">
              <Gauge class="hero-stat-icon hero-stat-icon--tile" :size="19" aria-hidden="true" />
              <span>Performance and security by design</span>
            </div>
            <div class="hero-stat appear appear--stat" style="--d: 1.44s">
              <Globe2 class="hero-stat-icon" :size="20" aria-hidden="true" />
              <span>Nairobi built · worldwide ready</span>
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
            <NuxtLink external to="/services" class="inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-white px-7 py-4 font-extrabold text-zinc-950 transition-colors hover:bg-zinc-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950">Build your scope <ArrowRight :size="19" /></NuxtLink>
          </div>
        </div>
      </section>
    </main>

    <footer class="relative z-10 px-5 py-10 sm:px-8">
      <div class="mx-auto flex max-w-7xl flex-col gap-6 border-t border-zinc-200 pt-8 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
        <NuxtLink external to="/" class="flex items-center gap-2 rounded-full font-extrabold text-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2"><span class="text-emerald-500">●</span> SHARLTECH</NuxtLink>
        <p>© {{ new Date().getFullYear() }} SharlTech. Technology, thoughtfully delivered.</p>
        <div class="flex gap-5 font-semibold"><a href="mailto:sharlmon19@gmail.com" class="transition hover:text-emerald-500">Email</a><a href="https://www.linkedin.com/in/sharlmon-junior-701746281" target="_blank" rel="noopener noreferrer" class="transition hover:text-emerald-500">LinkedIn</a></div>
      </div>
    </footer>

  </div>
</template>

<style scoped>
.home-hero {
  position: relative;
  isolation: isolate;
  min-height: 100vh;
  min-height: 100dvh;
  overflow: hidden;
  background: #ffffff;
  color: #18181b;
}

.wave-field {
  position: absolute;
  inset: 0;
  z-index: -2;
  overflow: hidden;
  background:
    radial-gradient(circle at 50% 48%, rgba(99, 102, 241, 0.055), transparent 29%),
    radial-gradient(circle at 75% 38%, rgba(14, 165, 233, 0.035), transparent 24%),
    #ffffff;
  pointer-events: none;
}

.wave {
  position: absolute;
  left: -25%;
  width: 150%;
  height: clamp(12rem, 25vw, 24rem);
  border: 1px solid rgba(71, 85, 105, 0.11);
  border-right-color: rgba(14, 165, 233, 0.1);
  border-left-color: rgba(99, 102, 241, 0.08);
  border-radius: 46% 54% 50% 50% / 55% 48% 52% 45%;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.8), 0 -1px 24px rgba(99, 102, 241, 0.025);
  will-change: transform;
}

.wave--1 { top: 15%; animation: wave-drift-a 13s ease-in-out infinite alternate; }
.wave--2 { top: 24%; opacity: 0.85; animation: wave-drift-b 16s ease-in-out -4s infinite alternate; }
.wave--3 { top: 36%; opacity: 0.72; animation: wave-drift-a 18s ease-in-out -8s infinite alternate-reverse; }
.wave--4 { top: 49%; opacity: 0.62; animation: wave-drift-b 20s ease-in-out -6s infinite alternate-reverse; }
.wave--5 { top: 62%; opacity: 0.5; animation: wave-drift-a 22s ease-in-out -12s infinite alternate; }
.wave--6 { top: 74%; opacity: 0.4; animation: wave-drift-b 24s ease-in-out -10s infinite alternate; }

.hero-layout {
  display: grid;
  grid-template-rows: 1fr auto;
  min-height: 100vh;
  min-height: 100dvh;
  padding: clamp(8.75rem, 18vh, 12rem) clamp(1.25rem, 5vw, 4.5rem) max(2rem, env(safe-area-inset-bottom));
}

.hero-copy {
  display: flex;
  width: min(100%, 64rem);
  align-self: end;
  justify-self: center;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  margin-bottom: 1.3rem;
  padding: 0.55rem 0.9rem;
  border: 1px solid rgba(24, 24, 27, 0.12);
  border-radius: 0.42rem;
  background: linear-gradient(105deg, rgba(255, 255, 255, 0.9), rgba(244, 244, 245, 0.74) 52%, rgba(255, 255, 255, 0.84));
  box-shadow: inset 0 1px 0 #ffffff, 0 10px 35px rgba(24, 24, 27, 0.07);
  color: #3f3f46;
  font-size: 0.78rem;
  letter-spacing: -0.01em;
  -webkit-backdrop-filter: blur(12px);
  backdrop-filter: blur(12px);
}

.badge-star {
  filter: drop-shadow(0 0 4px rgba(99, 102, 241, 0.18));
  animation: in-star 900ms cubic-bezier(0.16, 1, 0.3, 1) 280ms both;
}

.hero-heading {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: clamp(3.2rem, 6.5vw, 6.2rem);
  font-weight: 600;
  letter-spacing: -0.065em;
  line-height: 0.98;
  text-wrap: balance;
}

.headline-line {
  display: block;
  overflow: hidden;
  padding: 0.06em 0.15em 0.13em;
}

.headline-line > span {
  display: block;
}

.hero-heading em {
  color: #8a8a8f;
  font-family: 'Instrument Serif', 'Times New Roman', Times, serif;
  font-size: 1.08em;
  font-weight: 400;
  letter-spacing: -0.035em;
  animation: in-em 1.2s cubic-bezier(0.16, 1, 0.3, 1) 720ms both;
}

.hero-lede {
  max-width: 40rem;
  margin-top: 1.15rem;
  color: #5f6067;
  font-size: clamp(1rem, 1.3vw, 1.16rem);
  font-weight: 400;
  letter-spacing: -0.02em;
  line-height: 1.55;
  text-wrap: balance;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.65rem;
  margin-top: 1.65rem;
}

.hero-stats {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  width: 100%;
  margin-top: clamp(2.5rem, 8vh, 5.5rem);
  color: #52525b;
}

.hero-stat {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.82rem;
  letter-spacing: -0.02em;
  white-space: nowrap;
}

.hero-stat-icon {
  flex: 0 0 auto;
  color: #3f3f46;
}

.hero-stat-icon--tile {
  box-sizing: content-box;
  padding: 0.18rem;
  border-radius: 0.35rem;
  background: #18181b;
  color: #ffffff;
}

@keyframes wave-drift-a {
  from { transform: translate3d(-2.5%, -10px, 0) rotate(-2deg) scaleX(1.02); }
  to { transform: translate3d(2.5%, 16px, 0) rotate(2deg) scaleX(0.98); }
}

@keyframes wave-drift-b {
  from { transform: translate3d(2%, 14px, 0) rotate(1.5deg) scaleX(0.99); }
  to { transform: translate3d(-2%, -14px, 0) rotate(-1.5deg) scaleX(1.02); }
}

@keyframes in-star {
  from { opacity: 0; transform: scale(0.2) rotate(-50deg); }
  65% { opacity: 1; transform: scale(1.2) rotate(8deg); }
  to { opacity: 1; transform: scale(1) rotate(0); }
}

@keyframes in-em {
  from { opacity: 0.35; filter: blur(4px); }
  to { opacity: 1; filter: blur(0); }
}

@media (min-width: 1600px) {
  .hero-heading { font-size: 6.8rem; }
  .hero-lede { max-width: 44rem; font-size: 1.25rem; }
  .hero-stat { font-size: 0.92rem; }
}

@media (min-width: 1920px) {
  .hero-heading { font-size: 7.8rem; }
  .hero-layout { padding-inline: 7.5rem; }
}

@media (min-width: 901px) and (max-height: 760px) {
  .hero-layout { padding-top: 7.5rem; padding-bottom: 1.25rem; }
  .hero-heading { font-size: clamp(2.75rem, 5.5vw, 4.9rem); }
  .hero-stats { margin-top: 2rem; }
  .hero-badge { margin-bottom: 0.8rem; }
  .hero-lede { margin-top: 0.75rem; }
  .hero-actions { margin-top: 1rem; }
}

@media (max-width: 900px) {
  .hero-layout {
    padding: 8.5rem 1.25rem max(1.75rem, env(safe-area-inset-bottom));
  }

  .hero-heading {
    font-size: clamp(2.65rem, 11vw, 4.75rem);
    line-height: 1.01;
  }

  .hero-stats { flex-direction: column; align-items: center; gap: 0.9rem; }
  .hero-stat { white-space: normal; text-align: center; }
}

@media (max-width: 560px) {
  .hero-layout { padding-inline: 1rem; }
  .hero-badge { margin-bottom: 1rem; }
  .hero-lede { font-size: 0.98rem; }
  .hero-actions { width: 100%; flex-direction: column; }
  .hero-actions > * { width: 100%; }
}

@media (prefers-reduced-motion: reduce) {
  .wave,
  .badge-star,
  .hero-heading em {
    animation: none !important;
    opacity: 1;
    transform: none;
    filter: none;
  }
}
</style>
