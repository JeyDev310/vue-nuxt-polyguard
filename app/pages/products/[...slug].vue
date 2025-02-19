<script setup lang="ts">
import { withoutLeadingSlash, withoutTrailingSlash } from 'ufo'
import { navigateTo, useFetch, useHead, useRoute, useSeomatic } from '#imports'

import ProductCategoryByEntryType from '~/components/product-categories/ProductCategoryByEntryType.vue'

const route = useRoute()

const uri = withoutLeadingSlash(withoutTrailingSlash(route.fullPath))

const { data: productCategoryPageEntry } = await useFetch(
  '/api/v1/categories/product-category',
  {
    method: 'POST',
    body: {
      uri,
    },
  },
)

if (!productCategoryPageEntry.value) {
  await navigateTo('/404')
}

const { seomaticHeadData } = useSeomatic(productCategoryPageEntry)
useHead(seomaticHeadData)
</script>

<template>
  <ProductCategoryByEntryType :entry="productCategoryPageEntry" />
</template>
