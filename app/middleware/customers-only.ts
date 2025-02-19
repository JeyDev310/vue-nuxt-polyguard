import { defineNuxtRouteMiddleware, navigateTo } from '#imports'
import { useUserStore } from '~/stores/user'

export default defineNuxtRouteMiddleware(async () => {
  const userStore = useUserStore()
  if (userStore.isAuthenticated) {
    return
  }

  return navigateTo('/login')
})
