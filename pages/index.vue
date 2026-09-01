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
          <div class="hero-copy">
            <h1 id="home-heading" class="hero-heading appear appear--mask" style="--d: 0.24s">
              Websites, properly built.
            </h1>

            <p class="hero-lede appear appear--soft" style="--d: 0.46s">
              Design and development from Nairobi.
            </p>

            <div class="hero-action appear appear--btn" style="--d: 0.62s">
              <UiLiquidButton to="/portfolio" external variant="metal" size="lg">
                View work
                <ArrowRight :size="17" aria-hidden="true" />
              </UiLiquidButton>
            </div>
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
  place-items: center;
  min-height: 100vh;
  min-height: 100dvh;
  padding: 8rem clamp(1.25rem, 5vw, 4.5rem) 4rem;
}

.hero-copy {
  display: flex;
  width: min(100%, 72rem);
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.hero-heading {
  max-width: 12ch;
  font-size: clamp(3.5rem, 8.6vw, 8.5rem);
  font-weight: 650;
  letter-spacing: -0.075em;
  line-height: 0.9;
  text-wrap: balance;
}

.hero-lede {
  margin-top: 1.5rem;
  color: #52525b;
  font-size: clamp(1rem, 1.25vw, 1.125rem);
  font-weight: 400;
  letter-spacing: -0.02em;
  line-height: 1.5;
  text-wrap: balance;
}

:global(.dark .hero-lede) {
  color: #a1a1aa;
}

.hero-action { margin-top: 2rem; }

@keyframes wave-drift-a {
  from { transform: translate3d(-2.5%, -10px, 0) rotate(-2deg) scaleX(1.02); }
  to { transform: translate3d(2.5%, 16px, 0) rotate(2deg) scaleX(0.98); }
}

@keyframes wave-drift-b {
  from { transform: translate3d(2%, 14px, 0) rotate(1.5deg) scaleX(0.99); }
  to { transform: translate3d(-2%, -14px, 0) rotate(-1.5deg) scaleX(1.02); }
}

@media (min-width: 1600px) {
  .hero-heading { font-size: 9rem; }
}

@media (min-width: 1920px) {
  .hero-heading { font-size: 10rem; }
}

@media (max-width: 900px) {
  .hero-heading {
    font-size: clamp(3.2rem, 14vw, 6rem);
    line-height: 0.94;
  }
}

@media (max-width: 560px) {
  .hero-layout { padding-inline: 1.1rem; }
  .hero-heading { max-width: 9ch; }
  .hero-lede { max-width: 19rem; font-size: 0.98rem; }
}

@media (prefers-reduced-motion: reduce) {
  .wave {
    animation: none !important;
    transform: none;
  }
}
</style>
