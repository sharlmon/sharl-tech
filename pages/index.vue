<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next'

const { openProjectModal } = useProjectModal()

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
  <div class="min-h-screen overflow-x-hidden text-zinc-950 dark:text-zinc-50">
    <AppNavbar />

    <main id="top" class="relative z-10">
      <section class="home-hero" aria-labelledby="home-heading">
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
                <UiLiquidButton variant="metal" size="lg" aria-haspopup="dialog" aria-controls="project-modal" @click="openProjectModal">
                  Start a project
                  <ArrowRight :size="17" aria-hidden="true" />
                </UiLiquidButton>
                <UiLiquidButton to="/portfolio#projects" variant="light" size="lg">
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

      <section id="services" class="home-section" aria-labelledby="home-services-heading">
        <div class="section-heading-row">
          <div>
            <p class="section-number">01 / Services</p>
            <h2 id="home-services-heading">What we build.</h2>
          </div>
          <p class="section-intro">Focused technical work, from the first interface to the infrastructure behind it.</p>
        </div>

        <div class="service-list">
          <div><span>01</span><h3>Web applications</h3><p>Custom platforms shaped around your users and operations.</p></div>
          <div><span>02</span><h3>E-commerce</h3><p>Storefronts, payments and retail workflows built to fit the business.</p></div>
          <div><span>03</span><h3>Cloud infrastructure</h3><p>Hosting, deployment and production systems that remain dependable.</p></div>
          <div><span>04</span><h3>Automation</h3><p>Practical workflows that remove repetitive work and connect systems.</p></div>
        </div>

        <NuxtLink to="/services" class="section-link">View all services <ArrowRight :size="17" aria-hidden="true" /></NuxtLink>
      </section>

      <section id="work" class="home-section home-work" aria-labelledby="home-work-heading">
        <div class="section-heading-row">
          <div>
            <p class="section-number">02 / Work</p>
            <h2 id="home-work-heading">Selected systems.</h2>
          </div>
          <p class="section-intro">Products built across hiring, commerce, property, media and offline-first web.</p>
        </div>

        <div class="work-list">
          <NuxtLink to="/portfolio#projects" class="work-item">
            <span class="work-item__meta"><span>AI hiring platform</span><ArrowRight :size="17" aria-hidden="true" /></span>
            <strong>Kazi Smart</strong>
          </NuxtLink>
          <NuxtLink to="/portfolio#projects" class="work-item">
            <span class="work-item__meta"><span>Multi-tenant commerce</span><ArrowRight :size="17" aria-hidden="true" /></span>
            <strong>Hodari Stores</strong>
          </NuxtLink>
          <NuxtLink to="/portfolio#projects" class="work-item">
            <span class="work-item__meta"><span>Property software</span><ArrowRight :size="17" aria-hidden="true" /></span>
            <strong>Propflow &amp; FindYourKeja</strong>
          </NuxtLink>
        </div>

        <NuxtLink to="/portfolio#projects" class="section-link section-link--light">View selected work <ArrowRight :size="17" aria-hidden="true" /></NuxtLink>
      </section>

      <section id="about" class="home-section home-about" aria-labelledby="home-about-heading">
        <div>
          <p class="section-number">03 / About</p>
          <h2 id="home-about-heading">Built in Nairobi.<br>Ready for anywhere.</h2>
        </div>
        <div class="about-copy">
          <p>SharlTech is an independent technology company led by Sharlmon. Strategy, design, engineering and deployment stay under one accountable process.</p>
          <NuxtLink to="/about" class="section-link">About SharlTech <ArrowRight :size="17" aria-hidden="true" /></NuxtLink>
        </div>
      </section>

      <section class="home-contact" aria-labelledby="home-contact-heading">
        <p class="section-number">Start a project</p>
        <h2 id="home-contact-heading">Tell us what you need.</h2>
        <UiLiquidButton variant="metal" size="lg" aria-haspopup="dialog" aria-controls="project-modal" @click="openProjectModal">
          Build your project brief
          <ArrowRight :size="17" aria-hidden="true" />
        </UiLiquidButton>
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
  background: transparent;
  color: #18181b;
}

:global(.dark .home-hero) {
  color: #fafafa;
}

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
  font-size: clamp(3.75rem, 6.2vw, 6.5rem);
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

@media (min-width: 1600px) {
  .hero-layout { width: min(100%, 91rem); }
  .hero-heading { font-size: 7.2rem; }
}

@media (min-width: 1920px) {
  .hero-layout { width: min(100%, 102rem); }
  .hero-heading { font-size: 8rem; }
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
    font-size: clamp(3.4rem, 13vw, 5.6rem);
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
  .hero-heading { font-size: clamp(3rem, 14vw, 4.5rem); }
  .hero-grid { gap: 2rem; }
  .hero-intro > p { font-size: 1rem; }
  .hero-actions { width: 100%; }
  .hero-actions > * { width: 100%; }
  .hero-capabilities { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 0.75rem; }
  .hero-capabilities span:not(:first-child),
  .hero-capabilities span:last-child { text-align: left; }
}

.home-section {
  width: min(100%, 80rem);
  margin: 0 auto;
  padding: clamp(6rem, 10vw, 9rem) clamp(1.25rem, 4vw, 3rem);
}

.section-heading-row {
  display: grid;
  grid-template-columns: 1fr minmax(18rem, 0.45fr);
  align-items: end;
  gap: 3rem;
}

.section-number {
  margin-bottom: 1.1rem;
  color: #71717a;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.home-section h2,
.home-contact h2 {
  max-width: 12ch;
  font-size: clamp(3.25rem, 6.2vw, 6.5rem);
  font-weight: 720;
  letter-spacing: -0.075em;
  line-height: 0.9;
}

.section-intro,
.about-copy > p {
  color: #52525b;
  font-size: 1.05rem;
  line-height: 1.65;
}

.service-list {
  margin-top: 4.5rem;
  border-top: 1px solid #e4e4e7;
}

.service-list > div {
  display: grid;
  grid-template-columns: 3.5rem minmax(13rem, 0.7fr) 1fr;
  align-items: center;
  gap: 1.5rem;
  padding: 1.65rem 0;
  border-bottom: 1px solid #e4e4e7;
}

.service-list span,
.work-item__meta {
  color: #a1a1aa;
  font-size: 0.72rem;
  font-weight: 650;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.service-list h3 {
  font-size: clamp(1.35rem, 2.2vw, 2rem);
  font-weight: 700;
  letter-spacing: -0.04em;
}

.service-list p {
  color: #71717a;
  line-height: 1.55;
}

.section-link {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  margin-top: 2.5rem;
  padding-bottom: 0.25rem;
  border-bottom: 1px solid currentColor;
  font-size: 0.86rem;
  font-weight: 700;
}

.home-work {
  width: min(calc(100% - 2rem), 80rem);
  padding: clamp(2.75rem, 5vw, 4.25rem) clamp(1.25rem, 4vw, 3.5rem);
  border-radius: 1.5rem;
  background: #09090b;
  color: #fafafa;
}

.home-work .section-heading-row {
  align-items: start;
  gap: clamp(1.5rem, 4vw, 3rem);
}

.home-work h2 {
  max-width: 10ch;
  font-size: clamp(2.75rem, 4.8vw, 4.75rem);
}

.home-work .section-intro {
  max-width: 27rem;
  color: #a1a1aa;
  font-size: 0.95rem;
  line-height: 1.55;
}

.work-list {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.65rem;
  margin-top: 2.75rem;
}

.work-item {
  display: flex;
  min-height: 10.5rem;
  padding: 1.1rem;
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 1rem;
  background: rgba(255, 255, 255, 0.025);
  flex-direction: column;
  align-items: flex-start;
  transition: color 180ms ease, border-color 180ms ease, background-color 180ms ease, transform 180ms ease;
}

.work-item__meta {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.work-item__meta svg {
  flex: 0 0 auto;
  transition: transform 180ms ease;
}

.work-item strong {
  margin-top: auto;
  font-size: clamp(1.3rem, 2.2vw, 2rem);
  letter-spacing: -0.045em;
  line-height: 1.05;
}

.work-item:hover {
  color: #a7f3d0;
  border-color: rgba(167, 243, 208, 0.42);
  background: rgba(255, 255, 255, 0.055);
  transform: translateY(-2px);
}

.work-item:hover .work-item__meta svg { transform: translateX(3px); }
.work-item:focus-visible { outline: 2px solid #a7f3d0; outline-offset: 3px; }

.home-work .section-link { margin-top: 1.8rem; }

.section-link--light { color: #fafafa; }

.home-about {
  display: grid;
  grid-template-columns: 1fr minmax(18rem, 0.48fr);
  align-items: end;
  gap: clamp(3rem, 8vw, 8rem);
}

.home-about h2 { max-width: 11ch; }

.home-contact {
  display: flex;
  width: min(calc(100% - 2rem), 80rem);
  margin: 0 auto 1rem;
  padding: clamp(4rem, 8vw, 6.5rem);
  border: 1px solid #e4e4e7;
  border-radius: 2rem;
  flex-direction: column;
  align-items: flex-start;
}

.home-contact > :last-child { margin-top: 2.5rem; }

:global(.dark .section-number),
:global(.dark .section-intro),
:global(.dark .about-copy > p),
:global(.dark .service-list p) {
  color: #a1a1aa;
}

:global(.dark .service-list),
:global(.dark .service-list > div),
:global(.dark .home-contact) {
  border-color: #3f3f46;
}

@media (max-width: 800px) {
  .section-heading-row,
  .home-about {
    grid-template-columns: 1fr;
    align-items: start;
    gap: 2rem;
  }

  .service-list > div {
    grid-template-columns: 2.25rem 1fr;
    gap: 1rem;
  }

  .service-list p {
    grid-column: 2;
  }

  .work-list { grid-template-columns: 1fr; }

  .work-item { min-height: 7.5rem; }
}

@media (max-width: 560px) {
  .home-section { padding-block: 5rem; }
  .home-section h2,
  .home-contact h2 { font-size: clamp(2.8rem, 14vw, 4.25rem); }
  .service-list { margin-top: 3rem; }
  .home-work,
  .home-contact { width: calc(100% - 1rem); border-radius: 1.25rem; }
  .home-work { padding: 2.5rem 1rem; }
  .home-work h2 { font-size: clamp(2.55rem, 13vw, 3.5rem); }
  .work-list { margin-top: 2rem; }
  .home-contact { padding: 3.5rem 1.25rem; }
}

@media (prefers-reduced-motion: reduce) {
  .work-item,
  .work-item__meta svg { transition: none; }

  .work-item:hover { transform: none; }
}
</style>
