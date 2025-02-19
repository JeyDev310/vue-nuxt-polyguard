<script setup lang="ts">
import { computed, ref, useFetch } from '#imports'
import type {
  ProductCategoriesCatalogListingEntry,
  BreadcrumbItem,
} from '#shared/types'

import BreadcrumbsSection from '~/components/common/BreadcrumbsSection.vue'

interface Props {
  entry?: ProductCategoriesCatalogListingEntry | null
  breadcrumbs?: BreadcrumbItem[]
}

const props = withDefaults(defineProps<Props>(), {
  entry: null,
  breadcrumbs: () => [],
})

const hideBreadcrumbs = ref<boolean>(false)
const showCouponButton = ref<boolean>(false)

const topLevelProductCategoryId = computed(() => {
  const id = props.entry?.id
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
    <!-- <MatrixesPageHero :entry="props.entry?.pageHero" />

    <ProductsProductListingCommerce
      :show-coupon-button="showCouponButton"
      :top-level-product-category-id="topLevelProductCategoryId"
      :top-level-product-division-id="topLevelProductDivisionId"
    /> -->

    <MatrixesPageHero :entry="props.entry?.pageHero" />
    <LayoutMainContainer>
      <CtasSideImageCta />
    </LayoutMainContainer>
    <ProductsProductCatalogListingCommerce
      :show-coupon-button="showCouponButton"
      :top-level-product-category-id="topLevelProductCategoryId"
      :top-level-product-division-id="topLevelProductDivisionId"
    />
    <LayoutMainContainer>
      <ProductCategoriesAdditionalInfo />
    </LayoutMainContainer>
    <LayoutMainContainer>
      <CtasResourcesCta />
    </LayoutMainContainer>
    <MatrixesStandardContentBuilder :entry="standardContentBuilderEntries" />
  </main>
</template>
