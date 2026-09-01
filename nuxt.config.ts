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
      htmlAttrs: { lang: 'en-KE' },
      title: 'SharlTech | Custom Software & Technology Solutions Kenya',
      meta: [
        {
          name: 'description',
          content:
            'SharlTech builds custom software, web applications, cloud infrastructure, e-commerce platforms and AI automation for businesses in Kenya and beyond.',
        },
        { name: 'author', content: 'SharlTech' },
        { name: 'application-name', content: 'SharlTech' },
        { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
        { name: 'theme-color', content: '#000000' },
      ],
      link: [
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png?v=1' },
        { rel: 'icon', type: 'image/png', sizes: '512x512', href: '/favicon.png?v=1' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png?v=1' },
        { rel: 'manifest', href: '/site.webmanifest' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@1&family=Inter:wght@400;500;600;700;800&display=swap',
        },
      ],
    },
  },
})
