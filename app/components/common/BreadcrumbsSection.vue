<script setup lang="ts">
import type { BreadcrumbItem } from '#shared/types'

import MainContainer from '~/components/layout/MainContainer.vue'
import Breadcrumbs from '~/components/common/Breadcrumbs.vue'

interface Props {
  items?: BreadcrumbItem[]
}

const props = withDefaults(defineProps<Props>(), {
  items: () => [],
})
</script>

<template>
  <section
    v-if="items.length > 1"
    class="border-b border-gray-200 py-3 shadow-sm"
  >
    <MainContainer>
      <Breadcrumbs :items="props.items" />
    </MainContainer>
  </section>
</template>
