<script setup lang="ts">
import { projects } from '~/data/projects'
import { contact, featuredNames, services } from '~/data/site'

definePageMeta({ layout: 'chess' })
useSeoMeta({
  title: 'Sharlmon | Software engineer in Nairobi',
  description: 'Sharlmon builds websites, business systems and automation for organisations in Kenya and beyond. Based in Nairobi. Plays chess in the spare time.',
  robots: 'noindex, nofollow',
})

const { openProjectModal } = useProjectModal()
const countBuilds = (kind: string) => projects.filter(project => project.kind === kind).reduce((total, project) => total + (project.count ?? 1), 0)
const systemsBuilt = countBuilds('system')
const websitesBuilt = countBuilds('website')
const featured = featuredNames.map(name => projects.find(project => project.name === name)).filter(Boolean) as typeof projects
</script>

<template>
  <div>
    <section class="cx-wrap cx-hero">
      <div>
        <p class="cx-kicker">Software engineer · Nairobi, Kenya</p>
        <h1 class="cx-h1">I build <em>websites and software</em> that help organisations run better.</h1>
        <p class="cx-heroLead">
          Hi, I'm Sharlmon. I make websites, online systems and automations for businesses, NGOs and organisations across Kenya and beyond. In my spare time, I play chess.
        </p>
        <div class="cx-actions">
          <NuxtLink to="/chess/work" class="cx-btn">See my work</NuxtLink>
          <a :href="contact.whatsapp" class="cx-btn cx-btn--ghost" target="_blank" rel="noopener noreferrer">Chat on WhatsApp ↗</a>
        </div>
        <ul class="cx-stats" aria-label="At a glance">
          <li><strong>{{ systemsBuilt }}</strong> systems built</li>
          <li><strong>{{ websitesBuilt }}</strong> websites launched</li>
          <li><strong>Kenya</strong> and beyond</li>
        </ul>
      </div>
      <ChessKnightBoard />
    </section>

    <section class="cx-band">
      <div class="cx-wrap">
        <div class="cx-head-row">
          <div>
            <p class="cx-kicker">What I do</p>
            <h2 class="cx-title">Four things, done properly.</h2>
          </div>
          <NuxtLink to="/chess/services" class="cx-more">How I work →</NuxtLink>
        </div>
        <div class="cx-services cx-services--4">
          <article v-for="(service, index) in services" :key="service.title" class="cx-service">
            <span class="cx-service__no" aria-hidden="true">0{{ index + 1 }}</span>
            <h3>{{ service.title }}</h3>
            <p>{{ service.text }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="cx-wrap">
      <div class="cx-head-row">
        <div>
          <p class="cx-kicker">Selected work</p>
          <h2 class="cx-title">A few things I've built.</h2>
        </div>
        <NuxtLink to="/chess/work" class="cx-more">All {{ systemsBuilt + websitesBuilt }} projects →</NuxtLink>
      </div>
      <div class="cx-cards" style="margin-top: 2.2rem">
        <ChessProjectCard v-for="project in featured" :key="project.name" :project="project" />
      </div>
    </section>

    <section class="cx-band">
      <div class="cx-wrap cx-cta">
        <h2>Got a problem to solve?</h2>
        <p class="cx-lead">Tell me what you are trying to build or fix, and I'll get back to you.</p>
        <div class="cx-actions">
          <button type="button" class="cx-btn" aria-haspopup="dialog" aria-controls="project-modal" @click="openProjectModal">Plan a project</button>
          <NuxtLink to="/chess/contact" class="cx-btn cx-btn--ghost">Other ways to reach me</NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>
