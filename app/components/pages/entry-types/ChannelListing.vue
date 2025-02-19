<script setup lang="ts">
import { ref } from '#imports'
import type { PagesChannelListingEntry, BreadcrumbItem } from '#shared/types'

import ChannelListingLayout from '~/components/layout/ChannelListingLayout.vue'
import BreadcrumbsSection from '~/components/common/BreadcrumbsSection.vue'

interface Props {
  entry?: PagesChannelListingEntry | null
  breadcrumbs?: BreadcrumbItem[]
}

const props = withDefaults(defineProps<Props>(), {
  entry: null,
  breadcrumbs: () => [],
})

const hideBreadcrumbs = ref<boolean>(false)
</script>

<template>
  <main>
    <BreadcrumbsSection v-if="!hideBreadcrumbs" :items="props.breadcrumbs" />
    <ChannelListingLayout
      :channel="props.entry?.listFromSection || undefined"
      :section-categories="props.entry?.sectionCategories || undefined"
      :category-slug="props.entry?.slug || undefined"
      :title="props.entry?.title || undefined"
      :page-size="9"
    />
  </main>
</template>
