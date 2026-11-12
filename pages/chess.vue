<script setup lang="ts">
import { projects } from '~/data/projects'

const { openProjectModal } = useProjectModal()

useSeoMeta({
  title: 'Sharlmon | Software engineer and chess player',
  description: 'The personal portfolio of Sharlmon, a Nairobi software engineer who builds systems and websites and plays chess.',
  robots: 'noindex, nofollow',
})

useHead({
  link: [
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@500;600;700&family=Space+Grotesk:wght@400;500;600&display=swap' },
  ],
})

/* ------------------------------------------------------------------ the hero board */
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
  'TypeScript', 'Nuxt 4', 'Vue 3', 'React', 'Next.js', 'Node.js', 'PostgreSQL', 'Medusa 2', 'Prisma', 'Supabase', 'Docker', 'Linux',
  'Nginx', 'n8n', 'Webhooks', 'AI agents', 'M-Pesa payments', 'Multi-tenant SaaS', 'Offline-first PWAs', 'GitHub Actions',
  'Seico', 'Hodari Stores', 'Kazi Smart', 'Tailwind CSS',
]
const factFor = (x: number, y: number) => facts[(x * 3 + y * 5 + x * y) % facts.length]
const square = (x: number, y: number) => `${FILES[x]}${8 - y}`

const knight = reactive({ x: 6, y: 7 })
const history = ref<{ n: number, san: string, fact: string }[]>([{ n: 1, san: 'Ng1', fact: 'Start here' }])
const autoplay = ref(true)
const reduceMotion = ref(false)
let timer: ReturnType<typeof setInterval> | undefined
let paused = false

const jumps = [[1, 2], [2, 1], [2, -1], [1, -2], [-1, -2], [-2, -1], [-2, 1], [-1, 2]]
const legal = computed(() => jumps
  .map(([dx, dy]) => ({ x: knight.x + dx, y: knight.y + dy }))
  .filter(({ x, y }) => x >= 0 && x < 8 && y >= 0 && y < 8 && !occupied.has(`${x},${y}`)))
const isLegal = (x: number, y: number) => legal.value.some(m => m.x === x && m.y === y)
const last = computed(() => history.value[history.value.length - 1])

function hop(x: number, y: number) {
  knight.x = x
  knight.y = y
  const n = history.value.length + 1
  history.value = [...history.value, { n, san: `N${square(x, y)}`, fact: factFor(x, y) }].slice(-8)
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
  timer = setInterval(autoMove, 2100)
})
onBeforeUnmount(() => timer && clearInterval(timer))

/* ------------------------------------------------------------------ copy */
const moves = [
  { no: '1.', mark: '!', title: 'Aerospace Engineering', text: 'Where it began: aerospace engineering, a field that rewards precision and plans that do not fail quietly.', tone: 'ok' },
  { no: '2.', mark: '!!', title: 'The pivot', text: 'I switched to software development full-time and have not looked back.', tone: 'brilliant' },
  { no: '3.', mark: '!', title: 'SharlTech', text: 'Started my own company in Westlands, Nairobi: websites, platforms and AI systems for organisations in Kenya and beyond.', tone: 'ok' },
  { no: '4.', mark: '!', title: 'ASUDI Digital Services', text: 'Today I am a developer at ASUDI, where I build Seico, the company website and the public planner.', tone: 'ok' },
]

const loves = [
  { glyph: '♟' + V, title: 'Chess', text: 'Slow games, long plans and the quiet pleasure of a move that works three turns later.' },
  { glyph: '♞' + V, title: 'Building real things', text: 'Systems that real people use: shops, planners, security tools, festival sites.' },
  { glyph: '♝' + V, title: 'Design', text: 'Brand and interface work, because how a thing feels is part of whether it works.' },
]

const groups = [
  { glyph: '♚' + V, title: 'The King', line: 'The one I protect.', text: 'A product I am building and will not let fall.', names: ['Seico'] },
  { glyph: '♛' + V, title: 'The Queens', line: 'Reach across the whole board.', text: 'Platforms that connect many people and many moving parts.', names: ['Hodari Stores', 'Kazi Smart', 'Jitume Creator Hub', 'Propflow & FindYourKeja'] },
  { glyph: '♜' + V, title: 'The Rooks', line: 'Quiet strength on the back rank.', text: 'Automation and foundations that hold everything else up.', names: ['ASUDI Planner', 'Chat2Post AI'] },
  { glyph: '♝' + V, title: 'The Bishop', line: 'Diagonal thinking.', text: 'Identity and brand work, approached from an angle.', names: ['Jitume Logo Competition'] },
  { glyph: '♞' + V, title: 'The Knights', line: 'The unexpected move.', text: 'Offline-first apps and personal tools that go around the problem.', names: ['Rebound', 'Weka'] },
  { glyph: '♟' + V, title: 'The Pawns', line: 'Always moving forward.', text: 'Websites: the front line, built one square at a time.', names: ['ASUDI Digital Services', 'Premier Veg', 'Fresca Premier Fresh', 'Mic-Jasiri Productions', 'The Terrace Kilifi', 'Afrofilms', 'Irish Trading Enterprises', 'Kilifi Creek Festival'] },
].map(group => ({ ...group, items: group.names.map(name => projects.find(project => project.name === name)).filter(Boolean) as typeof projects }))

const countBuilds = (kind: string) => projects.filter(project => project.kind === kind).reduce((total, project) => total + (project.count ?? 1), 0)
const systemsBuilt = countBuilds('system')
const websitesBuilt = countBuilds('website')

const tactics = [
  { glyph: '♞' + V, tint: 'lime', name: 'Development', note: 'Get the pieces out. What people see first.', tools: ['React', 'Next.js', 'Vue 3', 'Nuxt 3 & 4', 'TypeScript', 'JavaScript', 'Tailwind CSS'] },
  { glyph: '♜' + V, tint: 'red', name: 'Back rank', note: 'Guard what matters: the data.', tools: ['Node.js', 'REST APIs', 'Medusa 2', 'Prisma ORM', 'Drizzle ORM', 'Supabase', 'PocketBase', 'PostgreSQL'] },
  { glyph: '♝' + V, tint: 'gold', name: 'Discovered attack', note: 'Let the machines do the repetitive work.', tools: ['AI/LLM integration', 'Multi-agent workflows', 'n8n', 'Webhooks', 'API-driven automation'] },
  { glyph: '♚' + V, tint: 'lime', name: 'Castling', note: 'Keep the king safe: ship and run it well.', tools: ['Git', 'GitHub Actions', 'Docker', 'Linux', 'Nginx', 'Plesk VPS', 'Vercel', 'GitHub Pages'] },
  { glyph: '♟' + V, tint: 'red', name: 'Pawn structure', note: 'Solid foundations decide the endgame.', tools: ['Multi-tenant SaaS', 'RBAC', 'Payment integrations', 'Service workers', 'Responsive web systems'] },
]

const whatsappUrl = 'https://wa.me/254707575397?text=Hi%20Sharlmon%2C%20I%27d%20like%20to%20play%20a%20game%20%28discuss%20a%20project%29.'
</script>

<template>
  <div class="chess">
    <a href="#main" class="chess__skip">Skip to content</a>

    <header class="nav">
      <a href="#top" class="nav__brand" aria-label="Sharlmon, back to top">
        <span class="nav__tile">SM</span>
        <span class="nav__name">Sharlmon</span>
      </a>
      <nav class="nav__links" aria-label="Sections">
        <a href="#opening"><b>1.</b> Opening</a>
        <a href="#middlegame"><b>2.</b> Middlegame</a>
        <a href="#tactics"><b>3.</b> Tactics</a>
        <a href="#endgame"><b>4.</b> Endgame</a>
      </nav>
      <button type="button" class="btn btn--small" aria-haspopup="dialog" aria-controls="project-modal" @click="openProjectModal">Your move</button>
    </header>

    <main id="main">
      <!-- HERO -->
      <section id="top" class="hero">
        <div class="hero__copy">
          <p class="eyebrow"><span aria-hidden="true">♞</span> Nairobi, Kenya · Available for work</p>
          <h1 class="hero__title">
            <span class="sr-only">Software engineer and chess player</span>
            <span class="hero__row" aria-hidden="true">SOFTWARE <i class="badge badge--oct badge--lime">♞&#xFE0E;</i></span>
            <span class="hero__row" aria-hidden="true">
              <span class="badge-group"><i>♜&#xFE0E;</i><i>♝&#xFE0E;</i><i>♛&#xFE0E;</i></span>
              <em class="hero__accent">ENGINEER</em>
            </span>
            <span class="hero__row" aria-hidden="true"><span class="hero__amp">&amp;</span> CHESS <em class="hero__red">PLAYER</em></span>
          </h1>
          <p class="hero__lead">
            I build systems and websites, and I think about them the way I think about chess: three moves ahead, protect the king, and never rush the endgame.
          </p>
          <div class="hero__actions">
            <a href="#middlegame" class="btn">See the pieces I've moved</a>
            <button type="button" class="btn btn--ghost" aria-haspopup="dialog" aria-controls="project-modal" @click="openProjectModal">Start a game</button>
          </div>
          <ul class="stats" aria-label="At a glance">
            <li><strong>{{ systemsBuilt }}</strong> systems</li>
            <li><strong>{{ websitesBuilt }}</strong> websites</li>
            <li><strong>1</strong> knight that never stands still</li>
          </ul>
        </div>

        <div class="board-wrap">
          <div class="board" role="img" aria-label="A chessboard with a knight hopping between squares. Each square it lands on names one of my tools.">
            <div v-for="i in 64" :key="i" class="sq" :class="((i - 1) % 8 + Math.floor((i - 1) / 8)) % 2 ? 'sq--dark' : 'sq--light'">
              <span v-if="(i - 1) % 8 === 0" class="coord coord--rank" aria-hidden="true">{{ 8 - Math.floor((i - 1) / 8) }}</span>
              <span v-if="Math.floor((i - 1) / 8) === 7" class="coord coord--file" aria-hidden="true">{{ FILES[(i - 1) % 8] }}</span>
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
            <span class="board-caption__move">{{ last.n }}. {{ last.san }}</span>
            <span class="board-caption__fact">{{ last.fact }}</span>
          </div>
          <div class="board-tools">
            <button type="button" class="chip-btn" :aria-pressed="autoplay" @click="autoplay = !autoplay">{{ autoplay ? 'Pause the knight' : 'Let the knight roam' }}</button>
            <p>Tap a glowing square to move it yourself.</p>
          </div>
          <ol class="movelist" aria-label="Recent moves">
            <li v-for="m in history.slice(-5)" :key="m.n + m.san"><b>{{ m.n }}.</b> {{ m.san }}</li>
          </ol>
        </div>
      </section>

      <!-- OPENING -->
      <section id="opening" class="section">
        <h2 class="brk"><span aria-hidden="true">⟨</span> The opening <span aria-hidden="true">⟩</span></h2>
        <p class="section__lead">How I got to this position, written as moves.</p>
        <ol class="moves">
          <li v-for="m in moves" :key="m.no" class="move" :class="`move--${m.tone}`">
            <span class="move__no">{{ m.no }}</span>
            <div>
              <h3>{{ m.title }} <span class="move__mark" :aria-label="m.tone === 'brilliant' ? 'brilliant move' : 'good move'">{{ m.mark }}</span></h3>
              <p>{{ m.text }}</p>
            </div>
          </li>
        </ol>

        <h3 class="sub">Off the clock</h3>
        <div class="loves">
          <article v-for="love in loves" :key="love.title" class="love">
            <span class="badge badge--oct badge--green" aria-hidden="true">{{ love.glyph }}</span>
            <h4>{{ love.title }}</h4>
            <p>{{ love.text }}</p>
          </article>
        </div>
      </section>

      <!-- MIDDLEGAME -->
      <section id="middlegame" class="section section--board">
        <h2 class="brk"><span aria-hidden="true">⟨</span> The middlegame <span aria-hidden="true">⟩</span></h2>
        <p class="section__lead">{{ systemsBuilt }} systems and {{ websitesBuilt }} websites so far. Every project is a piece, and each piece plays a different role.</p>

        <div v-for="group in groups" :key="group.title" class="group">
          <header class="group__head">
            <span class="group__glyph" aria-hidden="true">{{ group.glyph }}</span>
            <div>
              <h3>{{ group.title }}</h3>
              <p><strong>{{ group.line }}</strong> {{ group.text }}</p>
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

      <!-- TACTICS -->
      <section id="tactics" class="section">
        <h2 class="brk"><span aria-hidden="true">⟨</span> Tactics <span aria-hidden="true">⟩</span></h2>
        <p class="section__lead">The tools I reach for, named after the ideas that win games.</p>
        <div class="tactics">
          <article v-for="t in tactics" :key="t.name" class="tactic" :class="`tactic--${t.tint}`">
            <span class="badge badge--oct" aria-hidden="true">{{ t.glyph }}</span>
            <div>
              <h3>{{ t.name }}</h3>
              <p class="tactic__note">{{ t.note }}</p>
              <ul class="tags">
                <li v-for="tool in t.tools" :key="tool">{{ tool }}</li>
              </ul>
            </div>
          </article>
        </div>
      </section>

      <!-- ENDGAME -->
      <section id="endgame" class="section endgame">
        <h2 class="brk"><span aria-hidden="true">⟨</span> The endgame <span aria-hidden="true">⟩</span></h2>
        <p class="endgame__big">Your move.</p>
        <p class="section__lead">Local business, NGO, funded organisation or fellow developer: if there is a hard problem on your board, I would like to play it.</p>
        <div class="hero__actions">
          <a :href="whatsappUrl" class="btn btn--green" target="_blank" rel="noopener noreferrer">Chat on WhatsApp ↗</a>
          <button type="button" class="btn" aria-haspopup="dialog" aria-controls="project-modal" @click="openProjectModal">Plan a project</button>
          <a href="mailto:sharlmon19@gmail.com" class="btn btn--ghost">Email me</a>
        </div>
        <p class="endgame__links">
          <a href="https://github.com/sharlmon" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
          <a href="https://www.linkedin.com/in/sharlmon-junior-701746281" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
          <NuxtLink to="/portfolio">Classic portfolio</NuxtLink>
        </p>
      </section>
    </main>

    <footer class="foot">
      <p>© {{ new Date().getFullYear() }} Sharlmon · SharlTech. Engineered in Nairobi, played on 64 squares.</p>
    </footer>
  </div>
</template>

<style scoped>
.chess {
  --ink: #0c0d0c;
  --panel: #151714;
  --panel-2: #1c1f1b;
  --line: #2b2f29;
  --ivory: #f3f0e4;
  --muted: #a7ad9f;
  --sq-light: #ebecd0;
  --sq-dark: #739552;
  --lime: #b8e357;
  --red: #ff5d4d;
  --gold: #f6c744;
  --green: #25d366;
  min-height: 100vh;
  background:
    radial-gradient(60rem 30rem at 85% -10%, rgba(115, 149, 82, 0.22), transparent 60%),
    radial-gradient(40rem 24rem at -10% 40%, rgba(255, 93, 77, 0.08), transparent 60%),
    var(--ink);
  color: var(--ivory);
  font-family: 'Space Grotesk', 'Inter', system-ui, sans-serif;
  line-height: 1.6;
  overflow-x: clip;
}

.chess a { color: inherit; text-decoration: none; }
.chess h1, .chess h2, .chess h3, .chess h4 { font-family: 'Chakra Petch', 'Inter', sans-serif; margin: 0; line-height: 1.05; }
.sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
.chess__skip { position: absolute; left: 1rem; top: -4rem; z-index: 100; padding: 0.6rem 1rem; border-radius: 0.5rem; background: var(--ivory); color: var(--ink); font-weight: 700; }
.chess__skip:focus { top: 1rem; }
.chess :focus-visible { outline: 3px solid var(--lime); outline-offset: 3px; border-radius: 0.4rem; }

/* --- nav --- */
.nav { position: sticky; top: 0; z-index: 30; display: flex; align-items: center; justify-content: space-between; gap: 1rem; padding: 0.75rem clamp(1rem, 4vw, 3rem); background: rgba(12, 13, 12, 0.82); backdrop-filter: blur(14px); border-bottom: 1px solid var(--line); }
.nav__brand { display: flex; align-items: center; gap: 0.7rem; font-family: 'Chakra Petch', sans-serif; font-weight: 700; letter-spacing: 0.04em; }
.nav__tile { display: grid; place-items: center; width: 2.4rem; height: 2.4rem; border-radius: 0.6rem; background: var(--sq-dark); color: #fff; font-size: 0.9rem; box-shadow: inset 0 0 0 2px var(--sq-light); }
.nav__links { display: flex; gap: clamp(0.8rem, 2vw, 1.8rem); font-size: 0.92rem; color: var(--muted); }
.nav__links a { padding: 0.4rem 0.2rem; transition: color 160ms; }
.nav__links a b { color: var(--lime); font-family: 'Chakra Petch', sans-serif; }
.nav__links a:hover { color: var(--ivory); }

/* --- buttons --- */
.btn { display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem; min-height: 3rem; padding: 0.75rem 1.4rem; border: 2px solid var(--ivory); border-radius: 0.7rem; background: var(--ivory); color: var(--ink) !important; font: 700 0.95rem 'Chakra Petch', sans-serif; letter-spacing: 0.03em; cursor: pointer; transition: transform 160ms, box-shadow 160ms, background 160ms; box-shadow: 0 4px 0 rgba(255, 255, 255, 0.18); }
.btn:hover { transform: translateY(-2px); box-shadow: 0 7px 0 rgba(255, 255, 255, 0.18); }
.btn:active { transform: translateY(1px); box-shadow: 0 2px 0 rgba(255, 255, 255, 0.18); }
.btn--ghost { background: transparent; color: var(--ivory) !important; }
.btn--green { background: var(--green); border-color: #0c0d0c; box-shadow: 0 4px 0 #0c0d0c, 0 0 0 2px var(--green); }
.btn--small { min-height: 2.4rem; padding: 0.4rem 1rem; font-size: 0.85rem; }

/* --- hero --- */
.hero { display: grid; grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr); gap: clamp(2rem, 5vw, 4.5rem); align-items: center; max-width: 80rem; margin: 0 auto; padding: clamp(2.5rem, 6vw, 5rem) clamp(1rem, 4vw, 3rem); }
.eyebrow { margin: 0 0 1.2rem; color: var(--lime); font-size: 0.82rem; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; }
.hero__title { display: flex; flex-direction: column; gap: 0.2rem; font-size: clamp(2.6rem, 7.2vw, 5.8rem); font-weight: 700; letter-spacing: -0.01em; text-transform: uppercase; }
.hero__row { display: flex; align-items: center; flex-wrap: wrap; gap: 0.8rem; }
.hero__accent { font-style: normal; color: var(--lime); text-shadow: 0 0 40px rgba(184, 227, 87, 0.35); }
.hero__red { font-style: normal; color: var(--red); }
.hero__amp { color: var(--gold); }
.hero__lead { max-width: 34rem; margin: 1.6rem 0 0; color: var(--muted); font-size: clamp(1rem, 1.6vw, 1.2rem); }
.hero__actions { display: flex; flex-wrap: wrap; gap: 0.9rem; margin-top: 2rem; }
.stats { display: flex; flex-wrap: wrap; gap: 0.6rem 1.4rem; margin: 2rem 0 0; padding: 0; list-style: none; color: var(--muted); font-size: 0.9rem; }
.stats strong { margin-right: 0.25rem; color: var(--ivory); font: 700 1.5rem 'Chakra Petch', sans-serif; }

.badge { display: inline-grid; place-items: center; width: 1.05em; height: 1.05em; font-style: normal; font-size: 0.78em; line-height: 1; }
.badge--oct { clip-path: polygon(30% 0, 70% 0, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0 70%, 0 30%); }
.badge--lime { background: var(--lime); color: var(--ink); }
.badge--green { width: 3.4rem; height: 3.4rem; background: var(--sq-dark); color: #fff; font-size: 1.7rem; }
.badge-group { display: inline-flex; border: 2px solid var(--lime); border-radius: 0.9rem; overflow: hidden; font-size: 0.55em; }
.badge-group i { display: grid; place-items: center; width: 1.5em; height: 1.5em; font-style: normal; color: var(--ivory); border-right: 2px solid var(--lime); }
.badge-group i:last-child { border-right: 0; }

/* --- the board --- */
.board-wrap { width: min(100%, 34rem); justify-self: center; }
.board { position: relative; display: grid; grid-template-columns: repeat(8, 1fr); aspect-ratio: 1; border: 6px solid #2a2d27; border-radius: 0.9rem; overflow: hidden; box-shadow: 0 30px 80px rgba(0, 0, 0, 0.55), 0 0 0 1px var(--line); }
.sq { position: relative; }
.sq--light { background: var(--sq-light); }
.sq--dark { background: var(--sq-dark); }
.coord { position: absolute; font: 700 0.62rem 'Chakra Petch', sans-serif; pointer-events: none; }
.coord--rank { top: 3px; left: 4px; }
.coord--file { right: 4px; bottom: 2px; }
.sq--light .coord { color: var(--sq-dark); }
.sq--dark .coord { color: var(--sq-light); }
.sq__go { position: absolute; inset: 0; z-index: 3; display: grid; place-items: center; border: 0; background: transparent; cursor: pointer; }
.sq__go::before { content: ''; width: 32%; height: 32%; border-radius: 50%; background: rgba(12, 13, 12, 0.32); box-shadow: 0 0 0 0 rgba(246, 199, 68, 0.7); animation: ping 1.8s ease-out infinite; transition: transform 160ms, background 160ms; }
.sq__go:hover::before { transform: scale(1.5); background: var(--gold); }
.pieces { position: absolute; inset: 0; pointer-events: none; }
.piece { position: absolute; top: 0; left: 0; display: grid; place-items: center; width: 12.5%; height: 12.5%; font-family: 'Noto Sans Symbols 2', 'Segoe UI Symbol', 'Apple Symbols', 'DejaVu Sans', sans-serif; font-size: clamp(1.7rem, 6.4vw, 3.1rem); line-height: 1; transform: translate(calc(var(--x) * 100%), calc(var(--y) * 100%)); z-index: 2; }
.piece--w { color: #fffdf4; -webkit-text-stroke: 1.2px #14150f; text-shadow: 0 3px 4px rgba(0, 0, 0, 0.35); }
.piece--b { color: #16170f; -webkit-text-stroke: 0.6px #f3f0e4; text-shadow: 0 3px 4px rgba(0, 0, 0, 0.35); }
.piece--knight { z-index: 4; color: #fffdf4; filter: drop-shadow(0 0 10px rgba(246, 199, 68, 0.95)); transition: transform 620ms cubic-bezier(0.3, 1.5, 0.5, 1); animation: hop 620ms cubic-bezier(0.3, 1.5, 0.5, 1) both; }
.board-caption { display: flex; align-items: baseline; justify-content: space-between; gap: 1rem; margin-top: 1rem; padding: 0.8rem 1rem; border: 1px solid var(--line); border-radius: 0.7rem; background: var(--panel); }
.board-caption__move { color: var(--gold); font: 700 1.15rem 'Chakra Petch', sans-serif; }
.board-caption__fact { font: 600 1.05rem 'Chakra Petch', sans-serif; }
.board-tools { display: flex; align-items: center; justify-content: space-between; gap: 1rem; margin-top: 0.8rem; color: var(--muted); font-size: 0.8rem; }
.board-tools p { margin: 0; }
.chip-btn { padding: 0.45rem 0.9rem; border: 1px solid var(--line); border-radius: 999px; background: var(--panel-2); color: var(--ivory); font: 600 0.8rem 'Space Grotesk', sans-serif; cursor: pointer; }
.chip-btn:hover { border-color: var(--lime); }
.movelist { display: flex; flex-wrap: wrap; gap: 0.4rem 1rem; margin: 0.9rem 0 0; padding: 0; list-style: none; color: var(--muted); font: 500 0.82rem 'Chakra Petch', sans-serif; }
.movelist b { color: var(--lime); }

@keyframes ping { 0% { box-shadow: 0 0 0 0 rgba(246, 199, 68, 0.65); } 70%, 100% { box-shadow: 0 0 0 0.8rem rgba(246, 199, 68, 0); } }
@keyframes hop { 0% { filter: drop-shadow(0 0 10px rgba(246, 199, 68, 0.95)) brightness(1); } 45% { filter: drop-shadow(0 18px 12px rgba(0, 0, 0, 0.5)) brightness(1.15); } 100% { filter: drop-shadow(0 0 10px rgba(246, 199, 68, 0.95)) brightness(1); } }

/* --- sections --- */
.section { max-width: 80rem; margin: 0 auto; padding: clamp(3rem, 8vw, 6.5rem) clamp(1rem, 4vw, 3rem); scroll-margin-top: 4rem; }
.brk { display: inline-flex; align-items: center; gap: 0.7rem; font-size: clamp(2rem, 5vw, 3.6rem); font-weight: 700; text-transform: uppercase; letter-spacing: 0.01em; }
.brk span { color: var(--red); font-weight: 500; }
.brk span:last-child { color: var(--lime); }
.section__lead { max-width: 40rem; margin: 1rem 0 0; color: var(--muted); font-size: 1.1rem; }
.sub { margin: 3.5rem 0 1.4rem; font-size: 1.6rem; text-transform: uppercase; }

.moves { display: grid; gap: 1rem; margin: 2.5rem 0 0; padding: 0; list-style: none; }
.move { display: grid; grid-template-columns: 3.4rem 1fr; gap: 1rem; padding: 1.4rem 1.5rem; border: 1px solid var(--line); border-left: 4px solid var(--lime); border-radius: 0.9rem; background: var(--panel); }
.move--brilliant { border-left-color: var(--gold); background: linear-gradient(90deg, rgba(246, 199, 68, 0.1), var(--panel) 40%); }
.move__no { color: var(--lime); font: 700 1.6rem 'Chakra Petch', sans-serif; }
.move h3 { font-size: 1.4rem; text-transform: uppercase; }
.move__mark { display: inline-grid; place-items: center; min-width: 1.8rem; margin-left: 0.4rem; padding: 0 0.35rem; border-radius: 999px; background: var(--lime); color: var(--ink); font-size: 0.85rem; vertical-align: middle; }
.move--brilliant .move__mark { background: var(--gold); }
.move p { margin: 0.5rem 0 0; color: var(--muted); }

.loves { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }
.love { padding: 1.6rem; border: 1px solid var(--line); border-radius: 1rem; background: var(--panel); }
.love h4 { margin: 1.1rem 0 0.4rem; font-size: 1.3rem; text-transform: uppercase; }
.love p { margin: 0; color: var(--muted); }

/* middlegame */
.section--board { background: linear-gradient(180deg, transparent, rgba(115, 149, 82, 0.07) 30%, rgba(115, 149, 82, 0.07) 70%, transparent); max-width: none; }
.section--board > * { max-width: 72rem; margin-left: auto; margin-right: auto; }
.group { margin-top: 3.4rem; }
.group__head { display: flex; align-items: center; gap: 1.2rem; margin-bottom: 1.2rem; }
.group__glyph { display: grid; place-items: center; width: 4.4rem; height: 4.4rem; flex: none; border-radius: 1rem; background: var(--sq-light); color: #14150f; font: 400 3rem 'Noto Sans Symbols 2', 'Segoe UI Symbol', 'Apple Symbols', 'DejaVu Sans', sans-serif; box-shadow: inset 0 0 0 4px var(--sq-dark); }
.group__head h3 { font-size: 1.9rem; text-transform: uppercase; }
.group__head p { margin: 0.25rem 0 0; color: var(--muted); }
.group__head strong { color: var(--ivory); }
.cards { display: grid; grid-template-columns: repeat(auto-fill, minmax(17rem, 1fr)); gap: 1rem; }
.card { display: flex; flex-direction: column; padding: 1.4rem; border: 1px solid var(--line); background: var(--panel); clip-path: polygon(0 0, calc(100% - 26px) 0, 100% 26px, 100% 100%, 0 100%); transition: transform 180ms, border-color 180ms; }
.card:hover { transform: translateY(-4px); border-color: var(--lime); }
.card__type { margin: 0 0 0.6rem; color: var(--lime); font: 600 0.72rem 'Space Grotesk', sans-serif; letter-spacing: 0.14em; text-transform: uppercase; }
.card h4 { font-size: 1.5rem; text-transform: uppercase; }
.card__text { flex: 1; margin: 0.7rem 0 0; color: var(--muted); font-size: 0.95rem; }
.card__link { display: inline-block; margin: 1rem 1.2rem 0 0; padding-bottom: 0.1rem; border-bottom: 2px solid var(--red); font: 700 0.85rem 'Chakra Petch', sans-serif; letter-spacing: 0.06em; text-transform: uppercase; }
.card__link:hover { border-color: var(--lime); color: var(--lime); }
.card__links { display: block; }

.tags { display: flex; flex-wrap: wrap; gap: 0.5rem; margin: 1rem 0 0; padding: 0; list-style: none; }
.tags li { padding: 0.28rem 0.75rem; border-radius: 0.35rem; background: #2c3563; color: #e8ebff; font: 600 0.74rem 'Chakra Petch', sans-serif; letter-spacing: 0.06em; text-transform: uppercase; transform: rotate(-1.5deg); }
.tags li:nth-child(even) { background: #4a2a2a; color: #ffe4df; transform: rotate(1.2deg); }
.tags li:nth-child(3n) { background: #2c4a30; color: #e5ffe0; transform: rotate(-0.5deg); }

/* tactics */
.tactics { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin-top: 2.5rem; }
.tactic { display: flex; gap: 1.2rem; padding: 1.6rem; border: 1px solid var(--line); border-radius: 1rem; background: var(--panel); }
.tactic:last-child:nth-child(odd) { grid-column: 1 / -1; }
.tactic .badge { flex: none; width: 3.6rem; height: 3.6rem; font-size: 1.9rem; }
.tactic--lime .badge { background: var(--lime); color: var(--ink); }
.tactic--red .badge { background: var(--red); color: #fff; }
.tactic--gold .badge { background: var(--gold); color: var(--ink); }
.tactic h3 { font-size: 1.5rem; text-transform: uppercase; }
.tactic__note { margin: 0.3rem 0 0; color: var(--muted); font-size: 0.95rem; }

/* endgame */
.endgame { text-align: center; }
.endgame .brk { justify-content: center; }
.endgame .section__lead { margin-left: auto; margin-right: auto; }
.endgame .hero__actions { justify-content: center; }
.endgame__big { margin: 1.5rem 0 0; font: 700 clamp(4rem, 14vw, 10rem)/0.9 'Chakra Petch', sans-serif; text-transform: uppercase; background: linear-gradient(90deg, var(--lime), var(--gold), var(--red)); -webkit-background-clip: text; background-clip: text; color: transparent; }
.endgame__links { display: flex; justify-content: center; gap: 1.6rem; margin: 2.5rem 0 0; color: var(--muted); font-weight: 600; }
.endgame__links a:hover { color: var(--lime); }
.foot { padding: 2rem clamp(1rem, 4vw, 3rem) 6rem; border-top: 1px solid var(--line); color: var(--muted); font-size: 0.85rem; text-align: center; }
.foot p { margin: 0; }

/* responsive */
@media (max-width: 62rem) {
  .hero { grid-template-columns: 1fr; }
  .tactics, .loves { grid-template-columns: 1fr; }
  .nav__links { display: none; }
}
@media (max-width: 40rem) {
  .board-tools { flex-direction: column; align-items: flex-start; }
  .move { grid-template-columns: 2.6rem 1fr; padding: 1.1rem; }
  .group__head { align-items: flex-start; }
}
@media (prefers-reduced-motion: reduce) {
  .piece--knight { transition: none; animation: none; }
  .sq__go::before { animation: none; }
  .btn, .card { transition: none; }
}
</style>
