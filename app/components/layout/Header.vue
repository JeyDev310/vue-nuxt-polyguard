<script setup lang="ts">
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'
import { z } from 'zod'

import {
  computed,
  useModalsStore,
  onMounted,
  onUnmounted,
  ref,
  useAsyncData,
  useRoute,
  useRouter,
  nextTick,
} from '#imports'
import type { MenuNodeItem } from '#shared/types'

import MainContainer from '~/components/layout/MainContainer.vue'
import AccountWidget from '~/components/auth/AccountWidget.vue'
import CartWidget from '~/components/cart/CartWidget.vue'
import StickyBarCta from '~/components/common/StickyBarCta.vue'
import HamburgerIcon from '~/components/common/icons/Hamburger.vue'
import CloseIcon from '~/components/common/icons/Close.vue'
import CloseSearchIcon from '~/components/common/icons/CloseSearch.vue'
import SearchOldIcon from '~/components/common/icons/SearchOld.vue'
import SearchIcon from '~/components/common/icons/SearchIcon.vue'

const modalsStore = useModalsStore()

onMounted(() => {
  document.addEventListener('click', handleOutsideClick)
  window.addEventListener('scroll', handleScroll)
  // Get the combined height of StickyBarCta and TopMenu after components are mounted
  nextTick(() => {
    const stickyBarHeight = stickyBarRef.value?.offsetHeight ?? 0
    const topMenuHeight = topMenuRef.value?.offsetHeight ?? 0
    scrollThreshold.value = stickyBarHeight + topMenuHeight + 40 // 40px of extra threshold for the breadcrumbs
  })
})

onUnmounted(() => {
  document.removeEventListener('click', handleOutsideClick)
  window.removeEventListener('scroll', handleScroll)
})

const isSearchOpen = ref(false)

const route = useRoute()
const router = useRouter()
const mobileMenuOpen = ref(false)

// Watch for route changes to close mobile menu
router.beforeEach(() => {
  mobileMenuOpen.value = false
  return true
})

const popoverRef = ref<InstanceType<typeof PopoverButton> | null>(null)
const { data: headerMenus } = await useAsyncData(`headerMenus`, async () => {
  const [
    topMenu,
    architecturalMenu,
    highwayMenu,
    mainMenu,
    mechanicalMenu,
    pipelineMenu,
    residentialMenu,
    termMenu,
  ] = await Promise.all([
    $fetch('/api/v1/menus/top-menu'),
    $fetch('/api/v1/menus/architectural-navigation'),
    $fetch('/api/v1/menus/highway-navigation'),
    $fetch('/api/v1/menus/main-navigation'),
    $fetch('/api/v1/menus/mechanical-navigation'),
    $fetch('/api/v1/menus/pipeline-navigation'),
    $fetch('/api/v1/menus/residential-navigation'),
    $fetch('/api/v1/menus/term-navigation'),
  ])

  return {
    topMenu,
    mainMenus: {
      architecturalMenu,
      highwayMenu,
      mainMenu,
      mechanicalMenu,
      pipelineMenu,
      residentialMenu,
      termMenu,
    },
  }
})

// Logo paths for default and scrolled states
const defaultLogo = '/images/logo-polyguard-main.png'

type DivisionsEnum =
  | 'Architectural'
  | 'Highway'
  | 'Mechanical'
  | 'Residential'
  | 'Pipeline'
  | 'Term'
  | 'Corporate'

const currentDivision = computed((): DivisionsEnum => {
  const { path } = route

  if (
    path.startsWith('/product-samples') ||
    path.startsWith('/warranty-process') ||
    path.startsWith('/products/architectural') ||
    path.startsWith('/resources?div=architectural') ||
    path.startsWith('/blog/category/architectural')
  ) {
    return 'Architectural'
  }

  if (
    path.startsWith('/products/residential') ||
    path.startsWith('/resources?div=residential') ||
    path.startsWith('/blog/category/residential')
  ) {
    return 'Residential'
  }

  if (
    path.startsWith('/products/highway') ||
    path.startsWith('/resources?div=highway') ||
    path.startsWith('/blog/category/highway')
  ) {
    return 'Highway'
  }

  if (
    path.startsWith('/products/mechanical') ||
    path.startsWith('/resources?div=mechanical') ||
    path.startsWith('/blog/category/mechanical')
  ) {
    return 'Mechanical'
  }

  if (
    path.startsWith('/products/pipeline') ||
    path.startsWith('/resources?div=pipeline') ||
    path.startsWith('/blog/category/pipeline')
  ) {
    return 'Pipeline'
  }

  if (
    path.startsWith('/products/term') ||
    path.startsWith('/resources?div=term') ||
    path.startsWith('/blog/category/term')
  ) {
    return 'Term'
  }

  return 'Corporate'
})

const topMenu = computed((): Array<MenuNodeItem> => {
  return (headerMenus.value?.topMenu ?? []).map((n) => {
    return {
      id: n.id,
      title: n.title,
      nodeUri: n.nodeUri,
      newWindow: n.newWindow,
    }
  })
})

const currentMenu = computed(() => {
  switch (currentDivision.value) {
    case 'Corporate':
      return headerMenus.value?.mainMenus?.mainMenu
    case 'Architectural':
      return headerMenus.value?.mainMenus?.architecturalMenu
    case 'Highway':
      return headerMenus.value?.mainMenus?.highwayMenu
    case 'Mechanical':
      return headerMenus.value?.mainMenus?.mechanicalMenu
    case 'Residential':
      return headerMenus.value?.mainMenus?.residentialMenu
    case 'Pipeline':
      return headerMenus.value?.mainMenus?.pipelineMenu
    case 'Term':
      return headerMenus.value?.mainMenus?.termMenu
    default:
      return headerMenus.value?.mainMenus?.mainMenu
  }
})

const mainMenu = computed((): Array<MenuNodeItem> => {
  return (currentMenu.value ?? []).map((n) => {
    return {
      id: n.id,
      title: n.title,
      nodeUri: n.nodeUri,
      newWindow: n.newWindow,
      excerptText: n.excerptText,
      children: validateChildren(n.children),
    }
  })
})

function toggleSearch() {
  isSearchOpen.value = !isSearchOpen.value
}

function validateChildren(children: Array<unknown>): Array<MenuNodeItem> {
  const MenuNodeItemSchema: z.ZodSchema<MenuNodeItem> = z.lazy(() =>
    z.object({
      id: z.string().optional().nullable(),
      title: z.string().optional().nullable(),
      nodeUri: z.string().optional().nullable(),
      newWindow: z.string().optional().nullable(),
      excerptText: z.string().optional().nullable(),
      children: z.array(MenuNodeItemSchema).optional().nullable(),
    }),
  )

  function isValidMenuNodeItemFilter(el: unknown): el is MenuNodeItem {
    return MenuNodeItemSchema.safeParse(el).success
  }

  return children.filter(isValidMenuNodeItemFilter).map((c) => {
    return {
      title: c.title,
      nodeUri: c.nodeUri,
      newWindow: c.newWindow,
      excerptText: c.excerptText,
      children: c?.children ? validateChildren(c.children) : [],
    }
  })
}

function openModal() {
  modalsStore.setIsTypeformModalOpen(true)
}

// Detect clicks outside the popover

function handleOutsideClick(event: MouseEvent) {
  if (
    popoverRef.value?.$el &&
    event.target instanceof Node &&
    !popoverRef.value.$el.contains(event.target)
  ) {
    isSearchOpen.value = false
  }
}

const lastScrollPosition = ref<number>(0)
const isScrollingDown = ref<boolean>(false)
const stickyBarRef = ref<HTMLElement | null>(null)
const topMenuRef = ref<HTMLElement | null>(null)
const scrollThreshold = ref<number>(0)

const showStickyBarCta = computed(() => !isScrollingDown.value)
const showTopBar = computed(() => !isScrollingDown.value)

function handleScroll() {
  const currentScrollPosition = window.scrollY
  const scrollDifference = Math.abs(
    currentScrollPosition - lastScrollPosition.value,
  )

  // Update scroll direction when threshold is met
  if (scrollDifference >= scrollThreshold.value) {
    const newScrollingDown = currentScrollPosition > lastScrollPosition.value

    // Only update if direction has changed
    if (newScrollingDown !== isScrollingDown.value) {
      isScrollingDown.value = newScrollingDown
    }

    // Always update the last position when threshold is met
    lastScrollPosition.value = currentScrollPosition
  }
}
</script>

<template>
  <header
    class="fixed top-0 isolate z-30 w-full bg-white transition-colors duration-300 ease-in-out"
  >
    <Disclosure as="nav" class="">
      <!-- Top Menu -->
      <Transition name="slide-on-scroll" mode="out-in">
        <div v-if="showTopBar" ref="topMenuRef" class="transform">
          <div class="hidden h-[37px] py-1.5 lg:block">
            <MainContainer>
              <MenusDivisionsMenuDesktop :divisions-menu="topMenu" />
            </MainContainer>
          </div>
        </div>
      </Transition>
      <!-- /Top Menu -->

      <!-- Main Menu -->
      <div class="z-10 h-[90px] border-b border-t border-[#0000001a] shadow-sm">
        <MainContainer>
          <div class="flex transition-all">
            <div class="mx-auto w-full">
              <div class="flex h-full flex-row justify-between xl:hidden">
                <div class="flex-none print:hidden">
                  <div class="flex h-full justify-end space-x-2">
                    <div class="flex h-full items-center">
                      <DisclosureButton @click="mobileMenuOpen = true">
                        <HamburgerIcon class="h-6 w-6" />
                      </DisclosureButton>
                    </div>
                    <div class="flex items-center">
                      <Popover>
                        <PopoverButton
                          type="button"
                          aria-label="Search Icon"
                          class="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-0 ring-0"
                        >
                          <span class="sr-only">Search button icon</span>
                          <SearchIcon />
                        </PopoverButton>
                        <Transition
                          enter-active-class="transition-all ease-out duration-500"
                          enter-from-class="opacity-0 -translate-y-full"
                          enter-to-class="opacity-100 translate-y-0"
                          leave-active-class="transition-all ease-out duration-500"
                          leave-from-class="opacity-100 translate-y-0"
                          leave-to-class="opacity-0 -translate-y-full"
                        >
                          <PopoverPanel
                            class="absolute left-0 top-full -z-10 w-full origin-top transform transition-all duration-500 ease-out"
                          >
                            <SearchMobileSearch />
                          </PopoverPanel>
                        </Transition>
                      </Popover>
                    </div>
                  </div>
                </div>
                <div class="flex flex-row items-center justify-center">
                  <NuxtLink
                    to="/"
                    class="my-7 inline-block scale-75 transform sm:scale-100"
                  >
                    <NuxtImg
                      :src="defaultLogo"
                      class="header__logo object-contain transition-all"
                      alt="Polyguard Logo"
                      width="163"
                    />
                  </NuxtLink>
                </div>
                <div class="flex flex-none flex-row items-center space-x-4">
                  <AccountWidget
                    class="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-blue-100 lg:h-11 lg:w-11"
                  />
                  <CartWidget
                    class="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-blue-100 lg:h-11 lg:w-11"
                  />

                  <div class="relative">
                    <div
                      class="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-yellow-600 text-xs font-semibold text-white"
                      style="display: none"
                    >
                      <p class="text-sm" />
                    </div>
                  </div>
                </div>
              </div>
              <div class="hidden h-full flex-row justify-between xl:flex">
                <div class="flex flex-none items-center">
                  <NuxtLink
                    to="/"
                    class="my-7 inline-block origin-left scale-75 transform sm:scale-100"
                  >
                    <NuxtImg
                      :src="defaultLogo"
                      class="object-contain transition-all"
                      alt="Polyguard Logo"
                      width="163"
                    />
                  </NuxtLink>
                </div>
                <div class="ml-6 flex flex-auto xl:ml-12">
                  <MenusMainMenuDesktop :main-menu="mainMenu" />
                </div>

                <div class="flex-none print:hidden">
                  <div class="flex h-full justify-end space-x-4">
                    <PopoverGroup
                      class="flex-fow flex items-center justify-between space-x-4"
                    >
                      <Popover>
                        <PopoverButton
                          ref="popoverRef"
                          type="button"
                          aria-label="Search Icon"
                          class="hover:duration-400 group relative h-11 cursor-pointer items-center justify-center gap-4 rounded-full px-3.5 ease-in-out hover:pl-20 hover:transition-all focus:outline-none lg:flex lg:bg-primary"
                          @click="toggleSearch"
                        >
                          <span
                            class="absolute -right-2 translate-x-0 text-white opacity-0 transition-all duration-500 ease-in-out group-hover:-translate-x-full group-hover:opacity-100"
                          >
                            Search
                          </span>
                          <SearchOldIcon v-if="!isSearchOpen" />
                          <CloseSearchIcon v-else />
                        </PopoverButton>
                        <Transition
                          enter-active-class="transition-all ease-out duration-500"
                          enter-from-class="opacity-0 -translate-y-full"
                          enter-to-class="opacity-100 translate-y-0"
                          leave-active-class="transition-all ease-out duration-500"
                          leave-from-class="opacity-100 translate-y-0"
                          leave-to-class="opacity-0 -translate-y-full"
                        >
                          <PopoverPanel
                            class="absolute left-0 top-full -z-10 w-full origin-top transform transition-all duration-500 ease-out"
                          >
                            <SearchDesktopSearch />
                          </PopoverPanel>
                        </Transition>
                      </Popover>
                      <AccountWidget
                        class="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-blue-100 lg:h-11 lg:w-11"
                      />
                      <CartWidget
                        class="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-blue-100 lg:h-11 lg:w-11"
                      />
                    </PopoverGroup>
                    <div class="hidden items-center xl:flex">
                      <NuxtLink
                        class="inline-flex min-h-10 cursor-pointer items-center rounded-3xl border-2 border-primary bg-primary px-8 py-2 align-middle font-heading text-xs font-medium leading-tight text-white transition focus:bg-primary-dark lg:hover:border-primary-dark lg:hover:bg-primary-dark"
                        @click="openModal"
                        >Get Started</NuxtLink
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MainContainer>
      </div>
      <!-- /Main Menu -->

      <!-- Mobile Nav -->
      <TransitionRoot as="template" :show="mobileMenuOpen" class="xl:hidden">
        <Dialog class="relative z-40" @close="mobileMenuOpen = false">
          <TransitionChild
            as="template"
            enter="ease-in-out duration-500"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="ease-in-out duration-500"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <div
              class="fixed inset-0 bg-black/85 transition-opacity"
              @click="mobileMenuOpen = false"
            />
          </TransitionChild>
          <div class="fixed inset-0 overflow-hidden">
            <div class="absolute inset-0 overflow-hidden">
              <div
                class="pointer-events-none fixed inset-y-0 left-0 flex max-w-full pr-10"
              >
                <TransitionChild
                  as="template"
                  enter="transform transition ease-in-out duration-500"
                  enter-from="-translate-x-full"
                  enter-to="translate-x-0"
                  leave="transform transition ease-in-out duration-500"
                  leave-from="translate-x-0"
                  leave-to="-translate-x-full"
                >
                  <DialogPanel
                    class="pointer-events-auto relative w-screen max-w-md"
                  >
                    <TransitionChild
                      as="template"
                      enter="ease-in-out duration-500"
                      enter-from="opacity-0"
                      enter-to="opacity-100"
                      leave="ease-in-out duration-500"
                      leave-from="opacity-100"
                      leave-to="opacity-0"
                    >
                      <DisclosurePanel
                        class="pointer-events-none fixed inset-0 h-full max-h-screen w-full overflow-y-auto xl:hidden"
                      >
                        <div
                          class="max-screen pointer-events-auto ml-0 h-full max-w-md bg-white"
                        >
                          <div
                            class="flex h-full transform-gpu flex-col overflow-y-scroll bg-white py-8 shadow-xl"
                          >
                            <div class="px-6">
                              <div class="flex justify-between">
                                <NuxtLink
                                  href="/"
                                  class="inline-block origin-left scale-75 transform sm:scale-100"
                                >
                                  <NuxtImg
                                    :src="defaultLogo"
                                    class="header__logo object-contain transition-all"
                                    alt="Polyguard Logo"
                                    width="163"
                                  />
                                </NuxtLink>
                                <div class="flex items-center justify-center">
                                  <button
                                    class="rounded-full bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                    type="button"
                                    @click="mobileMenuOpen = false"
                                  >
                                    <span class="sr-only">Close panel</span>

                                    <CloseIcon />
                                  </button>
                                </div>
                              </div>
                            </div>
                            <div class="relative mt-2 flex-1">
                              <div class="absolute inset-0">
                                <div class="h-full">
                                  <nav class="" aria-label="Sidebar">
                                    <div class="px-6 py-6">
                                      <NuxtLink
                                        href="/shop"
                                        class="block w-full rounded-full border-2 border-primary py-3 text-center font-normal text-primary"
                                      >
                                        <span class="truncate">Shop all</span>
                                      </NuxtLink>
                                      <MenusDivisionsMenuMobile
                                        :divisions-menu="topMenu"
                                      />
                                    </div>
                                    <MenusMainMenuMobile
                                      :current-menu="mainMenu"
                                      :current-division="currentDivision"
                                    />
                                  </nav>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </DisclosurePanel>
                    </TransitionChild>
                  </DialogPanel>
                </TransitionChild>
              </div>
            </div>
          </div>
        </Dialog>
      </TransitionRoot>
      <!-- /Mobile Nav -->
    </Disclosure>

    <Transition name="slide-on-scroll" mode="out-in">
      <div v-if="showStickyBarCta" ref="stickyBarRef" class="z-0 transform">
        <StickyBarCta />
      </div>
    </Transition>
  </header>
</template>

<style lang="scss" scoped>
.slide-on-scroll-enter-active,
.slide-on-scroll-leave-active {
  transition: all 1.5s ease-out;
}

.slide-on-scroll-enter-active {
  animation: bounce-in 1.5s;
}
.slide-on-scroll-leave-active {
  animation: bounce-in 1.5s reverse;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  40% {
    transform: scale(1.04);
  }
  100% {
    transform: scale(1);
  }
}

.slide-on-scroll-enter-from,
.slide-on-scroll-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}

.slide-on-scroll-enter-to,
.slide-on-scroll-leave-from {
  opacity: 1;
  transform: translateY(100%);
}

/* delay enter of nested element for staggered effect */
.slide-on-scroll-enter-active .inner {
  transition-delay: 1.9s;
}

/*
  Enter and leave animations can use different
  durations and timing functions.
*/
.slide-on-scroll-fade-enter-active {
  transition: all 1.3s ease-out;
}

.slide-on-scroll-fade-leave-active {
  transition: all 1.3s cubic-bezier(1, 0.5, 0.8, 1);
}
</style>
