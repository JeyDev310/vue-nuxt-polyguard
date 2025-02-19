<script lang="ts" setup>
import ProductSimpleProduct from './product-types/SimpleProduct.vue'
import type { InternalApi } from 'nitropack'

interface Props {
  product: InternalApi['/api/v1/product']['post']
  productUri: string
}

const props = defineProps<Props>()
</script>

<template>
  <div>
    <ProductSimpleProduct
      v-if="props.product?.__typename === 'simpleProduct_Product'"
      :product-uri="props.productUri"
    />
    <div v-else>Product of type {{ product?.__typename }} not supported!</div>
  </div>
</template>
