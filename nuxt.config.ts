export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  nitro: {
    preset: 'github_pages',
    prerender: {
      routes: ['/services', '/about', '/portfolio/projects', '/portfolio/stack'],
    },
  },
  modules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      title: 'SharlTech — High-End Web Design & Technology Solutions',
      meta: [
        {
          name: 'description',
          content:
            'SharlTech delivers premium web design, custom software, cloud hosting, SEO and AI integrations for ambitious businesses.',
        },
        { name: 'theme-color', content: '#ffffff' },
        { property: 'og:title', content: 'SharlTech — Built Beyond the Brief' },
        {
          property: 'og:description',
          content: 'Premium digital products, dependable cloud infrastructure and AI-powered growth systems.',
        },
        { property: 'og:type', content: 'website' },
      ],
      link: [
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png?v=1' },
        { rel: 'icon', type: 'image/png', sizes: '512x512', href: '/favicon.png?v=1' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png?v=1' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap',
        },
      ],
    },
  },
})
