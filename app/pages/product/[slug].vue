<script setup lang="ts">
import {
  withoutLeadingSlash,
  withoutTrailingSlash,
  withLeadingSlash,
} from 'ufo'
import {
  ref,
  useRoute,
  navigateTo,
  useFetch,
  useSeomatic,
  useHead,
} from '#imports'
import type { BreadcrumbItem } from '#shared/types'

import ProductByProductType from '~/components/products/ProductByProductType.vue'
import BreadcrumbsSection from '~/components/common/BreadcrumbsSection.vue'

const route = useRoute()

const productUri = withoutLeadingSlash(withoutTrailingSlash(route.path))

const { data: product } = await useFetch('/api/v1/product', {
  method: 'POST',
  body: {
    uri: productUri,
  },
})

if (!product.value) {
  await navigateTo('/404')
}

const hideBreadcrumbs = ref<boolean>(false)

const breadcrumbs: Array<BreadcrumbItem> = [
  {
    name: 'Home',
    href: '/',
    current: false,
  },
  {
    name: 'Products',
    href: '/products',
    current: false,
  },
  {
    name: product.value?.title || '',
    href: product.value?.uri ? withLeadingSlash(product.value.uri) : '#',
    current: true,
  },
]

const { seomaticHeadData } = useSeomatic(product)
useHead(seomaticHeadData)
</script>

<template>
  <div>
    <BreadcrumbsSection v-if="!hideBreadcrumbs" :items="breadcrumbs" />
    <ProductByProductType :product="product" :product-uri="productUri" />
  </div>
</template>
