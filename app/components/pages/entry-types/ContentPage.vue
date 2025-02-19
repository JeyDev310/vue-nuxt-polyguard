<script setup lang="ts">
import { ref, useFetch } from '#imports'
import type { PagesContentPageEntry, BreadcrumbItem } from '#shared/types'

import BreadcrumbsSection from '~/components/common/BreadcrumbsSection.vue'

interface Props {
  entry?: PagesContentPageEntry | null
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

hideBreadcrumbs.value = props.entry?.hideBreadcrumbs ?? false
</script>

<template>
  <main>
    <BreadcrumbsSection v-if="!hideBreadcrumbs" :items="props.breadcrumbs" />
    <MatrixesPageHero :entry="props.entry?.pageHero" />
    <section
      v-if="(props.entry?.pageHero?.length ?? 0) < 1"
      class="generic-hero overflow-hidden"
    >
      <div class="my-16 px-6">
        <div class="mx-auto max-w-container">
          <!-- H1 Heading and Copy -->
          <div class="text-center">
            <h1 class="text-4xl leading-tight md:text-5xl">
              {{ props.entry?.title }}
            </h1>
          </div>
        </div>
      </div>
    </section>
    <MatrixesStandardContentBuilder :entry="standardContentBuilderEntries" />
  </main>
</template>
