<script setup lang="ts">
import { ref } from '#imports'
import type { SimpleProduct_Product } from '~~/server/codegen'

interface Props {
  product: SimpleProduct_Product
}

const props = withDefaults(defineProps<Props>(), {
  product: undefined,
})

const primaryText = ref(props.product.title ?? '')
const secondaryText = ref(props.product.excerptText ?? '')
const productDescription = ref(props.product.productDescription ?? '')
const productLink = ref(props.product.uri ?? '')
const featuredImage = ref(props.product.productFeaturedImage[0]?.url ?? '')
const productFeaturedImage = ref(
  props.product.productFeaturedImage[0]?.url ?? '',
)
</script>

<template>
  <ProductsProductListingCardCommerce
    :bc-product="true"
    :featured-image="featuredImage"
    :product-featured-image="productFeaturedImage"
    :product-link="productLink"
    :primary-text="primaryText"
    :secondary-text="secondaryText"
    :product-description="productDescription"
    :bigcommerce-product="
      (props.product.bigcommerceProduct as BigcommerceProductFieldsFragment) ??
      undefined
    "
  />
</template>
