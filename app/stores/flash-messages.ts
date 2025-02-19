import { defineStore } from 'pinia'

// https://www.rrrhys.com/nuxt-js-and-vuex-dumping-flash-messages/

interface FlashMessageState {
  successMessage?: string
  dangerMessage?: string
  warningMessage?: string
  infoMessage?: string
  flashed: boolean
}

export const useFlashMessagesStore = defineStore('flash-messages', {
  state: (): FlashMessageState => ({
    successMessage: undefined,
    dangerMessage: undefined,
    warningMessage: undefined,
    infoMessage: undefined,
    flashed: false,
  }),
  getters: {
    hasMessages(state) {
      return !!(
        state.successMessage ||
        state.dangerMessage ||
        state.warningMessage ||
        state.infoMessage
      )
    },
    getAllMessages(state) {
      const messages = []
      if (state.successMessage) {
        messages.push({
          message: state.successMessage,
          type: 'success',
        })
      }
      if (state.dangerMessage) {
        messages.push({
          message: state.dangerMessage,
          type: 'danger',
        })
      }
      if (state.warningMessage) {
        messages.push({
          message: state.warningMessage,
          type: 'warning',
        })
      }
      if (state.infoMessage) {
        messages.push({
          message: state.infoMessage,
          type: 'info',
        })
      }
      return messages
    },
    getSuccessMessage(state) {
      return state.successMessage
    },
    getDangerMessage(state) {
      return state.dangerMessage
    },
    getWarningMessage(state) {
      return state.warningMessage
    },
    getInfoMessage(state) {
      return state.infoMessage
    },
    getFlashed(state) {
      return state.flashed
    },
  },
  actions: {
    setSuccessMessage(value: string) {
      this.successMessage = value
    },
    setDangerMessage(value: string) {
      this.dangerMessage = value
    },
    setWarningMessage(value: string) {
      this.warningMessage = value
    },
    setInfoMessage(value: string) {
      this.infoMessage = value
    },
    // setFlashed(value: boolean) {
    //   this.flashed = value
    // },
    resetMessages() {
      console.log('resetMessages')
      this.successMessage = undefined
      this.dangerMessage = undefined
      this.warningMessage = undefined
      this.infoMessage = undefined
      this.flashed = false
    },
    destroyFlash() {
      console.log('destroyFlash')
      // if (!this.hasMessages) {
      //   console.log('destroyFlash', 1)
      //   this.setFlashed(false)
      //   return
      // }
      //
      // if (!this.getFlashed) {
      //   console.log('destroyFlash', 2, this.getFlashed)
      //   this.setFlashed(true)
      //   return
      // }
      // console.log('destroyFlash', 3)
      this.resetMessages()
    },
  },
})
