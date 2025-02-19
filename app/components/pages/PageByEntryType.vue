<script setup lang="ts">
import EntryTypeChannelListing from './entry-types/ChannelListing.vue'
import EntryTypeContentPage from './entry-types/ContentPage.vue'
import EntryTypeFaqListing from './entry-types/FaqListing.vue'
import EntryTypeLandingPage from './entry-types/LandingPage.vue'
import EntryTypeProductListing from './entry-types/ProductListing.vue'
import EntryTypeResourceListing from './entry-types/ResourceListing.vue'

import { computed, ref, toKebabCase, useRuntimeConfig } from '#imports'
import type { PageEntry, BreadcrumbItem } from '#shared/types'

import { getBreadcrumbs } from '~~/server/integrations/craftcms/menus/api/get-breadcrumbs'

interface Props {
  entry?: PageEntry | null
}
const config = useRuntimeConfig()
const { env } = config.public

const props = withDefaults(defineProps<Props>(), {
  entry: null,
})

const breadcrumbs = ref<Array<BreadcrumbItem>>([])

if (props.entry?.uri !== '__home__') {
  const breadcrumbsData = await getBreadcrumbs(props.entry?.uri ?? '', { env })
  breadcrumbs.value = [
    {
      name: 'Homepage',
      href: '/',
      current: false,
    },
  ]
  breadcrumbsData?.ancestors.forEach((ancestor) =>
    breadcrumbs.value?.push({
      name: ancestor.title ?? '',
      href: ancestor.uri ?? '',
      current: false,
    }),
  )
  breadcrumbs.value?.push({
    name: props.entry?.title ?? '',
    href: props.entry?.uri ?? '',
    current: true,
  })
}

const entryClasses = computed(() => {
  return ['pages', toKebabCase(props.entry?.typeHandle)].join('--')
})
</script>

<template>
  <div :class="entryClasses">
    <EntryTypeChannelListing
      v-if="props.entry?.__typename === 'pagesChannelListing_Entry'"
      :entry="props.entry"
      :breadcrumbs="breadcrumbs"
    />
    <EntryTypeContentPage
      v-else-if="props.entry?.__typename === 'pagesContentPage_Entry'"
      :entry="props.entry"
      :breadcrumbs="breadcrumbs"
    />
    <EntryTypeFaqListing
      v-else-if="props.entry?.__typename === 'pagesFaqListing_Entry'"
      :entry="props.entry"
      :breadcrumbs="breadcrumbs"
    />
    <EntryTypeLandingPage
      v-else-if="props.entry?.__typename === 'pagesLandingPage_Entry'"
      :entry="props.entry"
      :breadcrumbs="breadcrumbs"
    />
    <EntryTypeProductListing
      v-else-if="props.entry?.__typename === 'pagesProductListing_Entry'"
      :entry="props.entry"
      :breadcrumbs="breadcrumbs"
    />
    <EntryTypeResourceListing
      v-else-if="props.entry?.__typename === 'pagesResourceListing_Entry'"
      :entry="props.entry"
      :breadcrumbs="breadcrumbs"
    />
  </div>
</template>
