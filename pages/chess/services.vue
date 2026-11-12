<script setup lang="ts">
import { audiences, services, steps, tools } from '~/data/site'

definePageMeta({ layout: 'chess' })
useSeoMeta({
  title: 'What I do | Sharlmon',
  description: 'Websites, business systems and apps, AI and automation, hosting and security, built by Sharlmon in Nairobi.',
  robots: 'noindex, nofollow',
})
const { openProjectModal } = useProjectModal()
</script>

<template>
  <div>
    <section class="cx-wrap cx-pagehead">
      <p class="cx-kicker">What I do</p>
      <h1 class="cx-title">Four things, done properly.</h1>
      <p class="cx-lead">Whatever size your organisation is, the work usually falls into one of these.</p>
      <div class="cx-services">
        <article v-for="(service, index) in services" :key="service.title" class="cx-service">
          <span class="cx-service__no" aria-hidden="true">0{{ index + 1 }}</span>
          <h3>{{ service.title }}</h3>
          <p>{{ service.text }}</p>
          <p class="cx-service__examples"><span>Examples:</span> {{ service.examples }}</p>
        </article>
      </div>
    </section>

    <section class="cx-band">
      <div class="cx-wrap">
        <p class="cx-kicker">How we work together</p>
        <h2 class="cx-title">Simple, in four steps.</h2>
        <ol class="cx-steps" style="margin-top: 2.2rem">
          <li v-for="(step, index) in steps" :key="step.title">
            <span class="cx-steps__no">{{ index + 1 }}</span>
            <div><h4>{{ step.title }}</h4><p>{{ step.text }}</p></div>
          </li>
        </ol>
        <h3 class="cx-sub">Who I work with</h3>
        <ul class="cx-chips">
          <li v-for="audience in audiences" :key="audience">{{ audience }}</li>
        </ul>
      </div>
    </section>

    <section class="cx-wrap">
      <p class="cx-kicker">Tools</p>
      <h2 class="cx-title">What I build with.</h2>
      <div style="margin-top: 1.6rem">
        <div v-for="group in tools" :key="group.name" class="cx-toolrow">
          <p>{{ group.name }}</p>
          <ul class="cx-tags">
            <li v-for="tool in group.tools" :key="tool">{{ tool }}</li>
          </ul>
        </div>
      </div>
      <div class="cx-actions">
        <button type="button" class="cx-btn" aria-haspopup="dialog" aria-controls="project-modal" @click="openProjectModal">Start a project</button>
        <NuxtLink to="/chess/work" class="cx-btn cx-btn--ghost">See the work</NuxtLink>
      </div>
    </section>
  </div>
</template>
