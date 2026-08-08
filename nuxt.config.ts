export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
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
        { name: 'theme-color', content: '#09090b' },
        { property: 'og:title', content: 'SharlTech — Built Beyond the Brief' },
        {
          property: 'og:description',
          content: 'Premium digital products, dependable cloud infrastructure and AI-powered growth systems.',
        },
        { property: 'og:type', content: 'website' },
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap',
        },
      ],
      script: [
        {
          innerHTML:
            "try{const t=localStorage.getItem('sharltech-theme');const d=t==='dark'||(!t&&matchMedia('(prefers-color-scheme:dark)').matches);document.documentElement.classList.toggle('dark',d)}catch(e){}",
          tagPosition: 'head',
        },
      ],
    },
  },
  runtimeConfig: {
    mpesaConsumerKey: process.env.MPESA_CONSUMER_KEY,
    mpesaConsumerSecret: process.env.MPESA_CONSUMER_SECRET,
    mpesaShortcode: process.env.MPESA_SHORTCODE,
    mpesaPasskey: process.env.MPESA_PASSKEY,
    mpesaCallbackUrl: process.env.MPESA_CALLBACK_URL,
    mpesaEnvironment: process.env.MPESA_ENVIRONMENT || 'sandbox',
  },
})
