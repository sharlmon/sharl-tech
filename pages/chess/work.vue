<script setup lang="ts">
import { projects } from '~/data/projects'
import { V } from '~/data/site'

definePageMeta({ layout: 'chess' })
useSeoMeta({
  title: 'Work | Sharlmon',
  description: 'Systems, platforms and websites built by Sharlmon in Nairobi, with live links and GitHub repos.',
  robots: 'noindex, nofollow',
})

const countBuilds = (kind: string) => projects.filter(project => project.kind === kind).reduce((total, project) => total + (project.count ?? 1), 0)
const systemsBuilt = countBuilds('system')
const websitesBuilt = countBuilds('website')
const webAndBrand = [...projects.filter(project => project.kind === 'website'), ...projects.filter(project => project.kind === 'identity')]

const groups = [
  { title: 'Systems and platforms', glyph: '♛' + V, text: 'Software that businesses and organisations run on.', items: projects.filter(project => project.kind === 'system'), count: systemsBuilt },
  { title: 'Websites and brand', glyph: '♟' + V, text: 'Sites that tell a story and bring in enquiries, plus brand work.', items: webAndBrand, count: webAndBrand.length },
]
</script>

<template>
  <div>
    <section class="cx-wrap cx-pagehead">
      <p class="cx-kicker">Work</p>
      <h1 class="cx-title">Things I've built.</h1>
      <p class="cx-lead">{{ systemsBuilt }} systems and {{ websitesBuilt }} websites so far, plus brand work. Each card links to the live project or its code.</p>

      <div v-for="group in groups" :key="group.title" class="cx-group">
        <header class="cx-group__head">
          <span class="cx-group__glyph" aria-hidden="true">{{ group.glyph }}</span>
          <div>
            <h2 style="font-size: 1.7rem">{{ group.title }} <span class="cx-group__count">{{ group.count }}</span></h2>
            <p>{{ group.text }}</p>
          </div>
        </header>
        <div class="cx-cards">
          <ChessProjectCard v-for="project in group.items" :key="project.name" :project="project" />
        </div>
      </div>
    </section>
  </div>
</template>
