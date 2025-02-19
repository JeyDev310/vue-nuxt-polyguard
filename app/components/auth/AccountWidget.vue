<script setup lang="ts">
import {
  ref,
  computed,
  onBeforeMount,
  useNuxtApp,
  navigateTo,
  // useAuthCookies,
} from '#imports'
import { useUserStore } from '~/stores/user'

import BzScaleOnHover from '~/components/common/ui/effects/BzScaleOnHover.vue'

const { $eventBus } = useNuxtApp()
const userStore = useUserStore()
// const authCookies = useAuthCookies()

const expanded = ref(false)
const accountWidgetElement = ref()

const user = computed(() => userStore.getUser)

onBeforeMount(() => {
  $eventBus.$on('layout-clicked', (event: Event) => {
    // for reference on a click outside directive
    // https://dev.to/disgustingdev/vue-directive-click-outside-37nc
    // https://gist.github.com/disgusting-dev/8d45aebff8a536af1cba39b0fcd203e3
    // TODO: this event is fired twice

    if (!accountWidgetElement.value) {
      return
    }

    const isClickOutside =
      event.target !== accountWidgetElement.value &&
      !accountWidgetElement.value.contains(event.target)
    if (isClickOutside) {
      expanded.value = false
    }
  })
})

function hideMenu() {
  expanded.value = false
}

async function toggle(): Promise<void> {
  if (userStore.isAuthenticated) {
    expanded.value = !expanded.value
    return
  }

  await navigateTo('/login')
}
</script>

<template>
  <div ref="accountWidgetElement" class="relative">
    <BzScaleOnHover size="large">
      <CommonIconsUser @click="toggle" />
    </BzScaleOnHover>
    <!--
        Dropdown menu, show/hide based on menu state.

        Entering: "transition ease-out duration-100"
          From: "transform opacity-0 scale-95"
          To: "transform opacity-100 scale-100"
        Leaving: "transition ease-in duration-75"
          From: "transform opacity-100 scale-100"
          To: "transform opacity-0 scale-95"
      -->
    <div
      v-show="expanded"
      class="absolute right-0 z-20 mt-52 w-64 origin-bottom-right divide-y divide-gray-100 bg-white text-gray-700 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="menu-button"
      tabindex="-1"
    >
      <ClientOnly>
        <div class="px-4 py-3" role="none">
          <p class="a_body text-sm" role="none">Signed in as</p>
          <p
            class="a_body truncate text-sm font-medium text-gray-900"
            role="none"
          >
            {{ user?.email }}
          </p>
        </div>
        <div class="py-1" role="none">
          <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
          <NuxtLink
            class="block px-4 py-2 text-sm text-gray-700"
            role="menuitem"
            tabindex="-1"
            to="/my-account"
            @click="hideMenu"
          >
            Account settings
          </NuxtLink>
        </div>
        <div class="py-1" role="none">
          <NuxtLink
            class="block w-full px-4 py-2 text-left text-sm text-red-500"
            to="/my-account/logout"
            @click="hideMenu"
          >
            Sign out
          </NuxtLink>
        </div>
      </ClientOnly>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.nuxt-link-active {
  @apply rounded;
  @apply border;
  @apply border-gray-100;
  @apply bg-gray-600;
}
</style>
