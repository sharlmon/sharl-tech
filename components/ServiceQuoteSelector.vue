<script setup lang="ts">
import { ArrowRight, Check } from 'lucide-vue-next'

withDefaults(defineProps<{ compact?: boolean }>(), {
  compact: false,
})

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
  <form class="quote-form" @submit.prevent="submitQuote">
    <div class="quote-layout">
      <fieldset>
        <legend class="quote-title">
          Services
        </legend>
        <p :id="`${componentId}-selection-help`" class="quote-help">
          Select every capability your project needs.
        </p>

        <div class="service-options" :aria-describedby="`${componentId}-selection-help ${componentId}-selection-status`">
          <div v-for="(service, index) in services" :key="service" class="relative">
            <input
              :id="serviceId(index)"
              v-model="selectedServices"
              :value="service"
              type="checkbox"
              class="peer sr-only"
              :aria-invalid="selectionError ? 'true' : undefined"
              :aria-describedby="selectionError ? `${componentId}-selection-error` : undefined"
              @change="selectionError = ''"
            >
            <label :for="serviceId(index)" class="service-option" :class="{ 'is-selected': selectedServices.includes(service) }">
              <span>{{ service }}</span>
              <span class="service-option__check" aria-hidden="true">
                <Check :size="12" :stroke-width="3" />
              </span>
            </label>
          </div>
        </div>

        <div :id="`${componentId}-selection-status`" class="selection-status" aria-live="polite" aria-atomic="true">
          {{ selectionAnnouncement }}
        </div>
        <p v-if="selectionError" :id="`${componentId}-selection-error`" class="selection-error" role="alert">
          {{ selectionError }}
        </p>
      </fieldset>

      <div class="project-details">
        <h3 class="quote-title">Project details</h3>
        <div class="detail-fields">
          <div>
            <label :for="`${componentId}-name`">Name</label>
            <input
              :id="`${componentId}-name`"
              v-model="form.name"
              required
              type="text"
              autocomplete="name"
              placeholder="Your full name"
            >
          </div>

          <div>
            <label :for="`${componentId}-email`">Email</label>
            <input
              :id="`${componentId}-email`"
              v-model="form.email"
              required
              type="email"
              autocomplete="email"
              placeholder="you@company.com"
            >
          </div>

          <div>
            <label :for="`${componentId}-description`">Short project brief</label>
            <textarea
              :id="`${componentId}-description`"
              v-model="form.description"
              required
              rows="3"
              placeholder="What are you building, and what outcome do you need?"
            />
          </div>
        </div>

        <button type="submit" class="quote-submit">
          Continue on WhatsApp
          <ArrowRight :size="16" aria-hidden="true" />
        </button>
        <p class="quote-note">Your selections and brief will be added to a pre-filled message.</p>
      </div>
    </div>
  </form>
</template>

<style scoped>
.quote-form { padding: 1.35rem 1.5rem 1.5rem; }

.quote-layout {
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(18rem, 0.95fr);
  gap: 1.5rem;
}

.quote-title {
  color: #18181b;
  font-size: 1rem;
  font-weight: 750;
  letter-spacing: -0.025em;
}

.quote-help {
  margin-top: 0.25rem;
  color: #71717a;
  font-size: 0.76rem;
  line-height: 1.45;
}

.service-options {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.5rem;
  margin-top: 0.9rem;
}

.service-option {
  display: flex;
  min-height: 3.65rem;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.65rem;
  padding: 0.7rem 0.75rem;
  border: 1px solid #e4e4e7;
  border-radius: 0.75rem;
  background: rgba(255, 255, 255, 0.76);
  color: #27272a;
  cursor: pointer;
  font-size: 0.75rem;
  font-weight: 650;
  line-height: 1.25;
  transition: border-color 180ms ease, background-color 180ms ease;
}

.service-option:hover { border-color: #a1a1aa; }
.service-option.is-selected { border-color: #18181b; background: #f4f4f5; }
.peer:focus-visible + .service-option { outline: 2px solid #18181b; outline-offset: 2px; }

.service-option__check {
  display: grid;
  width: 1.15rem;
  height: 1.15rem;
  flex: 0 0 auto;
  place-items: center;
  border: 1px solid #d4d4d8;
  border-radius: 50%;
  color: transparent;
}

.is-selected .service-option__check { border-color: #18181b; background: #18181b; color: #ffffff; }

.selection-status {
  min-height: 1.1rem;
  margin-top: 0.65rem;
  color: #71717a;
  font-size: 0.72rem;
  font-weight: 600;
}

.selection-error { margin-top: 0.2rem; color: #b91c1c; font-size: 0.72rem; font-weight: 650; }

.project-details {
  padding-left: 1.5rem;
  border-left: 1px solid #e4e4e7;
}

.detail-fields { display: grid; gap: 0.75rem; margin-top: 0.9rem; }
.detail-fields label { display: block; color: #3f3f46; font-size: 0.72rem; font-weight: 700; }

.detail-fields input,
.detail-fields textarea {
  width: 100%;
  margin-top: 0.3rem;
  padding: 0.65rem 0.75rem;
  border: 1px solid #d4d4d8;
  border-radius: 0.7rem;
  background: rgba(255, 255, 255, 0.82);
  color: #18181b;
  font-size: 0.8rem;
  outline: none;
  transition: border-color 180ms ease, box-shadow 180ms ease;
}

.detail-fields textarea { min-height: 5.25rem; resize: vertical; }
.detail-fields input::placeholder,
.detail-fields textarea::placeholder { color: #a1a1aa; }
.detail-fields input:hover,
.detail-fields textarea:hover { border-color: #a1a1aa; }
.detail-fields input:focus-visible,
.detail-fields textarea:focus-visible { border-color: #18181b; box-shadow: 0 0 0 2px rgba(24, 24, 27, 0.12); }

.quote-submit {
  display: inline-flex;
  min-height: 2.75rem;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
  padding: 0 1.1rem;
  border-radius: 0.7rem;
  background: #18181b;
  color: #ffffff;
  font-size: 0.78rem;
  font-weight: 700;
  transition: background-color 180ms ease, transform 180ms ease;
}

.quote-submit:hover { background: #3f3f46; transform: translateY(-1px); }
.quote-submit:focus-visible { outline: 2px solid #18181b; outline-offset: 3px; }
.quote-note { margin-top: 0.55rem; color: #71717a; font-size: 0.68rem; line-height: 1.4; }

:global(.dark .quote-title) { color: #fafafa; }
:global(.dark .quote-help),
:global(.dark .selection-status),
:global(.dark .quote-note) { color: #a1a1aa; }
:global(.dark .project-details) { border-color: #3f3f46; }
:global(.dark .service-option) { border-color: #3f3f46; background: rgba(39, 39, 42, 0.72); color: #e4e4e7; }
:global(.dark .service-option:hover) { border-color: #71717a; }
:global(.dark .service-option.is-selected) { border-color: #fafafa; background: #3f3f46; }
:global(.dark .peer:focus-visible + .service-option) { outline-color: #fafafa; }
:global(.dark .service-option__check) { border-color: #71717a; }
:global(.dark .is-selected .service-option__check) { border-color: #fafafa; background: #fafafa; color: #18181b; }
:global(.dark .detail-fields label) { color: #d4d4d8; }
:global(.dark .detail-fields input),
:global(.dark .detail-fields textarea) { border-color: #52525b; background: rgba(39, 39, 42, 0.8); color: #fafafa; }
:global(.dark .detail-fields input:focus-visible),
:global(.dark .detail-fields textarea:focus-visible) { border-color: #fafafa; box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.13); }
:global(.dark .quote-submit) { background: #fafafa; color: #18181b; }
:global(.dark .quote-submit:hover) { background: #d4d4d8; }
:global(.dark .quote-submit:focus-visible) { outline-color: #fafafa; }

@media (max-width: 760px) {
  .quote-form { padding: 1.1rem 1rem 1.25rem; }
  .quote-layout { grid-template-columns: 1fr; gap: 1.15rem; }
  .project-details { padding: 1.1rem 0 0; border-top: 1px solid #e4e4e7; border-left: 0; }
  .service-option { min-height: 3.35rem; }
}

@media (max-width: 460px) {
  .service-options { grid-template-columns: 1fr; }
  .service-option { min-height: 3rem; }
  .quote-submit { width: 100%; }
}
</style>
