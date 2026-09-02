export function useProjectModal() {
  const isProjectModalOpen = useState('project-modal-open', () => false)

  const openProjectModal = () => {
    isProjectModalOpen.value = true
  }

  const closeProjectModal = () => {
    isProjectModalOpen.value = false
  }

  return {
    isProjectModalOpen,
    openProjectModal,
    closeProjectModal,
  }
}
