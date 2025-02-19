<script lang="ts" setup>
import {
  Popover,
  PopoverButton,
  PopoverPanel,
  PopoverOverlay,
} from '@headlessui/vue'
import { ref, watch, onBeforeUnmount } from 'vue'
import { useCartStore } from '~/stores/cart'
import BzScaleOnHover from '~/components/common/ui/effects/BzScaleOnHover.vue'
const cartStore = useCartStore()
const isOpen = ref(false)
let autoCloseTimeout: NodeJS.Timeout | null = null

// Watch for changes in cart quantity
watch(
  () => cartStore.getTotalLineItemsQty,
  (newQty, oldQty) => {
    // Only trigger if there's an actual change and it's not the initial load
    if (oldQty !== undefined && newQty !== oldQty) {
      // Clear any existing timeout
      if (autoCloseTimeout) {
        clearTimeout(autoCloseTimeout)
      }

      // Open the popover
      isOpen.value = true

      // Set timeout to close after 5 seconds
      autoCloseTimeout = setTimeout(() => {
        isOpen.value = false
        autoCloseTimeout = null
      }, 5000)
    }
  },
)

// Clean up timeout when component is unmounted
onBeforeUnmount(() => {
  if (autoCloseTimeout) {
    clearTimeout(autoCloseTimeout)
  }
})
</script>

<template>
  <Popover class="relative">
    <PopoverButton
      class="heading flex items-center gap-x-1 text-white hover:!border-0 hover:!outline-0 focus:!outline-0"
    >
      <div class="relative">
        <BzScaleOnHover size="large">
          <CommonIconsCart />
          <ClientOnly>
            <div
              v-if="cartStore.getTotalLineItemsQty > 0"
              class="count absolute -right-4 bottom-3 flex h-5 w-5 -translate-y-1 items-center justify-center rounded-full bg-yellow-600 text-xs text-white focus:outline-0"
            >
              <p class="text-sm">
                {{ cartStore.getTotalLineItemsQty }}
              </p>
            </div>
          </ClientOnly>
        </BzScaleOnHover>
      </div>
    </PopoverButton>
    <PopoverOverlay class="fixed inset-0 bg-black opacity-30" />
    <Transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0 translate-y-1"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-1"
    >
      <PopoverPanel
        class="show-arrow absolute right-0 top-7 z-30 mt-3"
        :static="isOpen"
      >
        <CartMiniCart />
      </PopoverPanel>
    </Transition>
  </Popover>
</template>
