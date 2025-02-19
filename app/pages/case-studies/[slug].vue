<script setup lang="ts">
import { computed, ref, toKebabCase, useFetch, useRoute } from '#imports'
import type {
  PagesContentPageEntry,
  BreadcrumbItem,
  StandardContentBuilderBlockEntry,
} from '#shared/types'
import { withoutLeadingSlash, withoutTrailingSlash } from 'ufo'

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

const route = useRoute()

const uri = withoutLeadingSlash(withoutTrailingSlash(route.path))

const { data: standardContentBuilderEntries } = await useFetch(
  '/api/v1/case-studies/post',
  {
    method: 'POST',
    body: {
      uri,
    },
  },
)

hideBreadcrumbs.value = props.entry?.hideBreadcrumbs ?? false

const entryClasses = computed(() => {
  return ['pages', toKebabCase(props.entry?.typeHandle)].join('--')
})
</script>

<template>
  <main class="mt-[14rem]" :class="entryClasses">
    <BreadcrumbsSection
      v-if="
        !hideBreadcrumbs &&
        props.breadcrumbs?.length &&
        props.breadcrumbs?.length > 1
      "
      :items="props.breadcrumbs"
    />
    <section class="generic-hero overflow-hidden">
      <div class="my-12 px-6">
        <div class="mx-auto max-w-container">
          <!-- H1 Heading and Copy -->
          <div class="text-center">
            <h1 class="text-4xl leading-tight md:text-5xl">
              {{ standardContentBuilderEntries?.title }}
            </h1>
          </div>
        </div>
      </div>
    </section>
    <MatrixesStandardContentBuilder
      :entry="
        standardContentBuilderEntries?.standardContentBuilder as Array<StandardContentBuilderBlockEntry>
      "
    />
  </main>
</template>
