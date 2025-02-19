import { defineStore } from 'pinia'
// import type * as AuthTypes from '~~/server/integrations/craftcms/auth'
import type { User } from '#shared/types'

export const useUserStore = defineStore('user', {
  state: (): User => ({
    entityId: null,
    email: null,
    firstName: null,
    lastName: null,
    company: null,
    phone: null,
  }),
  getters: {
    isAuthenticated(state): boolean {
      return !!state.entityId
    },
    getUser(state): User {
      return state
    },
  },
  actions: {
    setUser(value: User): void {
      this.entityId = value.entityId
      this.email = value.email
      this.email = value.email
      this.firstName = value.firstName
      this.lastName = value.lastName
      this.company = value.company
      this.phone = value.phone
    },
  },
})
