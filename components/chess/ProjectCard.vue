<script setup lang="ts">
import type { projects } from '~/data/projects'

defineProps<{ project: (typeof projects)[number] }>()
</script>

<template>
  <article class="cx-card">
    <p class="cx-card__type">{{ project.type }}</p>
    <h4>{{ project.name }}</h4>
    <p class="cx-card__text">{{ project.description }}</p>
    <ul class="cx-tags">
      <li v-for="tag in project.tags" :key="tag">{{ tag }}</li>
    </ul>
    <div v-if="project.url || project.repos?.length" class="cx-card__links">
      <a v-if="project.url" :href="project.url" class="cx-card__link" target="_blank" rel="noopener noreferrer" :aria-label="`View ${project.name} live (opens in a new tab)`">View live ↗</a>
      <template v-else>
        <a v-for="repo in project.repos" :key="repo.url" :href="repo.url" class="cx-card__link" target="_blank" rel="noopener noreferrer" :aria-label="`View ${repo.label} on GitHub (opens in a new tab)`">{{ (project.repos?.length ?? 0) > 1 ? repo.label : 'GitHub' }} ↗</a>
      </template>
    </div>
    <p v-else class="cx-card__none">Details on request</p>
  </article>
</template>
