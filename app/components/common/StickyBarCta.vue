<script setup lang="ts">
import { computed, useFetch } from '#imports'

import MainContainer from '~/components/layout/MainContainer.vue'

const { data: stickyBarCta } = useFetch('/api/v1/singles/sticky-bar-cta')

const showStickyBarCta = computed(() => stickyBarCta.value?.isEnabled ?? false)

const primaryLine = computed(() => stickyBarCta.value?.stickyBarRichTextContent)

const secondaryLine = computed(
  () => stickyBarCta.value?.stickyBarRichTextContentSecondary,
)

const showSecondaryLine = computed(
  () => !!secondaryLine.value && secondaryLine.value !== '',
)
</script>

<template>
  <div
    v-if="showStickyBarCta"
    class="flex h-14 w-full flex-col items-center justify-center bg-primary"
  >
    <MainContainer>
      <div
        class="prose mx-auto max-w-none text-xs sm:prose-sm prose-p:text-center prose-p:text-white prose-a:text-white prose-strong:font-bold prose-strong:text-white"
        :class="showSecondaryLine ? 'mb-0.5' : ''"
        v-html="primaryLine"
      ></div>

      <div
        v-if="showSecondaryLine"
        class="prose prose-sm mx-auto max-w-none prose-p:text-center prose-p:text-white prose-a:text-white prose-strong:font-bold prose-strong:text-white"
        v-html="secondaryLine"
      ></div>
    </MainContainer>
  </div>
</template>
