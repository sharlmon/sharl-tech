<script setup lang="ts">
const nuxtApp = useNuxtApp()
const isVisible = ref(true)

const settledCells = [
  [1, 10], [2, 10], [5, 10], [6, 10], [7, 10], [8, 10],
  [1, 9], [3, 9], [5, 9], [8, 9],
  [1, 8], [3, 8], [4, 8], [5, 8], [8, 8],
  [1, 7], [4, 7], [7, 7], [8, 7],
] as const

let initialLoadComplete = false
let routeStartedAt = 0
let initialTimer: ReturnType<typeof setTimeout> | undefined
let hideTimer: ReturnType<typeof setTimeout> | undefined
let removePageStartHook: (() => void) | undefined
let removePageFinishHook: (() => void) | undefined

function setPageLocked(locked: boolean) {
  document.body.classList.toggle('loader-open', locked)
}

function showLoader() {
  if (hideTimer) clearTimeout(hideTimer)
  routeStartedAt = Date.now()
  isVisible.value = true
  setPageLocked(true)
}

function hideLoader(minimumVisibleMs = 360) {
  if (hideTimer) clearTimeout(hideTimer)
  const elapsed = Date.now() - routeStartedAt
  const delay = Math.max(0, minimumVisibleMs - elapsed)

  hideTimer = setTimeout(() => {
    isVisible.value = false
    setPageLocked(false)
  }, delay)
}

onMounted(() => {
  routeStartedAt = Date.now()
  setPageLocked(true)

  initialTimer = setTimeout(() => {
    initialLoadComplete = true
    isVisible.value = false
    setPageLocked(false)
  }, 820)

  removePageStartHook = nuxtApp.hook('page:start', () => {
    if (initialLoadComplete) showLoader()
  })

  removePageFinishHook = nuxtApp.hook('page:finish', () => {
    if (initialLoadComplete && isVisible.value) hideLoader()
  })
})

onBeforeUnmount(() => {
  if (initialTimer) clearTimeout(initialTimer)
  if (hideTimer) clearTimeout(hideTimer)
  removePageStartHook?.()
  removePageFinishHook?.()
  document.body.classList.remove('loader-open')
})
</script>

<template>
  <Transition name="loader-fade">
    <div v-if="isVisible" class="app-loader" role="status" aria-live="polite" aria-label="Loading page">
      <div class="tetris-loader" aria-hidden="true">
        <div class="tetris-board">
          <span
            v-for="([column, row], index) in settledCells"
            :key="`settled-${index}`"
            class="tetris-block tetris-block--settled"
            :style="{ '--column': column, '--row': row }"
          />

          <span class="tetris-piece tetris-piece--t">
            <i /><i /><i /><i />
          </span>
          <span class="tetris-piece tetris-piece--line">
            <i /><i /><i /><i />
          </span>
          <span class="tetris-row-flash" />
        </div>

        <p class="tetris-caption">Loading<span class="tetris-caption__dots">...</span></p>
      </div>
      <span class="sr-only">Loading SharlTech</span>
    </div>
  </Transition>
</template>

<style scoped>
.app-loader {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: grid;
  place-items: center;
  background: rgba(255, 255, 255, 0.985);
  color: #18181b;
}

.tetris-loader {
  display: grid;
  justify-items: center;
  gap: 1rem;
  transform: translateY(-1vh);
}

.tetris-board {
  --cell: 0.38rem;
  --gap: 0.13rem;
  --step: calc(var(--cell) + var(--gap));
  --grid-line: rgba(24, 24, 27, 0.13);
  position: relative;
  width: calc(var(--step) * 8 + var(--gap));
  height: calc(var(--step) * 10 + var(--gap));
  overflow: hidden;
  border: 2px solid currentColor;
  border-radius: 0.2rem;
  background-image:
    linear-gradient(to right, var(--grid-line) 1px, transparent 1px),
    linear-gradient(to bottom, var(--grid-line) 1px, transparent 1px);
  background-size: var(--step) var(--step);
  box-shadow: 0 13px 36px rgba(24, 24, 27, 0.1);
}

.tetris-block,
.tetris-piece i {
  display: block;
  width: var(--cell);
  height: var(--cell);
  border-radius: 1px;
  background: currentColor;
}

.tetris-block--settled {
  position: absolute;
  left: calc((var(--column) - 1) * var(--step) + var(--gap));
  top: calc((var(--row) - 1) * var(--step) + var(--gap));
  opacity: 0.88;
  animation: settled-breathe 820ms ease-in-out infinite alternate;
}

.tetris-piece {
  position: absolute;
  display: grid;
  gap: var(--gap);
  color: currentColor;
}

.tetris-piece i { box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.14) inset; }

.tetris-piece--t {
  top: calc(var(--gap) * -1);
  left: calc(var(--step) * 2 + var(--gap));
  grid-template-columns: repeat(3, var(--cell));
  grid-template-rows: repeat(2, var(--cell));
  animation: tetris-drop-t 820ms cubic-bezier(0.3, 0.75, 0.25, 1) infinite;
}

.tetris-piece--t i:nth-child(1) { grid-column: 2; }
.tetris-piece--t i:nth-child(2) { grid-column: 1; grid-row: 2; }
.tetris-piece--t i:nth-child(3) { grid-column: 2; grid-row: 2; }
.tetris-piece--t i:nth-child(4) { grid-column: 3; grid-row: 2; }

.tetris-piece--line {
  top: calc(var(--step) * -4);
  left: calc(var(--step) * 6 + var(--gap));
  grid-template-rows: repeat(4, var(--cell));
  animation: tetris-drop-line 820ms cubic-bezier(0.3, 0.75, 0.25, 1) 410ms infinite;
}

.tetris-row-flash {
  position: absolute;
  right: var(--gap);
  bottom: var(--gap);
  left: var(--gap);
  height: var(--cell);
  background: currentColor;
  opacity: 0;
  animation: tetris-clear-row 820ms ease-out infinite;
}

.tetris-caption {
  margin: 0;
  font-size: 0.68rem;
  font-weight: 750;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

.tetris-caption__dots {
  display: inline-block;
  width: 1.4rem;
  overflow: hidden;
  vertical-align: bottom;
  animation: loading-dots 820ms steps(4, end) infinite;
}

.loader-fade-enter-active,
.loader-fade-leave-active {
  transition: opacity 220ms ease;
}

.loader-fade-enter-from,
.loader-fade-leave-to {
  opacity: 0;
}

:global(.dark .app-loader) {
  background: rgba(9, 9, 11, 0.99);
  color: #fafafa;
}

:global(.dark .tetris-board) {
  --grid-line: rgba(250, 250, 250, 0.14);
  box-shadow: 0 15px 42px rgba(0, 0, 0, 0.42);
}

@keyframes tetris-drop-t {
  0% { transform: translateY(-1rem) rotate(0); opacity: 0; }
  12% { opacity: 1; }
  66%, 82% { transform: translateY(calc(var(--step) * 5)) rotate(0); opacity: 1; }
  100% { transform: translateY(calc(var(--step) * 5)); opacity: 0; }
}

@keyframes tetris-drop-line {
  0% { transform: translateY(-0.75rem); opacity: 0; }
  12% { opacity: 1; }
  62%, 82% { transform: translateY(calc(var(--step) * 8)); opacity: 1; }
  100% { transform: translateY(calc(var(--step) * 8)); opacity: 0; }
}

@keyframes tetris-clear-row {
  0%, 68% { opacity: 0; transform: scaleX(0.75); }
  76% { opacity: 0.92; transform: scaleX(1); }
  88%, 100% { opacity: 0; transform: scaleX(1.08); }
}

@keyframes settled-breathe {
  from { opacity: 0.62; }
  to { opacity: 0.92; }
}

@keyframes loading-dots {
  from { width: 0; }
  to { width: 1.4rem; }
}

@media (prefers-reduced-motion: reduce) {
  .tetris-piece,
  .tetris-block--settled,
  .tetris-row-flash,
  .tetris-caption__dots {
    animation: none;
  }

  .tetris-piece--t { transform: translateY(calc(var(--step) * 5)); }
  .tetris-piece--line { transform: translateY(calc(var(--step) * 8)); }
}
</style>
