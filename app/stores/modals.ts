import { defineStore } from 'pinia'

interface ModalsState {
  isTypeformModalOpen: boolean
}

export const useModalsStore = defineStore('modals', {
  state: (): ModalsState => ({
    isTypeformModalOpen: false,
  }),
  getters: {
    showTypeformModal(state): boolean {
      return state.isTypeformModalOpen
    },
  },
  actions: {
    setIsTypeformModalOpen(value: boolean): void {
      this.isTypeformModalOpen = value
    },
  },
})
