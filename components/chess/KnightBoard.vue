<script setup lang="ts">
import { boardFacts, V } from '~/data/site'

type Piece = { glyph: string, side: 'w' | 'b', x: number, y: number }
const FILES = 'abcdefgh'

const staticPieces: Piece[] = [
  { glyph: '♜' + V, side: 'b', x: 0, y: 0 }, { glyph: '♚' + V, side: 'b', x: 4, y: 0 }, { glyph: '♝' + V, side: 'b', x: 5, y: 0 },
  { glyph: '♟' + V, side: 'b', x: 1, y: 1 }, { glyph: '♟' + V, side: 'b', x: 4, y: 1 }, { glyph: '♟' + V, side: 'b', x: 6, y: 1 },
  { glyph: '♛' + V, side: 'b', x: 3, y: 2 }, { glyph: '♞' + V, side: 'b', x: 6, y: 3 },
  { glyph: '♟' + V, side: 'w', x: 2, y: 5 }, { glyph: '♟' + V, side: 'w', x: 5, y: 5 }, { glyph: '♟' + V, side: 'w', x: 7, y: 5 },
  { glyph: '♝' + V, side: 'w', x: 2, y: 4 }, { glyph: '♛' + V, side: 'w', x: 3, y: 6 }, { glyph: '♜' + V, side: 'w', x: 0, y: 7 },
  { glyph: '♚' + V, side: 'w', x: 4, y: 7 },
]
const occupied = new Set(staticPieces.map(p => `${p.x},${p.y}`))

const factFor = (x: number, y: number) => boardFacts[(x * 3 + y * 5 + x * y) % boardFacts.length]
const square = (x: number, y: number) => `${FILES[x]}${8 - y}`

const knight = reactive({ x: 6, y: 7 })
const lastFact = ref('Tap a glowing square')
const autoplay = ref(true)
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
  const pick = legal.value[Math.floor(Math.random() * legal.value.length)]
  if (pick) hop(pick.x, pick.y)
}

function userHop(x: number, y: number) {
  hop(x, y)
  paused = true
  setTimeout(() => { paused = false }, 5000)
}

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) autoplay.value = false
  timer = setInterval(autoMove, 2300)
})
onBeforeUnmount(() => timer && clearInterval(timer))
</script>

<template>
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
    <div class="caption" aria-live="polite">
      <span class="caption__label">Tool the knight landed on</span>
      <span class="caption__fact">{{ lastFact }}</span>
    </div>
    <div class="tools">
      <p>Fun fact: I play chess. Tap a glowing square to move the knight.</p>
      <button type="button" class="chip" :aria-pressed="autoplay" @click="autoplay = !autoplay">{{ autoplay ? 'Pause' : 'Play' }}</button>
    </div>
  </div>
</template>

<style scoped>
.board-wrap { width: min(100%, 30rem); justify-self: center; }
.board { position: relative; display: grid; grid-template-columns: repeat(8, 1fr); aspect-ratio: 1; border: 5px solid var(--text); border-radius: 0.8rem; overflow: hidden; box-shadow: 0 24px 60px rgba(0, 0, 0, 0.22); }
.sq { position: relative; }
.sq--light { background: var(--sq-light); }
.sq--dark { background: var(--sq-dark); }
.sq__go { position: absolute; inset: 0; z-index: 3; display: grid; place-items: center; border: 0; background: transparent; cursor: pointer; }
.sq__go::before { content: ''; width: 30%; height: 30%; border-radius: 50%; background: rgba(10, 10, 10, 0.4); animation: ping 2s ease-out infinite; transition: transform 160ms, background 160ms; }
.sq__go:hover::before { transform: scale(1.5); background: #fff; }
.pieces { position: absolute; inset: 0; pointer-events: none; }
.piece { position: absolute; top: 0; left: 0; display: grid; place-items: center; width: 12.5%; height: 12.5%; font-family: 'Noto Sans Symbols 2', 'Segoe UI Symbol', 'Apple Symbols', 'DejaVu Sans', sans-serif; font-size: clamp(1.6rem, 5.6vw, 2.7rem); line-height: 1; transform: translate(calc(var(--x) * 100%), calc(var(--y) * 100%)); z-index: 2; }
.piece--w { color: #ffffff; -webkit-text-stroke: 1.2px #111; text-shadow: 0 3px 4px rgba(0, 0, 0, 0.3); }
.piece--b { color: #111111; -webkit-text-stroke: 0.7px #f3f3f3; text-shadow: 0 3px 4px rgba(0, 0, 0, 0.3); }
.piece--knight { z-index: 4; filter: drop-shadow(0 0 9px var(--glow)); transition: transform 620ms cubic-bezier(0.3, 1.5, 0.5, 1); }
.caption { display: flex; flex-direction: column; gap: 0.15rem; margin-top: 0.9rem; padding: 0.75rem 1rem; border: 1px solid var(--line); border-radius: 0.7rem; background: var(--panel); }
.caption__label { color: var(--muted); font-size: 0.74rem; letter-spacing: 0.1em; text-transform: uppercase; }
.caption__fact { font: 600 1.15rem 'Chakra Petch', sans-serif; }
.tools { display: flex; align-items: center; justify-content: space-between; gap: 1rem; margin-top: 0.8rem; color: var(--muted); font-size: 0.82rem; }
.tools p { margin: 0; }
.chip { flex: none; padding: 0.4rem 0.9rem; border: 1px solid var(--line); border-radius: 999px; background: var(--panel); color: var(--text); font: 600 0.8rem 'Space Grotesk', sans-serif; cursor: pointer; }
.chip:hover { border-color: var(--text); }
@keyframes ping { 0% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.7); } 70%, 100% { box-shadow: 0 0 0 0.75rem rgba(255, 255, 255, 0); } }
@media (max-width: 40rem) { .tools { flex-direction: column; align-items: flex-start; } }
@media (prefers-reduced-motion: reduce) { .piece--knight { transition: none; } .sq__go::before { animation: none; } }
</style>
