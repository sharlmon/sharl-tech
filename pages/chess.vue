<script setup lang="ts">
import { projects } from '~/data/projects'

const { openProjectModal } = useProjectModal()

useSeoMeta({
  title: 'Sharlmon | Software engineer in Nairobi',
  description: 'Sharlmon builds websites, business systems and automation for organisations in Kenya and beyond. Based in Nairobi. Plays chess in the spare time.',
  robots: 'noindex, nofollow',
})

useHead({
  link: [
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@500;600;700&family=Space+Grotesk:wght@400;500;600&display=swap' },
  ],
})

/* ------------------------------------------------------------------ the hero board (the one chess flourish) */
type Piece = { glyph: string, side: 'w' | 'b', x: number, y: number }
const FILES = 'abcdefgh'
const V = '︎' // forces text (not emoji) glyphs on Apple devices

const staticPieces: Piece[] = [
  { glyph: '♜' + V, side: 'b', x: 0, y: 0 }, { glyph: '♚' + V, side: 'b', x: 4, y: 0 }, { glyph: '♝' + V, side: 'b', x: 5, y: 0 },
  { glyph: '♟' + V, side: 'b', x: 1, y: 1 }, { glyph: '♟' + V, side: 'b', x: 4, y: 1 }, { glyph: '♟' + V, side: 'b', x: 6, y: 1 },
  { glyph: '♛' + V, side: 'b', x: 3, y: 2 }, { glyph: '♞' + V, side: 'b', x: 6, y: 3 },
  { glyph: '♟' + V, side: 'w', x: 2, y: 5 }, { glyph: '♟' + V, side: 'w', x: 5, y: 5 }, { glyph: '♟' + V, side: 'w', x: 7, y: 5 },
  { glyph: '♝' + V, side: 'w', x: 2, y: 4 }, { glyph: '♛' + V, side: 'w', x: 3, y: 6 }, { glyph: '♜' + V, side: 'w', x: 0, y: 7 },
  { glyph: '♚' + V, side: 'w', x: 4, y: 7 },
]
const occupied = new Set(staticPieces.map(p => `${p.x},${p.y}`))

const facts = [
  'TypeScript', 'Nuxt', 'Vue', 'React', 'Next.js', 'Node.js', 'PostgreSQL', 'Medusa', 'Prisma', 'Supabase', 'Docker', 'Linux',
  'Nginx', 'n8n automation', 'Webhooks', 'AI agents', 'M-Pesa payments', 'Multi-tenant apps', 'Offline-first apps', 'GitHub Actions',
  'Seico', 'Hodari Stores', 'Kazi Smart', 'Tailwind CSS',
]
const factFor = (x: number, y: number) => facts[(x * 3 + y * 5 + x * y) % facts.length]
const square = (x: number, y: number) => `${FILES[x]}${8 - y}`

const knight = reactive({ x: 6, y: 7 })
const lastFact = ref('Tap a glowing square')
const autoplay = ref(true)
const reduceMotion = ref(false)
let timer: ReturnType<typeof setInterval> | undefined
let paused = false

const jumps = [[1, 2], [2, 1], [2, -1], [1, -2], [-1, -2], [-2, -1], [-2, 1], [-1, 2]]
const legal = computed(() => jumps
  .map(([dx, dy]) => ({ x: knight.x + dx, y: knight.y + dy }))
  .filter(({ x, y }) => x >= 0 && x < 8 && y >= 0 && y < 8 && !occupied.has(`${x},${y}`)))
const isLegal = (x: number, y: number) => legal.value.some(m => m.x === x && m.y === y)

function hop(x: number, y: number) {
  knight.x = x
  knight.y = y
  lastFact.value = factFor(x, y)
}

function autoMove() {
  if (!autoplay.value || paused) return
  const options = legal.value
  const pick = options[Math.floor(Math.random() * options.length)]
  if (pick) hop(pick.x, pick.y)
}

function userHop(x: number, y: number) {
  hop(x, y)
  paused = true
  setTimeout(() => { paused = false }, 5000)
}

onMounted(() => {
  reduceMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduceMotion.value) autoplay.value = false
  timer = setInterval(autoMove, 2300)
})
onBeforeUnmount(() => timer && clearInterval(timer))

/* ------------------------------------------------------------------ copy */
const countBuilds = (kind: string) => projects.filter(project => project.kind === kind).reduce((total, project) => total + (project.count ?? 1), 0)
const systemsBuilt = countBuilds('system')
const websitesBuilt = countBuilds('website')

const services = [
  { title: 'Websites', text: 'Clear, fast websites that explain what you do and make it easy to get in touch.', examples: 'Premier Veg · Kilifi Creek Festival · The Terrace Kilifi' },
  { title: 'Business systems and apps', text: 'Custom software that runs the day-to-day: online stores, property management, planners and dashboards.', examples: 'Hodari Stores · Propflow · Weka' },
  { title: 'AI and automation', text: 'Remove repetitive work with AI tools, WhatsApp automations and smart summaries.', examples: 'Chat2Post AI · Kazi Smart' },
  { title: 'Hosting and security', text: 'Set up, secure and keep your systems running, so they are there when your customers need them.', examples: 'Seico · ASUDI infrastructure' },
]

const steps = [
  { title: 'We talk', text: 'You tell me the problem. I ask questions until it is clear.' },
  { title: 'I plan', text: 'A simple plan with what will be built, how long it takes and what it costs.' },
  { title: 'I build', text: 'You see progress along the way, not only at the end.' },
  { title: 'Launch and support', text: 'I put it live, check that it works and stay around to improve it.' },
]

const story = [
  { title: 'Aerospace Engineering', text: 'I started in aerospace engineering, a field that rewards precision and plans that do not fail quietly.' },
  { title: 'Moved into software', text: 'I switched to software development full-time and have not looked back.' },
  { title: 'Started SharlTech', text: 'My own company in Westlands, Nairobi, building websites, platforms and AI systems for organisations in Kenya and beyond.' },
  { title: 'Developer at ASUDI', text: 'Today I also work as a developer at ASUDI, where I build Seico, the company website and the public planner.' },
]

const loves = [
  { glyph: '♞' + V, title: 'Chess', text: 'I play chess. It taught me to plan a few moves ahead and stay calm under pressure, which helps when a launch is tomorrow.' },
  { glyph: '⌘', title: 'Building real things', text: 'Systems that real people use: shops, planners, security tools and festival sites.' },
  { glyph: '✎', title: 'Design', text: 'Brand and interface work, because how a thing feels is part of whether it works.' },
]

const workGroups = [
  { title: 'Systems and platforms', glyph: '♛' + V, text: 'Software that businesses and organisations run on.', items: projects.filter(project => project.kind === 'system'), count: systemsBuilt },
  { title: 'Websites', glyph: '♟' + V, text: 'Sites that tell a story and bring in enquiries.', items: projects.filter(project => project.kind === 'website'), count: websitesBuilt },
  { title: 'Brand and identity', glyph: '♝' + V, text: 'Logos and visual identity.', items: projects.filter(project => project.kind === 'identity'), count: countBuilds('identity') },
]

const tools = [
  { name: 'Websites and app screens', tools: ['React', 'Next.js', 'Vue 3', 'Nuxt 3 & 4', 'TypeScript', 'JavaScript', 'Tailwind CSS'] },
  { name: 'Servers and data', tools: ['Node.js', 'REST APIs', 'Medusa 2', 'Prisma ORM', 'Drizzle ORM', 'Supabase', 'PocketBase', 'PostgreSQL'] },
  { name: 'AI and automation', tools: ['AI/LLM integration', 'Multi-agent workflows', 'n8n', 'Webhooks', 'API-driven automation'] },
  { name: 'Hosting and delivery', tools: ['Git', 'GitHub Actions', 'Docker', 'Linux', 'Nginx', 'Plesk VPS', 'Vercel', 'GitHub Pages'] },
  { name: 'How it is built', tools: ['Multi-tenant SaaS', 'RBAC', 'Payment integrations', 'Service workers', 'Responsive web systems'] },
]

const whatsappUrl = 'https://wa.me/254707575397?text=Hi%20Sharlmon%2C%20I%27d%20like%20to%20discuss%20a%20project.'
</script>

<template>
  <div class="page">
    <a href="#main" class="page__skip">Skip to content</a>

    <header class="nav">
      <a href="#top" class="nav__brand" aria-label="Sharlmon, back to top">
        <span class="nav__tile">SM</span>
        <span class="nav__name">Sharlmon</span>
      </a>
      <nav class="nav__links" aria-label="Sections">
        <a href="#services">What I do</a>
        <a href="#work">Work</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
      </nav>
      <button type="button" class="btn btn--small" aria-haspopup="dialog" aria-controls="project-modal" @click="openProjectModal">Start a project</button>
    </header>

    <main id="main">
      <!-- HERO -->
      <section id="top" class="hero">
        <div class="hero__copy">
          <p class="eyebrow">Software engineer · Nairobi, Kenya</p>
          <h1 class="hero__title">I build <em>websites and software</em> that help organisations run better.</h1>
          <p class="hero__lead">
            Hi, I'm Sharlmon. I make websites, online systems and automations for businesses, NGOs and organisations across Kenya and beyond. In my spare time, I play chess.
          </p>
          <div class="hero__actions">
            <a href="#work" class="btn">See my work</a>
            <a :href="whatsappUrl" class="btn btn--ghost" target="_blank" rel="noopener noreferrer">Chat on WhatsApp ↗</a>
          </div>
          <ul class="stats" aria-label="At a glance">
            <li><strong>{{ systemsBuilt }}</strong> systems built</li>
            <li><strong>{{ websitesBuilt }}</strong> websites launched</li>
            <li><strong>Kenya</strong> and beyond</li>
          </ul>
        </div>

        <div class="board-wrap">
          <div class="board" role="img" aria-label="A decorative chessboard with a knight hopping between squares. Each square it lands on names one of my tools.">
            <div v-for="i in 64" :key="i" class="sq" :class="((i - 1) % 8 + Math.floor((i - 1) / 8)) % 2 ? 'sq--dark' : 'sq--light'">
              <button
                v-if="isLegal((i - 1) % 8, Math.floor((i - 1) / 8))"
                type="button"
                class="sq__go"
                :aria-label="`Move the knight to ${square((i - 1) % 8, Math.floor((i - 1) / 8))}: ${factFor((i - 1) % 8, Math.floor((i - 1) / 8))}`"
                @click="userHop((i - 1) % 8, Math.floor((i - 1) / 8))"
              />
            </div>
            <div class="pieces" aria-hidden="true">
              <span v-for="(p, idx) in staticPieces" :key="idx" class="piece" :class="p.side === 'w' ? 'piece--w' : 'piece--b'" :style="{ '--x': p.x, '--y': p.y }">{{ p.glyph }}</span>
              <span class="piece piece--w piece--knight" :style="{ '--x': knight.x, '--y': knight.y }">♞&#xFE0E;</span>
            </div>
          </div>
          <div class="board-caption" aria-live="polite">
            <span class="board-caption__label">Tool the knight landed on</span>
            <span class="board-caption__fact">{{ lastFact }}</span>
          </div>
          <div class="board-tools">
            <p>Fun fact: I play chess. Tap a glowing square to move the knight.</p>
            <button type="button" class="chip-btn" :aria-pressed="autoplay" @click="autoplay = !autoplay">{{ autoplay ? 'Pause' : 'Play' }}</button>
          </div>
        </div>
      </section>

      <!-- WHAT I DO -->
      <section id="services" class="section">
        <p class="kicker">What I do</p>
        <h2 class="title">Four things, done properly.</h2>
        <p class="section__lead">Whatever size your organisation is, the work usually falls into one of these.</p>
        <div class="services">
          <article v-for="(service, index) in services" :key="service.title" class="service">
            <span class="service__no" aria-hidden="true">0{{ index + 1 }}</span>
            <h3>{{ service.title }}</h3>
            <p>{{ service.text }}</p>
            <p class="service__examples"><span>Examples:</span> {{ service.examples }}</p>
          </article>
        </div>

        <div class="process">
          <h3 class="sub">How we work together</h3>
          <ol class="steps">
            <li v-for="(step, index) in steps" :key="step.title">
              <span class="steps__no">{{ index + 1 }}</span>
              <div><h4>{{ step.title }}</h4><p>{{ step.text }}</p></div>
            </li>
          </ol>
          <p class="who">Working with a local business, an NGO, a funded organisation or another developer? All welcome.</p>
        </div>
      </section>

      <!-- WORK -->
      <section id="work" class="section section--tint">
        <p class="kicker">Work</p>
        <h2 class="title">Things I've built.</h2>
        <p class="section__lead">{{ systemsBuilt }} systems and {{ websitesBuilt }} websites so far. Click any card to see it live or on GitHub.</p>

        <div v-for="group in workGroups" :key="group.title" class="group">
          <header class="group__head">
            <span class="group__glyph" aria-hidden="true">{{ group.glyph }}</span>
            <div>
              <h3>{{ group.title }} <span class="group__count">{{ group.count }}</span></h3>
              <p>{{ group.text }}</p>
            </div>
          </header>
          <div class="cards">
            <article v-for="project in group.items" :key="project.name" class="card">
              <p class="card__type">{{ project.type }}</p>
              <h4>{{ project.name }}</h4>
              <p class="card__text">{{ project.description }}</p>
              <ul class="tags">
                <li v-for="tag in project.tags" :key="tag">{{ tag }}</li>
              </ul>
              <a v-if="project.url" :href="project.url" class="card__link" target="_blank" rel="noopener noreferrer" :aria-label="`View ${project.name} live (opens in a new tab)`">View live ↗</a>
              <span v-else-if="project.repos?.length" class="card__links">
                <a v-for="repo in project.repos" :key="repo.url" :href="repo.url" class="card__link" target="_blank" rel="noopener noreferrer" :aria-label="`View ${repo.label} on GitHub (opens in a new tab)`">{{ project.repos.length > 1 ? repo.label : 'GitHub' }} ↗</a>
              </span>
            </article>
          </div>
        </div>
      </section>

      <!-- ABOUT -->
      <section id="about" class="section">
        <p class="kicker">About me</p>
        <h2 class="title">From aerospace to software.</h2>
        <ol class="story">
          <li v-for="(item, index) in story" :key="item.title">
            <span class="story__no">{{ index + 1 }}</span>
            <div><h3>{{ item.title }}</h3><p>{{ item.text }}</p></div>
          </li>
        </ol>

        <h3 class="sub">Beyond the code</h3>
        <div class="loves">
          <article v-for="love in loves" :key="love.title" class="love">
            <span class="love__glyph" aria-hidden="true">{{ love.glyph }}</span>
            <h4>{{ love.title }}</h4>
            <p>{{ love.text }}</p>
          </article>
        </div>

        <h3 class="sub">Tools I work with</h3>
        <div class="tools">
          <div v-for="group in tools" :key="group.name" class="tools__row">
            <p>{{ group.name }}</p>
            <ul class="tags">
              <li v-for="tool in group.tools" :key="tool">{{ tool }}</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- CONTACT -->
      <section id="contact" class="section contact">
        <p class="kicker">Contact</p>
        <h2 class="contact__big">Got a problem to solve?</h2>
        <p class="section__lead">Tell me what you are trying to build or fix. I reply quickly, and the first conversation is free.</p>
        <div class="hero__actions">
          <a :href="whatsappUrl" class="btn btn--accent" target="_blank" rel="noopener noreferrer">Chat on WhatsApp ↗</a>
          <button type="button" class="btn" aria-haspopup="dialog" aria-controls="project-modal" @click="openProjectModal">Plan a project</button>
          <a href="mailto:sharlmon19@gmail.com" class="btn btn--ghost">Email me</a>
        </div>
        <p class="contact__links">
          <a href="https://github.com/sharlmon" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
          <a href="https://www.linkedin.com/in/sharlmon-junior-701746281" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
          <NuxtLink to="/portfolio">Classic portfolio</NuxtLink>
        </p>
      </section>
    </main>

    <footer class="foot">
      <p>© {{ new Date().getFullYear() }} Sharlmon · SharlTech. Built in Nairobi.</p>
    </footer>
  </div>
</template>

<style scoped>
.page {
  --ink: #0d0f0e;
  --panel: #151816;
  --tint: #111412;
  --line: #262b27;
  --ivory: #f4f2ea;
  --muted: #a3aa9f;
  --accent: #9fcb6e;
  --sq-light: #ebecd0;
  --sq-dark: #739552;
  min-height: 100vh;
  background: var(--ink);
  color: var(--ivory);
  font-family: 'Space Grotesk', 'Inter', system-ui, sans-serif;
  line-height: 1.65;
  overflow-x: clip;
}

.page a { color: inherit; text-decoration: none; }
.page h1, .page h2, .page h3, .page h4 { font-family: 'Chakra Petch', 'Inter', sans-serif; margin: 0; line-height: 1.1; }
.sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
.page__skip { position: absolute; left: 1rem; top: -4rem; z-index: 100; padding: 0.6rem 1rem; border-radius: 0.5rem; background: var(--ivory); color: var(--ink); font-weight: 700; }
.page__skip:focus { top: 1rem; }
.page :focus-visible { outline: 3px solid var(--accent); outline-offset: 3px; border-radius: 0.4rem; }

/* --- nav --- */
.nav { position: sticky; top: 0; z-index: 30; display: flex; align-items: center; justify-content: space-between; gap: 1rem; padding: 0.75rem clamp(1rem, 4vw, 3rem); background: rgba(13, 15, 14, 0.85); backdrop-filter: blur(14px); border-bottom: 1px solid var(--line); }
.nav__brand { display: flex; align-items: center; gap: 0.7rem; font: 700 1rem 'Chakra Petch', sans-serif; letter-spacing: 0.04em; }
.nav__tile { display: grid; place-items: center; width: 2.4rem; height: 2.4rem; border-radius: 0.6rem; background: var(--sq-dark); color: #fff; font-size: 0.9rem; box-shadow: inset 0 0 0 2px var(--sq-light); }
.nav__links { display: flex; gap: clamp(1rem, 2.5vw, 2.2rem); color: var(--muted); font-size: 0.95rem; }
.nav__links a { padding: 0.4rem 0.1rem; transition: color 160ms; }
.nav__links a:hover { color: var(--ivory); }

/* --- buttons --- */
.btn { display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem; min-height: 3rem; padding: 0.75rem 1.4rem; border: 2px solid var(--ivory); border-radius: 0.7rem; background: var(--ivory); color: var(--ink) !important; font: 700 0.95rem 'Chakra Petch', sans-serif; letter-spacing: 0.03em; cursor: pointer; transition: transform 160ms, background 160ms, border-color 160ms; }
.btn:hover { transform: translateY(-2px); }
.btn--ghost { background: transparent; color: var(--ivory) !important; border-color: #4a504a; }
.btn--ghost:hover { border-color: var(--ivory); }
.btn--accent { background: var(--accent); border-color: var(--accent); }
.btn--small { min-height: 2.4rem; padding: 0.4rem 1rem; font-size: 0.85rem; }

/* --- hero --- */
.hero { display: grid; grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr); gap: clamp(2rem, 5vw, 4.5rem); align-items: center; max-width: 80rem; margin: 0 auto; padding: clamp(2.5rem, 6vw, 5rem) clamp(1rem, 4vw, 3rem); }
.eyebrow, .kicker { margin: 0 0 1.1rem; color: var(--accent); font-size: 0.82rem; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; }
.hero__title { font-size: clamp(2.2rem, 5.2vw, 4.2rem); font-weight: 700; letter-spacing: -0.015em; }
.hero__title em { font-style: normal; color: var(--accent); }
.hero__lead { max-width: 36rem; margin: 1.5rem 0 0; color: var(--muted); font-size: clamp(1.02rem, 1.5vw, 1.2rem); }
.hero__actions { display: flex; flex-wrap: wrap; gap: 0.9rem; margin-top: 2rem; }
.stats { display: flex; flex-wrap: wrap; gap: 0.6rem 1.8rem; margin: 2.2rem 0 0; padding: 0; list-style: none; color: var(--muted); font-size: 0.92rem; }
.stats strong { margin-right: 0.3rem; color: var(--ivory); font: 700 1.5rem 'Chakra Petch', sans-serif; }

/* --- the board --- */
.board-wrap { width: min(100%, 30rem); justify-self: center; }
.board { position: relative; display: grid; grid-template-columns: repeat(8, 1fr); aspect-ratio: 1; border: 5px solid #232622; border-radius: 0.8rem; overflow: hidden; box-shadow: 0 24px 60px rgba(0, 0, 0, 0.5); }
.sq { position: relative; }
.sq--light { background: var(--sq-light); }
.sq--dark { background: var(--sq-dark); }
.sq__go { position: absolute; inset: 0; z-index: 3; display: grid; place-items: center; border: 0; background: transparent; cursor: pointer; }
.sq__go::before { content: ''; width: 30%; height: 30%; border-radius: 50%; background: rgba(13, 15, 14, 0.3); animation: ping 2s ease-out infinite; transition: transform 160ms, background 160ms; }
.sq__go:hover::before { transform: scale(1.5); background: var(--ivory); }
.pieces { position: absolute; inset: 0; pointer-events: none; }
.piece { position: absolute; top: 0; left: 0; display: grid; place-items: center; width: 12.5%; height: 12.5%; font-family: 'Noto Sans Symbols 2', 'Segoe UI Symbol', 'Apple Symbols', 'DejaVu Sans', sans-serif; font-size: clamp(1.6rem, 5.6vw, 2.7rem); line-height: 1; transform: translate(calc(var(--x) * 100%), calc(var(--y) * 100%)); z-index: 2; }
.piece--w { color: #fffdf4; -webkit-text-stroke: 1.2px #14150f; text-shadow: 0 3px 4px rgba(0, 0, 0, 0.3); }
.piece--b { color: #16170f; -webkit-text-stroke: 0.6px #f3f0e4; text-shadow: 0 3px 4px rgba(0, 0, 0, 0.3); }
.piece--knight { z-index: 4; filter: drop-shadow(0 0 9px rgba(159, 203, 110, 0.95)); transition: transform 620ms cubic-bezier(0.3, 1.5, 0.5, 1); }
.board-caption { display: flex; flex-direction: column; gap: 0.15rem; margin-top: 0.9rem; padding: 0.75rem 1rem; border: 1px solid var(--line); border-radius: 0.7rem; background: var(--panel); }
.board-caption__label { color: var(--muted); font-size: 0.74rem; letter-spacing: 0.1em; text-transform: uppercase; }
.board-caption__fact { font: 600 1.15rem 'Chakra Petch', sans-serif; }
.board-tools { display: flex; align-items: center; justify-content: space-between; gap: 1rem; margin-top: 0.8rem; color: var(--muted); font-size: 0.82rem; }
.board-tools p { margin: 0; }
.chip-btn { flex: none; padding: 0.4rem 0.9rem; border: 1px solid var(--line); border-radius: 999px; background: var(--panel); color: var(--ivory); font: 600 0.8rem 'Space Grotesk', sans-serif; cursor: pointer; }
.chip-btn:hover { border-color: var(--accent); }

@keyframes ping { 0% { box-shadow: 0 0 0 0 rgba(244, 242, 234, 0.6); } 70%, 100% { box-shadow: 0 0 0 0.75rem rgba(244, 242, 234, 0); } }

/* --- sections --- */
.section { max-width: 80rem; margin: 0 auto; padding: clamp(3rem, 8vw, 6rem) clamp(1rem, 4vw, 3rem); scroll-margin-top: 4rem; }
.section--tint { max-width: none; background: var(--tint); border-block: 1px solid var(--line); }
.section--tint > * { max-width: 74rem; margin-left: auto; margin-right: auto; }
.title { font-size: clamp(2rem, 4.6vw, 3.4rem); font-weight: 700; letter-spacing: -0.01em; }
.section__lead { max-width: 40rem; margin: 1rem 0 0; color: var(--muted); font-size: 1.1rem; }
.sub { margin: 3.2rem 0 1.2rem; font-size: 1.5rem; }

/* services */
.services { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin-top: 2.4rem; }
.service { padding: 1.7rem; border: 1px solid var(--line); border-radius: 1rem; background: var(--panel); }
.service__no { color: var(--accent); font: 700 0.95rem 'Chakra Petch', sans-serif; letter-spacing: 0.1em; }
.service h3 { margin: 0.6rem 0 0.5rem; font-size: 1.55rem; }
.service p { margin: 0; color: var(--muted); }
.service__examples { margin-top: 1rem !important; font-size: 0.88rem; }
.service__examples span { color: var(--ivory); font-weight: 600; }
.steps { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; margin: 0; padding: 0; list-style: none; }
.steps li { display: flex; gap: 0.9rem; padding: 1.2rem; border-top: 2px solid var(--accent); background: var(--panel); border-radius: 0 0 0.8rem 0.8rem; }
.steps__no { color: var(--accent); font: 700 1.6rem/1 'Chakra Petch', sans-serif; }
.steps h4 { font-size: 1.1rem; }
.steps p { margin: 0.35rem 0 0; color: var(--muted); font-size: 0.92rem; }
.process { margin-top: 1rem; }
.who { margin: 1.6rem 0 0; color: var(--muted); }

/* work */
.group { margin-top: 3rem; }
.group__head { display: flex; align-items: center; gap: 1.1rem; margin-bottom: 1.1rem; }
.group__glyph { display: grid; place-items: center; width: 3.4rem; height: 3.4rem; flex: none; border-radius: 0.8rem; background: var(--sq-light); color: #14150f; font: 400 2.2rem 'Noto Sans Symbols 2', 'Segoe UI Symbol', 'Apple Symbols', 'DejaVu Sans', sans-serif; box-shadow: inset 0 0 0 3px var(--sq-dark); }
.group__head h3 { font-size: 1.7rem; }
.group__count { margin-left: 0.4rem; padding: 0.1rem 0.6rem; border-radius: 999px; background: var(--line); color: var(--ivory); font-size: 0.95rem; vertical-align: middle; }
.group__head p { margin: 0.2rem 0 0; color: var(--muted); }
.cards { display: grid; grid-template-columns: repeat(auto-fill, minmax(17rem, 1fr)); gap: 1rem; }
.card { display: flex; flex-direction: column; padding: 1.4rem; border: 1px solid var(--line); border-radius: 1rem; background: var(--panel); transition: transform 180ms, border-color 180ms; }
.card:hover { transform: translateY(-4px); border-color: var(--accent); }
.card__type { margin: 0 0 0.5rem; color: var(--accent); font: 600 0.72rem 'Space Grotesk', sans-serif; letter-spacing: 0.14em; text-transform: uppercase; }
.card h4 { font-size: 1.4rem; }
.card__text { flex: 1; margin: 0.6rem 0 0; color: var(--muted); font-size: 0.95rem; }
.card__link { display: inline-block; align-self: flex-start; margin: 1rem 1.2rem 0 0; padding-bottom: 0.1rem; border-bottom: 2px solid var(--accent); font: 700 0.85rem 'Chakra Petch', sans-serif; letter-spacing: 0.05em; text-transform: uppercase; }
.card__link:hover { color: var(--accent); }
.card__links { display: flex; flex-wrap: wrap; align-self: flex-start; gap: 0 1.2rem; }
.card__links .card__link { margin-right: 0; }

.tags { display: flex; flex-wrap: wrap; gap: 0.45rem; margin: 1rem 0 0; padding: 0; list-style: none; }
.tags li { padding: 0.25rem 0.7rem; border: 1px solid var(--line); border-radius: 999px; background: #0f1210; color: #d6d9cf; font: 500 0.78rem 'Space Grotesk', sans-serif; }

/* about */
.story { display: grid; gap: 0.9rem; margin: 2.4rem 0 0; padding: 0; list-style: none; max-width: 52rem; }
.story li { display: flex; gap: 1.2rem; padding: 1.3rem 1.5rem; border: 1px solid var(--line); border-left: 3px solid var(--accent); border-radius: 0.9rem; background: var(--panel); }
.story__no { color: var(--accent); font: 700 1.5rem/1 'Chakra Petch', sans-serif; }
.story h3 { font-size: 1.3rem; }
.story p { margin: 0.4rem 0 0; color: var(--muted); }
.loves { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }
.love { padding: 1.5rem; border: 1px solid var(--line); border-radius: 1rem; background: var(--panel); }
.love__glyph { display: grid; place-items: center; width: 3rem; height: 3rem; border-radius: 0.7rem; background: var(--line); color: var(--accent); font: 400 1.6rem 'Noto Sans Symbols 2', 'Segoe UI Symbol', 'Apple Symbols', 'DejaVu Sans', sans-serif; }
.love h4 { margin: 1rem 0 0.4rem; font-size: 1.25rem; }
.love p { margin: 0; color: var(--muted); font-size: 0.95rem; }
.tools { display: grid; gap: 0.2rem; }
.tools__row { display: grid; grid-template-columns: 13rem 1fr; gap: 1rem; align-items: start; padding: 1rem 0; border-top: 1px solid var(--line); }
.tools__row p { margin: 0.2rem 0 0; font: 600 1rem 'Chakra Petch', sans-serif; }
.tools__row .tags { margin: 0; }

/* contact */
.contact { text-align: center; }
.contact__big { margin: 0.5rem 0 0; font: 700 clamp(2.6rem, 8vw, 5.4rem)/1 'Chakra Petch', sans-serif; letter-spacing: -0.015em; }
.contact .section__lead { margin-left: auto; margin-right: auto; }
.contact .hero__actions { justify-content: center; }
.contact__links { display: flex; justify-content: center; gap: 1.6rem; margin: 2.2rem 0 0; color: var(--muted); font-weight: 600; }
.contact__links a:hover { color: var(--accent); }
.foot { padding: 2rem clamp(1rem, 4vw, 3rem) 6rem; border-top: 1px solid var(--line); color: var(--muted); font-size: 0.85rem; text-align: center; }
.foot p { margin: 0; }

/* responsive */
@media (max-width: 62rem) {
  .hero { grid-template-columns: 1fr; }
  .services, .loves { grid-template-columns: 1fr; }
  .steps { grid-template-columns: repeat(2, 1fr); }
  .nav__links { display: none; }
  .tools__row { grid-template-columns: 1fr; gap: 0.5rem; }
}
@media (max-width: 40rem) {
  .steps { grid-template-columns: 1fr; }
  .board-tools { flex-direction: column; align-items: flex-start; }
  .story li { padding: 1.1rem; }
}
@media (prefers-reduced-motion: reduce) {
  .piece--knight { transition: none; }
  .sq__go::before { animation: none; }
  .btn, .card { transition: none; }
}
</style>
