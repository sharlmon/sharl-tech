<script setup lang="ts">
import { loves, story } from '~/data/site'

definePageMeta({ layout: 'chess' })
useSeoMeta({
  title: 'About | Sharlmon',
  description: 'From aerospace engineering to software: the story of Sharlmon, a Nairobi software engineer who also plays chess.',
  robots: 'noindex, nofollow',
})
</script>

<template>
  <div>
    <section class="cx-wrap cx-pagehead">
      <p class="cx-kicker">About me</p>
      <h1 class="cx-title">From aerospace to software.</h1>
      <p class="cx-lead">I'm Sharlmon, a software engineer based in Westlands, Nairobi. This is how I got here.</p>
      <ol class="cx-story">
        <li v-for="(item, index) in story" :key="item.title">
          <span class="cx-story__no">{{ index + 1 }}</span>
          <div><h3>{{ item.title }}</h3><p>{{ item.text }}</p></div>
        </li>
      </ol>
    </section>

    <section class="cx-band">
      <div class="cx-wrap">
        <p class="cx-kicker">Beyond the code</p>
        <h2 class="cx-title">What I enjoy.</h2>
        <div class="cx-loves" style="margin-top: 2.2rem">
          <article v-for="love in loves" :key="love.title" class="cx-love">
            <span class="cx-love__glyph" aria-hidden="true">{{ love.glyph }}</span>
            <h4>{{ love.title }}</h4>
            <p>{{ love.text }}</p>
          </article>
        </div>
        <div class="cx-actions">
          <NuxtLink to="/chess/work" class="cx-btn">See my work</NuxtLink>
          <NuxtLink to="/chess/contact" class="cx-btn cx-btn--ghost">Get in touch</NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>
