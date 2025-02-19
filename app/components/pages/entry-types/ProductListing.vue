<script setup lang="ts">
import { computed, ref, useFetch } from '#imports'
import type { PagesProductListingEntry, BreadcrumbItem } from '#shared/types'

import BreadcrumbsSection from '~/components/common/BreadcrumbsSection.vue'

interface Props {
  entry?: PagesProductListingEntry | null
  breadcrumbs?: BreadcrumbItem[]
}

const props = withDefaults(defineProps<Props>(), {
  entry: null,
  breadcrumbs: () => [],
})

const hideBreadcrumbs = ref<boolean>(false)
const showCouponButton = ref<boolean>(false)

const topLevelProductCategoryId = computed(() => {
  const id = props.entry?.topLevelProductCategory[0]?.id
  return id ? Number(id) : 0 // or any other appropriate default number
})

const topLevelProductDivisionId = computed(() => {
  const id = props.entry?.topLevelProductDivision[0]?.id
  return id ? Number(id) : 0 // or any other appropriate default number
})

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
    <section
      v-if="(props.entry?.pageHero?.length ?? 0) < 1"
      class="generic-hero"
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
    <ProductsProductListingCommerce
      :show-coupon-button="showCouponButton"
      :top-level-product-category-id="topLevelProductCategoryId"
      :top-level-product-division-id="topLevelProductDivisionId"
    />

    <MatrixesStandardContentBuilder :entry="standardContentBuilderEntries" />
  </main>
</template>
