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
  <NuxtPage />
</template>
