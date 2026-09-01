<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next'

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
  <div class="min-h-screen overflow-x-hidden bg-white text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50">
    <AppNavbar />

    <main id="top" class="relative z-10">
      <section class="home-hero" aria-labelledby="home-heading">
        <div class="wave-field" aria-hidden="true">
          <span class="wave wave--1" />
          <span class="wave wave--2" />
          <span class="wave wave--3" />
        </div>

        <div class="hero-layout">
          <div class="hero-grid">
            <div class="hero-title-block">
              <p class="hero-kicker appear appear--soft" style="--d: 0.16s">Nairobi, Kenya</p>
              <h1 id="home-heading" class="hero-heading">
                <span class="hero-line"><span class="appear appear--mask" style="--d: 0.24s">Custom</span></span>
                <span class="hero-line"><span class="appear appear--mask" style="--d: 0.34s">software</span></span>
                <span class="hero-line hero-line--muted"><span class="appear appear--mask" style="--d: 0.44s">&amp; cloud</span></span>
                <span class="hero-line"><span class="appear appear--mask" style="--d: 0.54s">systems.</span></span>
              </h1>
            </div>

            <div class="hero-intro appear appear--soft" style="--d: 0.56s">
              <p>
                SharlTech designs and builds web applications, e-commerce platforms, cloud infrastructure and practical automation for organisations in Kenya and beyond.
              </p>

              <div class="hero-actions">
                <UiLiquidButton to="/services" external variant="metal" size="lg">
                  Start a project
                  <ArrowRight :size="17" aria-hidden="true" />
                </UiLiquidButton>
                <UiLiquidButton to="/portfolio" external variant="light" size="lg">
                  View work
                </UiLiquidButton>
              </div>
            </div>
          </div>

          <div class="hero-capabilities appear appear--soft" style="--d: 0.72s" aria-label="Core capabilities">
            <span>Web applications</span>
            <span>E-commerce</span>
            <span>Cloud infrastructure</span>
            <span>Automation</span>
          </div>
        </div>
      </section>
    </main>

    <footer class="relative z-10 px-5 py-8 sm:px-8">
      <div class="mx-auto flex max-w-7xl flex-col gap-4 border-t border-zinc-200 pt-7 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
        <p>© {{ new Date().getFullYear() }} SharlTech</p>
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

:global(.dark .home-hero) {
  background: #09090b;
  color: #fafafa;
}

.wave-field {
  position: absolute;
  inset: 0;
  z-index: -2;
  overflow: hidden;
  background: #ffffff;
  pointer-events: none;
}

:global(.dark .wave-field) {
  background: #09090b;
}

.wave {
  position: absolute;
  left: -20%;
  width: 140%;
  height: clamp(15rem, 29vw, 30rem);
  border: 1px solid rgba(24, 24, 27, 0.075);
  border-radius: 46% 54% 50% 50% / 55% 48% 52% 45%;
  will-change: transform;
}

:global(.dark .wave) {
  border-color: rgba(255, 255, 255, 0.075);
}

.wave--1 { top: 18%; animation: wave-drift-a 18s ease-in-out infinite alternate; }
.wave--2 { top: 42%; opacity: 0.7; animation: wave-drift-b 22s ease-in-out -5s infinite alternate; }
.wave--3 { top: 66%; opacity: 0.45; animation: wave-drift-a 26s ease-in-out -10s infinite alternate-reverse; }

.hero-layout {
  display: grid;
  grid-template-rows: 1fr auto;
  width: min(100%, 80rem);
  min-height: 100vh;
  min-height: 100dvh;
  margin: 0 auto;
  padding: clamp(8.5rem, 15vh, 11rem) clamp(1.25rem, 4vw, 3rem) max(2rem, env(safe-area-inset-bottom));
}

.hero-grid {
  display: grid;
  align-self: center;
  grid-template-columns: minmax(0, 1.32fr) minmax(18rem, 0.68fr);
  align-items: end;
  gap: clamp(3rem, 7vw, 7rem);
  width: 100%;
}

.hero-kicker {
  margin-bottom: 1.15rem;
  color: #71717a;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.hero-heading {
  font-size: clamp(4.25rem, 8.2vw, 8.25rem);
  font-weight: 750;
  letter-spacing: -0.085em;
  line-height: 0.78;
  text-transform: uppercase;
}

.hero-line {
  display: block;
  overflow: hidden;
  padding: 0.04em 0.08em 0.08em 0;
}

.hero-line > span {
  display: block;
}

.hero-line--muted {
  color: #a1a1aa;
}

.hero-intro {
  padding-bottom: 0.55rem;
}

.hero-intro > p {
  color: #52525b;
  font-size: clamp(1.05rem, 1.35vw, 1.22rem);
  font-weight: 400;
  letter-spacing: -0.025em;
  line-height: 1.6;
}

:global(.dark .hero-kicker),
:global(.dark .hero-intro > p) {
  color: #a1a1aa;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
  margin-top: 2rem;
}

.hero-capabilities {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1rem;
  margin-top: clamp(3rem, 8vh, 5rem);
  padding-top: 1.1rem;
  border-top: 1px solid rgba(24, 24, 27, 0.1);
  color: #71717a;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.04em;
}

.hero-capabilities span:not(:first-child) {
  text-align: center;
}

.hero-capabilities span:last-child {
  text-align: right;
}

:global(.dark .hero-capabilities) {
  border-color: rgba(255, 255, 255, 0.11);
  color: #a1a1aa;
}

@keyframes wave-drift-a {
  from { transform: translate3d(-2.5%, -10px, 0) rotate(-2deg) scaleX(1.02); }
  to { transform: translate3d(2.5%, 16px, 0) rotate(2deg) scaleX(0.98); }
}

@keyframes wave-drift-b {
  from { transform: translate3d(2%, 14px, 0) rotate(1.5deg) scaleX(0.99); }
  to { transform: translate3d(-2%, -14px, 0) rotate(-1.5deg) scaleX(1.02); }
}

@media (min-width: 1600px) {
  .hero-layout { width: min(100%, 91rem); }
  .hero-heading { font-size: 9rem; }
}

@media (min-width: 1920px) {
  .hero-layout { width: min(100%, 102rem); }
  .hero-heading { font-size: 10.5rem; }
}

@media (min-width: 901px) and (max-height: 760px) {
  .hero-layout { padding-top: 7.25rem; padding-bottom: 1.4rem; }
  .hero-heading { font-size: clamp(3.7rem, 7vw, 6rem); }
  .hero-capabilities { margin-top: 2rem; }
}

@media (max-width: 900px) {
  .hero-layout {
    display: flex;
    min-height: 100dvh;
    flex-direction: column;
    justify-content: center;
    padding-top: 8rem;
  }

  .hero-grid {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }

  .hero-heading {
    font-size: clamp(3.8rem, 16vw, 7rem);
    line-height: 0.8;
  }

  .hero-intro {
    max-width: 38rem;
  }

  .hero-capabilities { width: 100%; margin-top: 3rem; }
}

@media (max-width: 560px) {
  .hero-layout { padding: 7.25rem 1rem 1.5rem; }
  .hero-kicker { margin-bottom: 0.8rem; }
  .hero-heading { font-size: clamp(3.35rem, 17vw, 5.25rem); }
  .hero-grid { gap: 2rem; }
  .hero-intro > p { font-size: 1rem; }
  .hero-actions { width: 100%; }
  .hero-actions > * { width: 100%; }
  .hero-capabilities { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 0.75rem; }
  .hero-capabilities span:not(:first-child),
  .hero-capabilities span:last-child { text-align: left; }
}

@media (prefers-reduced-motion: reduce) {
  .wave {
    animation: none !important;
    transform: none;
  }
}
</style>
