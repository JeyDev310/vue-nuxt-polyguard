<script setup lang="ts">
import { computed, ref, watch } from '#imports'
import type { BigcommerceProductFieldsFragment } from '#shared/types'
import { formatToUsd } from '~/utils/currency'
import ProductOptions from '~/components/products/ProductOptions.vue'
// import AddToCartButton from '~/components/cart/AddToCartButton.vue'
// import QuantityAdjuster from '~/components/products/QuantityAdjuster.vue'
import ProductCardAddToCartButton from '../cart/ProductCardAddToCartButton.vue'

interface Props {
  bigcommerceProduct?: BigcommerceProductFieldsFragment | null
  modelValue?: NormalizedProductVariant
  view?: string
}

const props = withDefaults(defineProps<Props>(), {
  bigcommerceProduct: undefined,
  modelValue: undefined,
  view: undefined,
})

interface Emits {
  (
    event: 'update:modelValue',
    currentProductVariant?: NormalizedProductVariant,
  ): void
}

const emit = defineEmits<Emits>()

const selectedProductOptionsRaw =
  ref<Record<string, number>>(getDefaultOptions())

const quantity = ref<number>(1)

const productVariants = computed(() => props.bigcommerceProduct?.variants)

export type NormalizedProductVariant = {
  optionId?: number
  optionValueId?: number
  productId: number
  variantId: number
  price: number
  salePrice?: number
  sku: string
  inventoryLevel: number
}

const normalizedProductVariants = computed(() => {
  const vars: Array<NormalizedProductVariant> = []

  productVariants.value
    ?.filter((pV) => pV !== null && pV !== undefined)
    .forEach((pV) => {
      const { optionValues } = pV
      if (!optionValues) return

      if (optionValues.length === 0) {
        vars.push({
          productId: pV.productId ?? 0,
          variantId: pV.id ?? 0,
          price: pV.price ?? 0,
          salePrice: pV.salePrice ?? undefined,
          sku: pV.sku ?? '',
          inventoryLevel: pV.inventoryLevel ?? 0,
        })
        return
      }

      optionValues
        .filter((oV) => oV !== null && oV !== undefined)
        .forEach((oV) => {
          vars.push({
            optionId: oV.optionId ?? 0,
            optionValueId: oV.id ?? 0,
            productId: pV.productId ?? 0,
            variantId: pV.id ?? 0,
            price: pV.price ?? 0,
            salePrice: pV.salePrice ?? undefined,
            sku: pV.sku ?? '',
            inventoryLevel: pV.inventoryLevel ?? 0,
          })
        })
    })

  return vars
})

const selectedNormalizedVariant = computed(() => {
  const selected = Object.entries(selectedProductOptionsRaw.value)
  const filtered = normalizedProductVariants.value?.filter((nPV) => {
    return selected?.every((s) => {
      return nPV.optionId === parseInt(s[0]) && nPV.optionValueId === s[1]
    })
  })
  return filtered?.[0]
})

// const productMinQty = computed(() => {
//   if (!props.bigcommerceProduct) {
//     return 1
//   }

//   const { orderQuantityMinimum } = props.bigcommerceProduct
//   if (orderQuantityMinimum === null || orderQuantityMinimum === undefined) {
//     return 1
//   }
//   if (orderQuantityMinimum < 1) {
//     return 1
//   }

//   return orderQuantityMinimum
// })

// const productMaxQty = computed(() => {
//   if (!props.bigcommerceProduct) {
//     return 9999
//   }

//   const { orderQuantityMaximum } = props.bigcommerceProduct
//   if (orderQuantityMaximum === null || orderQuantityMaximum === undefined) {
//     return 9999
//   }

//   if (orderQuantityMaximum < 1) {
//     return 9999
//   }

//   return orderQuantityMaximum
// })

const isInStock = computed(() => true)

watch(
  () => selectedProductOptionsRaw.value,
  () => {
    emit('update:modelValue', selectedNormalizedVariant.value)
  },
  { deep: true, immediate: true },
)

function getDefaultOptions(): Record<string, number> {
  return (props.bigcommerceProduct?.options ?? []).reduce(
    (acc: Record<string, number>, option) => {
      if (!option) return acc

      const values = option.optionValues
      if (!values) return acc
      const defaultValue =
        values
          .filter((oV) => oV !== null && oV !== undefined)
          .find((v) => v.isDefault) ?? values[0]
      if (!defaultValue) return acc

      const optionId = option.id
      if (!optionId) return acc

      const defaultValueId = defaultValue.id
      if (!defaultValueId) return acc

      acc[optionId] = defaultValueId
      return acc
    },
    {},
  )
}
</script>

<template>
  <div class="text-right">
    <ProductOptions
      v-if="props.view !== 'lists'"
      v-model="selectedProductOptionsRaw"
      :options="props.bigcommerceProduct?.options"
    />

    <div
      class="relative my-2 flex w-full max-w-96 flex-wrap items-center justify-between"
    >
      <div
        v-if="selectedNormalizedVariant?.salePrice"
        class="flex flex-row items-center justify-start space-x-1"
      >
        <div class="text-lg font-bold text-red-500 @xs/add-to-cart:text-xl">
          {{ formatToUsd(selectedNormalizedVariant.salePrice) }}
        </div>
        <div
          class="@xs/add-to-cart:text-md text-sm font-bold text-gray-400 line-through"
        >
          {{ formatToUsd(selectedNormalizedVariant.price) }}
        </div>
      </div>

      <div
        v-else-if="selectedNormalizedVariant?.price"
        class="text-lg font-bold text-primary"
      >
        {{ formatToUsd(selectedNormalizedVariant.price) }}
      </div>

      <!-- <QuantityAdjuster
        v-if="selectedNormalizedVariant"
        v-model:model-value="quantity"
        :min-qty="productMinQty"
        :max-qty="productMaxQty"
      /> -->
      <ProductCardAddToCartButton
        v-if="selectedNormalizedVariant"
        :class="[props.view === 'lists' ? 'ml-8' : '']"
        :qty="quantity"
        :in-stock="isInStock"
        :product-id="selectedNormalizedVariant.productId"
        :variant-id="selectedNormalizedVariant.variantId"
      />
    </div>
  </div>
</template>
