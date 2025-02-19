<script setup lang="ts">
import { computed, useNuxtApp, useFetch } from '#imports'

import Typeform from '~/components/modals/Typeform.vue'
import Header from '~/components/layout/Header.vue'
import Footer from '~/components/layout/Footer.vue'

const { $eventBus } = useNuxtApp()

function handleGlobalClick(event: Event): void {
  $eventBus.$emit('layout-clicked', event)
}

const { data: stickyBarCta } = useFetch('/api/v1/singles/sticky-bar-cta')

const showStickyBarCta = computed(() => stickyBarCta.value?.isEnabled ?? false)
</script>

<template>
  <div @click.stop="handleGlobalClick">
    <Header />
    <main
      :class="
        showStickyBarCta
          ? 'mt-[146px] lg:mt-[183px]'
          : 'mt-[90px] lg:mt-[127px]'
      "
    >
      <slot />
    </main>

    <Footer />
    <ClientOnly>
      <Typeform />
    </ClientOnly>
  </div>
</template>
