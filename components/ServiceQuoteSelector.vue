<script setup lang="ts">
import { ArrowRight, Check } from 'lucide-vue-next'

const whatsappNumber = '254707575397'

const services = [
  'Custom Web Application',
  'Headless E-Commerce Integration',
  'Cloud Hosting & Infrastructure Setup',
  'SEO Optimization',
  'Progressive Web App (PWA) Development',
  'AI / Automation Workflows',
] as const

const componentId = useId().replace(/:/g, '')
const selectedServices = ref<string[]>([])
const selectionError = ref('')
const form = reactive({
  name: '',
  email: '',
  description: '',
})

const selectionAnnouncement = computed(() => {
  const count = selectedServices.value.length
  if (count === 0) return 'No services selected.'
  return `${count} ${count === 1 ? 'service' : 'services'} selected.`
})

function serviceId(index: number) {
  return `${componentId}-service-${index + 1}`
}

function submitQuote() {
  if (selectedServices.value.length === 0) {
    selectionError.value = 'Select at least one service to continue.'
    nextTick(() => document.getElementById(serviceId(0))?.focus())
    return
  }

  selectionError.value = ''
  const message = [
    `Hi Sharlmon, I'm interested in a custom project quote.`,
    '',
    `Name: ${form.name.trim()}`,
    `Email: ${form.email.trim()}`,
    `Selected services: ${selectedServices.value.join(', ')}`,
    '',
    `Project brief: ${form.description.trim()}`,
  ].join('\n')

  window.location.assign(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`)
}
</script>

<template>
  <form class="rounded-[2rem] border border-zinc-200 bg-white p-6 sm:p-8 lg:p-10" @submit.prevent="submitQuote">
    <fieldset>
      <legend class="text-xl font-extrabold tracking-tight text-zinc-950 sm:text-2xl">
        Select individual services
      </legend>
      <p :id="`${componentId}-selection-help`" class="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-600">
        Choose every capability your project needs. We’ll use the scope to prepare one custom project quote.
      </p>

      <div class="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3" :aria-describedby="`${componentId}-selection-help ${componentId}-selection-status`">
        <div v-for="(service, index) in services" :key="service" class="relative">
          <input
            :id="serviceId(index)"
            v-model="selectedServices"
            :value="service"
            type="checkbox"
            class="peer sr-only focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2"
            :aria-invalid="selectionError ? 'true' : undefined"
            :aria-describedby="selectionError ? `${componentId}-selection-error` : undefined"
            @change="selectionError = ''"
          >
          <label
            :for="serviceId(index)"
            class="flex min-h-32 cursor-pointer items-start justify-between gap-5 rounded-2xl bg-white p-5 text-left transition-colors hover:border-zinc-400 peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-zinc-950 peer-focus-visible:ring-offset-2"
            :class="selectedServices.includes(service) ? 'border-2 border-zinc-950' : 'border border-zinc-200'"
          >
            <span class="max-w-[16rem] font-bold leading-snug text-zinc-950">{{ service }}</span>
            <span
              aria-hidden="true"
              class="grid h-6 w-6 shrink-0 place-items-center rounded-full border transition-colors"
              :class="selectedServices.includes(service) ? 'border-zinc-950 bg-zinc-950 text-white' : 'border-zinc-300 bg-white text-transparent'"
            >
              <Check :size="14" :stroke-width="3" />
            </span>
          </label>
        </div>
      </div>

      <div :id="`${componentId}-selection-status`" class="mt-4 min-h-6 text-sm font-medium text-zinc-600" aria-live="polite" aria-atomic="true">
        {{ selectionAnnouncement }}
      </div>
      <p v-if="selectionError" :id="`${componentId}-selection-error`" class="mt-1 text-sm font-semibold text-red-700" role="alert">
        {{ selectionError }}
      </p>
    </fieldset>

    <div class="mt-10 border-t border-zinc-200 pt-8">
      <h3 class="text-xl font-extrabold tracking-tight text-zinc-950 sm:text-2xl">Project details</h3>
      <div class="mt-6 grid gap-5 sm:grid-cols-2">
        <div>
          <label :for="`${componentId}-name`" class="text-sm font-bold text-zinc-950">Name</label>
          <input
            :id="`${componentId}-name`"
            v-model="form.name"
            required
            type="text"
            autocomplete="name"
            class="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-zinc-950 outline-none transition-colors placeholder:text-zinc-400 hover:border-zinc-400 focus-visible:border-zinc-950 focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2"
            placeholder="Your full name"
          >
        </div>

        <div>
          <label :for="`${componentId}-email`" class="text-sm font-bold text-zinc-950">Email</label>
          <input
            :id="`${componentId}-email`"
            v-model="form.email"
            required
            type="email"
            autocomplete="email"
            class="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-zinc-950 outline-none transition-colors placeholder:text-zinc-400 hover:border-zinc-400 focus-visible:border-zinc-950 focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2"
            placeholder="you@company.com"
          >
        </div>

        <div class="sm:col-span-2">
          <label :for="`${componentId}-description`" class="text-sm font-bold text-zinc-950">Brief project description</label>
          <textarea
            :id="`${componentId}-description`"
            v-model="form.description"
            required
            rows="5"
            class="mt-2 w-full resize-y rounded-xl border border-zinc-300 bg-white px-4 py-3 text-zinc-950 outline-none transition-colors placeholder:text-zinc-400 hover:border-zinc-400 focus-visible:border-zinc-950 focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2"
            placeholder="Tell us what you are building, who it serves, and the outcome you need."
          />
        </div>
      </div>

      <button
        type="submit"
        class="mt-7 inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-zinc-950 px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 sm:w-auto"
      >
        Request Quote via WhatsApp
        <ArrowRight :size="17" aria-hidden="true" />
      </button>
      <p class="mt-4 max-w-2xl text-xs leading-relaxed text-zinc-500">
        Your project details will be added to a pre-filled WhatsApp consultation message. No pricing is attached until the scope is reviewed.
      </p>
    </div>
  </form>
</template>
