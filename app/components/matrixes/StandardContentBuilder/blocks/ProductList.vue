<script setup lang="ts">
import { computed } from '#imports'
import type { PageSectionsProductListFieldsFragment } from '~~/server/codegen'

import ProductListingCardCommerce from '~/components/products/ProductListingCardCommerce.vue'
import { withLeadingSlash, withoutTrailingSlash } from 'ufo'

interface Props {
  block?: PageSectionsProductListFieldsFragment | null
}

const props = withDefaults(defineProps<Props>(), {
  block: undefined,
})

const products = computed(() => {
  return (props.block?.products ?? [])
    .filter((product) => product !== null && product !== undefined)
    .filter((product) => product.__typename === 'simpleProduct_Product')
    .map((product) => {
      let featuredImage: string = ''
      const _productFeaturedImage = product.productFeaturedImage[0]
      if (_productFeaturedImage?.__typename === 'products_Asset') {
        // featuredImage = _productFeaturedImage.imageTransforms?.[0]?.url ?? ''
        featuredImage = _productFeaturedImage.srcset ?? ''
      }

      return {
        id: product.id ?? '',
        title: product.title ?? '',
        description: product.excerptText ?? '',
        link: withLeadingSlash(withoutTrailingSlash(product.uri ?? '')),
        authorImage: '',
        authorName: '',
        date: '',
        primaryText: product.title ?? '',
        featuredImage,
        productFeaturedImage: featuredImage,
        productLink: product.uri ?? '',
        secondaryText: product.excerptText ?? '',
        productDescription: product.productDescription ?? '',
        bigcommerceProduct: product.bigcommerceProduct ?? null,
      }
    })
})

// Lifecycle
</script>

<template>
  <section>
    <!-- <div class="relative">{{ props.block?.typeHandle }}</div>
    <pre>{{ props.block }}</pre> -->
    <div class="sr-only -mt-36 mb-36 md:mb-0 md:mt-0">
      Product Listing Section
    </div>
    <div class="py-8">
      <div class="my-8 px-6">
        <div class="mx-auto max-w-container">
          <!-- Product Listing -->
          <div
            v-if="products.length > 0"
            class="grid gap-6 md:grid-cols-2 md:gap-8 lg:gap-11 xl:grid-cols-3"
          >
            <ProductListingCardCommerce
              v-for="product in products"
              :key="product.id"
              :bc-product="true"
              :featured-image="product.productFeaturedImage"
              :product-link="product.productLink"
              :primary-text="product.title"
              :secondary-text="''"
              :product-description="product.productDescription"
              :bigcommerce-product="product.bigcommerceProduct"
            />
          </div>
          <div v-else class="py-20 text-center text-2xl">No Results</div>
        </div>
      </div>
    </div>
  </section>
</template>
