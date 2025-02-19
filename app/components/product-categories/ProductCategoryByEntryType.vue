<script setup lang="ts">
import EntryTypeCatalogPage from './entry-types/CatalogPage.vue'
import EntryTypeCatalogListing from './entry-types/CatalogListing.vue'

import { computed, ref, toKebabCase, useRuntimeConfig } from '#imports'
import type { ProductCategoryEntry, BreadcrumbItem } from '#shared/types'

import { getBreadcrumbs } from '~~/server/integrations/craftcms/menus/api/get-breadcrumbs'

interface Props {
  entry?: ProductCategoryEntry | null
}

const props = withDefaults(defineProps<Props>(), {
  entry: null,
})

const config = useRuntimeConfig()
const { env } = config.public

const breadcrumbs = ref<Array<BreadcrumbItem>>([])

const entryClasses = computed(() => {
  return ['pages', toKebabCase(props.entry?.typeHandle)].join('--')
})

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
</script>

<template>
  <div :class="entryClasses">
    <EntryTypeCatalogPage
      v-if="props.entry?.__typename === 'productCategoriesCatalogPage_Entry'"
      :entry="props.entry"
      :breadcrumbs="breadcrumbs"
    />
    <EntryTypeCatalogListing
      v-else-if="
        props.entry?.__typename === 'productCategoriesCatalogListing_Entry'
      "
      :entry="props.entry"
      :breadcrumbs="breadcrumbs"
    />
    <div v-else>This product category hasn't been implemented!</div>
  </div>
</template>
