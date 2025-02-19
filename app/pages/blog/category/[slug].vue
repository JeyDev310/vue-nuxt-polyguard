<script setup lang="ts">
import { withoutLeadingSlash, withoutTrailingSlash } from 'ufo'
import type { BreadcrumbItem } from '#shared/types'
import { ref, useHead, useRoute, useSeomatic } from '#imports'
import ChannelListingLayout from '~/components/layout/ChannelListingLayout.vue'

import BreadcrumbsSection from '~/components/common/BreadcrumbsSection.vue'

const route = useRoute()

const categorySlug = withoutLeadingSlash(withoutTrailingSlash(route.path))

const hideBreadcrumbs = ref<boolean>(false)

const { data: category } = await useFetch('/api/v1/blog/category', {
  method: 'POST',
  body: {
    uri: categorySlug,
  },
})

if (!category?.value) {
  throw createError({
    statusCode: 404,
    message: 'Category Not Found',
  })
}
const { seomaticHeadData } = useSeomatic(category)
useHead(seomaticHeadData)

const breadcrumbs: Array<BreadcrumbItem> = [
  { name: 'Home', href: '/', current: false },
  { name: 'Blog', href: '/blog', current: false },
  {
    name: category?.value.title || 'Category',
    href: route.fullPath,
    current: true,
  },
]
</script>

<template>
  <div>
    <template v-if="category">
      <BreadcrumbsSection v-if="!hideBreadcrumbs" :items="breadcrumbs" />
      <ChannelListingLayout
        channel="blog"
        :section-categories="'blogCategories'"
        :title="category.title ?? undefined"
        :category-slug="categorySlug"
        :page-size="9"
      />
    </template>
    <p v-else>Category not found.</p>
  </div>
</template>
