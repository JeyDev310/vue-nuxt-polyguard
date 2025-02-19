<script lang="ts" setup>
import { ref, watch, navigateTo, useSearch } from '#imports'
import type { BreadcrumbItem } from '#shared/types'

import type { BlogMedia_Asset, SimpleProduct_Product } from '~~/server/codegen'

import BreadcrumbsSection from '~/components/common/BreadcrumbsSection.vue'

const {
  searchQuery,
  searchCategory,
  productItems,
  blogItems,
  resourceItems,
  isLoading,
} = useSearch()

// Update URL when search params change
watch(
  [searchQuery, searchCategory],
  () => {
    navigateTo({
      query: {
        query: searchQuery.value,
        category: searchCategory.value,
      },
    })
  },
  { deep: true },
)

const hideBreadcrumbs = ref<boolean>(false)

const breadcrumbs: Array<BreadcrumbItem> = [
  {
    name: 'Home',
    href: '/',
    current: false,
  },
  {
    name: 'Search',
    href: '/search',
    current: true,
  },
]
</script>

<template>
  <div>
    <BreadcrumbsSection v-if="!hideBreadcrumbs" :items="breadcrumbs" />
    <div>
      <div class="relative mt-10 px-6 before:opacity-5 lg:pb-6 lg:pt-3">
        <div class="mx-auto w-full max-w-container-header lg:px-18">
          <div
            class="flex w-full flex-col justify-between gap-10.5 pb-20 lg:flex-row lg:pb-14"
          >
            <h2
              class="font-newNavMenu text-3xl font-semibold text-neutral-text-gray md:text-5xl"
            >
              {{
                searchQuery ? `Search results for "${searchQuery}"` : 'Search'
              }}
            </h2>
            <NuxtLink
              to="/products"
              class="inline-flex h-12 min-h-10 cursor-pointer items-center justify-center rounded-full border-2 border-none bg-primary px-8 py-2 align-middle font-heading text-sm font-medium leading-tight text-white transition"
            >
              View All Ecommerce Products
            </NuxtLink>
          </div>

          <!-- Products Section -->
          <div
            v-if="productItems?.length > 0"
            class="flex flex-col gap-6 pb-20 lg:pb-14"
          >
            <div
              class="font-regular font-newNavMenu text-xl uppercase text-gray-2"
            >
              Products
            </div>
            <div class="grid grid-cols-1 gap-6 font-newNavMenu lg:grid-cols-3">
              <CardsProductListingCardCommerce
                v-for="(product, prItemsIdx) in productItems"
                :key="prItemsIdx"
                :product="product as SimpleProduct_Product"
                :search-item="true"
              />
            </div>
          </div>

          <!-- Blog Section -->
          <div
            v-if="blogItems?.length > 0"
            class="flex flex-col gap-6 pb-20 lg:pb-14"
          >
            <div
              class="font-regular font-newNavMenu text-xl uppercase text-gray-2"
            >
              Blog
            </div>
            <div
              class="grid grid-cols-1 gap-6 font-newNavMenu md:grid-cols-2 lg:grid-cols-4"
            >
              <CardsBlogListingCard
                v-for="(blog, blogItemsIndex) in blogItems
                  .filter((b) => b !== null && b !== undefined)
                  .map((b) => ({
                    image: b.blogFeaturedImage,
                    title: b.title ?? '',
                    uri: b.uri ?? '',
                    excerpt: b.excerptText ?? '',
                    category: {
                      title: b.blogCategories[0]?.title ?? '',
                      url: b.blogCategories[0]?.uri ?? '',
                    },
                  }))"
                :key="blogItemsIndex"
                :image="blog.image[0] as BlogMedia_Asset"
                :title="blog.title"
                :uri="blog.uri"
                :excerpt="blog.excerpt"
                :category="blog.category.title"
              />
            </div>
          </div>

          <!-- Resources Section -->
          <div
            v-if="resourceItems?.length > 0"
            class="flex flex-col gap-6 pb-20 lg:pb-14"
          >
            <!-- <div
              class="font-regular font-newNavMenu text-xl uppercase text-gray-2"
            >
              Resources
            </div>
            <div class="grid grid-cols-1 gap-4 lg:grid-cols-3">
              <CardsResourceListingCard
                v-for="(resource, resItemsIdx) in resourceItems"
                :key="resItemsIdx"
                :entry="resource"
              />
            </div> -->
          </div>
        </div>
      </div>
      <div v-if="!isLoading">
        <!-- Check if productItems, blogItems, or resourceItems are defined and have a length greater than 0 -->
        <div
          v-if="
            (productItems && productItems.length > 0) ||
            (blogItems && blogItems.length > 0) ||
            (resourceItems && resourceItems.length > 0)
          "
        >
          <!-- Markup Goes Here -->
        </div>
        <div v-else>
          <!-- Check if searchQuery exists -->
          <div v-if="searchQuery" class="mx-auto my-8 w-full">
            <p class="text-center font-sans text-4xl">
              Sorry, there were no results for that search term.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
