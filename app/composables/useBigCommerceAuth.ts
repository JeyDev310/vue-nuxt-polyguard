import { useRequestHeaders, useFlashMessagesStore } from '#imports'
import { useUserStore } from '~/stores/user'

// for reference see
// https://github.com/damien-hl/nuxt3-auth-example

export function useBigCommerceAuth() {
  const userStore = useUserStore()
  const flashMessagesStore = useFlashMessagesStore()

  async function login(params: { email: string; password: string }) {
    await $fetch('/api/v1/customer/login', {
      method: 'POST',
      body: JSON.stringify(params),
    })

    const customer = await $fetch('/api/v1/customer/current', {
      method: 'GET',
      credentials: 'include',
      mode: 'cors',
    })

    if (customer) {
      userStore.setUser(customer)
      flashMessagesStore.setSuccessMessage('You have been logged in')
    } else {
      userStore.$reset()
      await logout({ showFlash: false })
      flashMessagesStore.setDangerMessage('Invalid credentials')
    }
  }

  async function reload() {
    const headers = useRequestHeaders(['cookie'])

    const isLoggedIn = await $fetch('/api/v1/customer/is-logged-in', {
      headers,
    })

    if (!isLoggedIn) {
      userStore.$reset()
      return
    }

    const customer = await $fetch('/api/v1/customer/current', {
      headers,
    })

    if (customer) {
      userStore.setUser(customer)
    } else {
      await logout({ showFlash: false })
    }
  }

  async function logout(params: { showFlash: boolean } = { showFlash: true }) {
    await $fetch('/api/v1/customer/logout', {
      method: 'POST',
      credentials: 'include',
      mode: 'cors',
    })
    userStore.$reset()
    if (params.showFlash) {
      flashMessagesStore.setSuccessMessage('You have been logged out')
    }
  }

  interface RegisterParams {
    email: string
    firstName: string
    lastName: string
    company?: string
    phone?: string
    password: string
  }

  async function register(params: RegisterParams) {
    const customer = await $fetch('/api/v1/customer/register', {
      method: 'POST',
      body: {
        ...params,
      },
    })

    if (customer) {
      // login to initialize the customer with customerAccessToken
      await login({ email: params.email, password: params.password })
    }
  }

  return {
    login,
    logout,
    register,
    reload,
  }
}
