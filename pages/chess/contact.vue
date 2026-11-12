<script setup lang="ts">
import { audiences, contact } from '~/data/site'

definePageMeta({ layout: 'chess' })
useSeoMeta({
  title: 'Contact | Sharlmon',
  description: 'Get in touch with Sharlmon on WhatsApp or email to talk about a website, system or automation project.',
  robots: 'noindex, nofollow',
})
const { openProjectModal } = useProjectModal()
</script>

<template>
  <div>
    <section class="cx-wrap cx-pagehead">
      <p class="cx-kicker">Contact</p>
      <h1 class="cx-title">Got a problem to solve?</h1>
      <p class="cx-lead">Tell me what you are trying to build or fix, and I'll get back to you. Pick whichever way suits you.</p>

      <div class="cx-contacts">
        <a :href="contact.whatsapp" class="cx-contactcard" target="_blank" rel="noopener noreferrer">
          <h3>WhatsApp</h3>
          <p>The quickest way to reach me. Send a message and we'll take it from there.</p>
          <strong>Chat now ↗</strong>
        </a>
        <button type="button" class="cx-contactcard" aria-haspopup="dialog" aria-controls="project-modal" @click="openProjectModal">
          <h3>Plan a project</h3>
          <p>Choose the services you need and share a short brief. It continues to WhatsApp.</p>
          <strong>Start the brief</strong>
        </button>
        <a :href="`mailto:${contact.email}`" class="cx-contactcard">
          <h3>Email</h3>
          <p>{{ contact.email }}</p>
          <strong>Write to me</strong>
        </a>
      </div>

      <ul class="cx-facts">
        <li><span>Based in</span>Westlands, Nairobi, Kenya</li>
        <li><span>Works with</span>{{ audiences.join(', ') }}</li>
        <li><span>Find me online</span><a :href="contact.github" target="_blank" rel="noopener noreferrer">GitHub ↗</a> · <a :href="contact.linkedin" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a></li>
      </ul>
    </section>
  </div>
</template>
