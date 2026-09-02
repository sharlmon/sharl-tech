<script setup lang="ts">
import { X } from 'lucide-vue-next'

const { isProjectModalOpen, closeProjectModal } = useProjectModal()
const dialog = ref<HTMLDialogElement | null>(null)
let returnFocusTo: HTMLElement | null = null

function openDialog() {
  if (!dialog.value || dialog.value.open) return
  returnFocusTo = document.activeElement instanceof HTMLElement ? document.activeElement : null
  dialog.value.showModal()
  document.body.classList.add('modal-open')
}

function closeDialog() {
  if (!dialog.value?.open) return
  dialog.value.close()
}

function handleDialogClose() {
  document.body.classList.remove('modal-open')
  closeProjectModal()
  returnFocusTo?.focus()
  returnFocusTo = null
}

function handleBackdropClick(event: MouseEvent) {
  if (event.target === dialog.value) closeDialog()
}

watch(isProjectModalOpen, (isOpen) => {
  nextTick(() => isOpen ? openDialog() : closeDialog())
})

onMounted(() => {
  if (isProjectModalOpen.value) openDialog()
})

onBeforeUnmount(() => {
  document.body.classList.remove('modal-open')
})
</script>

<template>
  <dialog
    id="project-modal"
    ref="dialog"
    class="project-modal"
    aria-labelledby="project-modal-title"
    aria-describedby="project-modal-description"
    @cancel.prevent="closeDialog"
    @close="handleDialogClose"
    @click="handleBackdropClick"
  >
    <div class="project-modal__surface">
      <header class="project-modal__header">
        <div>
          <p>Project enquiry</p>
          <h2 id="project-modal-title">Start a project.</h2>
          <span id="project-modal-description">Select what you need and send a short brief through WhatsApp.</span>
        </div>
        <button type="button" aria-label="Close project form" @click="closeDialog">
          <X :size="19" aria-hidden="true" />
        </button>
      </header>

      <ServiceQuoteSelector compact />
    </div>
  </dialog>
</template>

<style scoped>
.project-modal {
  width: min(calc(100% - 2rem), 61rem);
  max-width: none;
  max-height: min(90dvh, 46rem);
  margin: auto;
  padding: 0;
  overflow: hidden;
  border: 1px solid rgba(24, 24, 27, 0.16);
  border-radius: 1.5rem;
  background: transparent;
  color: #18181b;
  box-shadow: 0 30px 90px rgba(9, 9, 11, 0.28);
}

.project-modal::backdrop {
  background: rgba(9, 9, 11, 0.46);
  -webkit-backdrop-filter: blur(12px);
  backdrop-filter: blur(12px);
}

.project-modal__surface {
  max-height: min(90dvh, 46rem);
  overflow-y: auto;
  background: rgba(255, 255, 255, 0.97);
}

.project-modal__header {
  position: sticky;
  top: 0;
  z-index: 2;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 2rem;
  padding: 1.35rem 1.5rem 1.1rem;
  border-bottom: 1px solid #e4e4e7;
  background: rgba(255, 255, 255, 0.94);
  -webkit-backdrop-filter: blur(18px);
  backdrop-filter: blur(18px);
}

.project-modal__header p {
  margin-bottom: 0.35rem;
  color: #71717a;
  font-size: 0.66rem;
  font-weight: 750;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.project-modal__header h2 {
  font-size: clamp(1.75rem, 3vw, 2.5rem);
  font-weight: 750;
  letter-spacing: -0.055em;
  line-height: 1;
}

.project-modal__header span {
  display: block;
  margin-top: 0.5rem;
  color: #71717a;
  font-size: 0.82rem;
}

.project-modal__header button {
  display: grid;
  width: 2.4rem;
  height: 2.4rem;
  flex: 0 0 auto;
  place-items: center;
  border: 1px solid #d4d4d8;
  border-radius: 0.7rem;
  background: #fafafa;
  transition: border-color 180ms ease, background-color 180ms ease;
}

.project-modal__header button:hover { border-color: #71717a; background: #f4f4f5; }
.project-modal__header button:focus-visible { outline: 2px solid #18181b; outline-offset: 3px; }

:global(.dark .project-modal) {
  border-color: rgba(255, 255, 255, 0.16);
  color: #fafafa;
  box-shadow: 0 30px 100px rgba(0, 0, 0, 0.58);
}

:global(.dark .project-modal__surface),
:global(.dark .project-modal__header) {
  background: rgba(24, 24, 27, 0.97);
}

:global(.dark .project-modal__header) { border-color: #3f3f46; }
:global(.dark .project-modal__header p),
:global(.dark .project-modal__header span) { color: #a1a1aa; }

:global(.dark .project-modal__header button) {
  border-color: #52525b;
  background: #27272a;
  color: #fafafa;
}

:global(.dark .project-modal__header button:hover) { border-color: #a1a1aa; background: #3f3f46; }
:global(.dark .project-modal__header button:focus-visible) { outline-color: #fafafa; }

@media (max-width: 640px) {
  .project-modal {
    width: calc(100% - 1rem);
    max-height: calc(100dvh - 1rem);
    border-radius: 1.15rem;
  }

  .project-modal__surface { max-height: calc(100dvh - 1rem); }
  .project-modal__header { gap: 1rem; padding: 1.15rem 1rem 0.95rem; }
  .project-modal__header span { max-width: 17rem; }
}
</style>
