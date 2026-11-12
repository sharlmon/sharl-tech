// Words and numbers used across the personal site (everything under /chess).
export const V = '︎' // forces text (not emoji) glyphs on Apple devices

export const contact = {
  email: 'sharlmon19@gmail.com',
  github: 'https://github.com/sharlmon',
  linkedin: 'https://www.linkedin.com/in/sharlmon-junior-701746281',
  whatsapp: 'https://wa.me/254707575397?text=Hi%20Sharlmon%2C%20I%27d%20like%20to%20discuss%20a%20project.',
}

export const navLinks = [
  { label: 'Home', to: '/chess' },
  { label: 'What I do', to: '/chess/services' },
  { label: 'Work', to: '/chess/work' },
  { label: 'About', to: '/chess/about' },
  { label: 'Contact', to: '/chess/contact' },
]

export const services = [
  { title: 'Websites', text: 'Clear, fast websites that explain what you do and make it easy to get in touch.', examples: 'Premier Veg · Kilifi Creek Festival · The Terrace Kilifi' },
  { title: 'Business systems and apps', text: 'Custom software that runs the day-to-day: online stores, property management, planners and dashboards.', examples: 'Hodari Stores · Propflow · Weka' },
  { title: 'AI and automation', text: 'Remove repetitive work with AI tools, WhatsApp automations and smart summaries.', examples: 'Chat2Post AI · Kazi Smart' },
  { title: 'Hosting and security', text: 'Set up, secure and keep your systems running, so they are there when your customers need them.', examples: 'Seico · ASUDI infrastructure' },
]

export const steps = [
  { title: 'We talk', text: 'You tell me the problem. I ask questions until it is clear.' },
  { title: 'I plan', text: 'A simple plan with what will be built, how long it takes and what it costs.' },
  { title: 'I build', text: 'You see progress along the way, not only at the end.' },
  { title: 'Launch and support', text: 'I put it live, check that it works and stay around to improve it.' },
]

export const audiences = ['Local businesses', 'NGOs', 'Funded organisations', 'Other developers']

export const story = [
  { title: 'Aerospace Engineering', text: 'I started in aerospace engineering, a field that rewards precision and plans that do not fail quietly.' },
  { title: 'Moved into software', text: 'I switched to software development full-time and have not looked back.' },
  { title: 'Started SharlTech', text: 'My own company in Westlands, Nairobi, building websites, platforms and AI systems for organisations in Kenya and beyond.' },
  { title: 'Developer at ASUDI', text: 'Today I also work as a developer at ASUDI, where I build Seico, the company website and the public planner.' },
]

export const loves = [
  { glyph: '♞' + V, title: 'Chess', text: 'I play chess. It taught me to plan a few moves ahead and stay calm under pressure, which helps when a launch is tomorrow.' },
  { glyph: '⌘', title: 'Building real things', text: 'Systems that real people use: shops, planners, security tools and festival sites.' },
  { glyph: '✎', title: 'Design', text: 'Brand and interface work, because how a thing feels is part of whether it works.' },
]

export const tools = [
  { name: 'Websites and app screens', tools: ['React', 'Next.js', 'Vue 3', 'Nuxt 3 & 4', 'TypeScript', 'JavaScript', 'Tailwind CSS'] },
  { name: 'Servers and data', tools: ['Node.js', 'REST APIs', 'Medusa 2', 'Prisma ORM', 'Drizzle ORM', 'Supabase', 'PocketBase', 'PostgreSQL'] },
  { name: 'AI and automation', tools: ['AI/LLM integration', 'Multi-agent workflows', 'n8n', 'Webhooks', 'API-driven automation'] },
  { name: 'Hosting and delivery', tools: ['Git', 'GitHub Actions', 'Docker', 'Linux', 'Nginx', 'Plesk VPS', 'Vercel', 'GitHub Pages'] },
  { name: 'How it is built', tools: ['Multi-tenant SaaS', 'RBAC', 'Payment integrations', 'Service workers', 'Responsive web systems'] },
]

// Names shown in the footer and on the home page.
export const featuredNames = ['Seico', 'Hodari Stores', 'Premier Veg']
export const footerWork = [
  { label: 'Seico', href: 'https://seico.asudi.tech/' },
  { label: 'Hodari Stores', href: 'https://github.com/sharlmon/NewUpdatedHodari' },
  { label: 'Premier Veg', href: 'https://premierveg.com/' },
  { label: 'ASUDI Digital Services', href: 'https://asudi.tech/' },
]

// What the knight on the home page "lands on".
export const boardFacts = [
  'TypeScript', 'Nuxt', 'Vue', 'React', 'Next.js', 'Node.js', 'PostgreSQL', 'Medusa', 'Prisma', 'Supabase', 'Docker', 'Linux',
  'Nginx', 'n8n automation', 'Webhooks', 'AI agents', 'M-Pesa payments', 'Multi-tenant apps', 'Offline-first apps', 'GitHub Actions',
  'Seico', 'Hodari Stores', 'Kazi Smart', 'Tailwind CSS',
]
