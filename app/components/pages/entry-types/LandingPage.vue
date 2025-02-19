<script setup lang="ts">
import { useFetch, ref } from '#imports'
import type { PagesLandingPageEntry, BreadcrumbItem } from '#shared/types'

import BreadcrumbsSection from '~/components/common/BreadcrumbsSection.vue'

interface Props {
  entry?: PagesLandingPageEntry | null
  breadcrumbs?: BreadcrumbItem[]
}

const props = withDefaults(defineProps<Props>(), {
  entry: null,
  breadcrumbs: () => [],
})

const hideBreadcrumbs = ref<boolean>(false)

const ids =
  props.entry?.standardContentBuilder
    ?.filter((entry) => entry !== null)
    .map((entry) => entry?.id) ?? []

const { data: standardContentBuilderEntries } = await useFetch(
  '/api/v1/matrixes/standard-content-builder',
  {
    method: 'POST',
    body: {
      ids,
    },
  },
)
</script>

<template>
  <main>
    <BreadcrumbsSection v-if="!hideBreadcrumbs" :items="props.breadcrumbs" />
    <MatrixesPageHero :entry="props.entry?.pageHero" />
    <MatrixesStandardContentBuilder :entry="standardContentBuilderEntries" />
  </main>
</template>
