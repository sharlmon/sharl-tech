<script setup lang="ts">
const route = useRoute()

function armEntranceMotion() {
  const animated = Array.from(document.querySelectorAll<HTMLElement>('.appear'))

  animated.forEach((element) => {
    element.addEventListener('animationend', () => element.classList.add('is-in'), { once: true })
  })

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      animated.forEach((element) => {
        const animations = element.getAnimations()
        const isActive = animations.some((animation) => animation.playState === 'running' || animation.playState === 'finished')
        if (!isActive) element.classList.add('is-in')
      })
    })
  })
}

onMounted(armEntranceMotion)
watch(() => route.fullPath, () => nextTick(armEntranceMotion))
</script>

<template>
  <div class="site-frame">
    <div class="site-wave-field" aria-hidden="true">
      <span class="site-wave site-wave--1" />
      <span class="site-wave site-wave--2" />
      <span class="site-wave site-wave--3" />
      <span class="site-wave site-wave--4" />
      <span class="site-wave site-wave--5" />
    </div>
    <div class="site-content">
      <NuxtPage />
    </div>
    <ProjectModal />
  </div>
</template>

<style>
.site-frame {
  position: relative;
  isolation: isolate;
  min-height: 100vh;
}

.site-content {
  position: relative;
  z-index: 1;
}

.site-wave-field {
  position: fixed;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  background: #ffffff;
  pointer-events: none;
}

.site-wave {
  position: absolute;
  left: -24%;
  width: 148%;
  height: clamp(12rem, 31vh, 24rem);
  border: 1px solid rgba(24, 24, 27, 0.14);
  border-radius: 46% 54% 50% 50% / 55% 48% 52% 45%;
  box-shadow: 0 0 36px rgba(24, 24, 27, 0.025);
  will-change: transform;
}

.site-wave--1 { top: -13%; animation: site-wave-drift-a 19s ease-in-out infinite alternate; }
.site-wave--2 { top: 10%; opacity: 0.9; animation: site-wave-drift-b 23s ease-in-out -5s infinite alternate; }
.site-wave--3 { top: 34%; opacity: 0.82; animation: site-wave-drift-a 27s ease-in-out -11s infinite alternate-reverse; }
.site-wave--4 { top: 59%; opacity: 0.72; animation: site-wave-drift-b 25s ease-in-out -8s infinite alternate-reverse; }
.site-wave--5 { top: 83%; opacity: 0.62; animation: site-wave-drift-a 29s ease-in-out -15s infinite alternate; }

.dark .site-wave-field { background: #09090b; }

.dark .site-wave {
  border-color: rgba(255, 255, 255, 0.15);
  box-shadow: 0 0 42px rgba(255, 255, 255, 0.025);
}

@keyframes site-wave-drift-a {
  from { transform: translate3d(-2.5%, -10px, 0) rotate(-2deg) scaleX(1.02); }
  to { transform: translate3d(2.5%, 16px, 0) rotate(2deg) scaleX(0.98); }
}

@keyframes site-wave-drift-b {
  from { transform: translate3d(2%, 14px, 0) rotate(1.5deg) scaleX(0.99); }
  to { transform: translate3d(-2%, -14px, 0) rotate(-1.5deg) scaleX(1.02); }
}

@media (prefers-reduced-motion: reduce) {
  .site-wave {
    animation: none !important;
    transform: none;
  }
}
</style>
