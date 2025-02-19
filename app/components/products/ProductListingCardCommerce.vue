<script setup lang="ts">
import { ref } from '#imports'
import { truncate } from '~/utils'
import type { BigcommerceProductFieldsFragment } from '#shared/types'

import ProductCardInfo from '~/components/products/ProductCardInfo.vue'
import type { NormalizedProductVariant } from '~/components/products/ProductCardInfo.vue'

import { withLeadingSlash } from 'ufo'

interface Props {
  productLink: string
  primaryText: string
  secondaryText?: string
  featuredImage?: string
  productDescription?: string
  bigcommerceProduct?: BigcommerceProductFieldsFragment | null
}

const props = withDefaults(defineProps<Props>(), {
  featuredImage: '',
  secondaryText: '',
  productDescription: '',
  bigcommerceProduct: undefined,
})

// State

// const selectedVariant = ref(bcProduct.bcProductDefaultVariant)

const currentProductVariant = ref<NormalizedProductVariant>()

const cardImage = props.featuredImage ?? ''

const productLink = computed(() => withLeadingSlash(props.productLink))

const hasSalePrice = computed(() => {
  const _currentProductVariant = currentProductVariant.value

  if (!_currentProductVariant) return false

  return (
    _currentProductVariant.salePrice !== undefined &&
    _currentProductVariant.salePrice > 0 &&
    _currentProductVariant.salePrice < _currentProductVariant.price
  )
})
</script>

<template>
  <div class="mx-auto w-full max-w-md">
    <div
      class="relative z-10 h-full rounded-3xl border border-gray-300 p-5 hover:border-gray-50 hover:shadow-2xl"
    >
      <div class="flex h-full flex-col justify-between space-y-0">
        <div>
          <!-- Product Image -->
          <div v-if="cardImage" class="aspect-square relative z-1 mb-2">
            <!-- Sale Badge -->
            <div
              v-if="hasSalePrice"
              class="absolute z-10 flex w-full justify-end"
            >
              <span
                class="rounded-full bg-red-500 px-8 py-1 text-base uppercase text-white"
              >
                Sale
              </span>
            </div>

            <!-- Product Image -->
            <NuxtLink :to="productLink">
              <figure class="aspect-square">
                <NuxtImg
                  :srcset="cardImage"
                  class="lazyload lazyload-fade aspect-auto relative inset-0 block h-full w-full object-cover xl:aspect-fullimagecard"
                  width="400"
                  height="400"
                  loading="lazy"
                />
              </figure>
            </NuxtLink>
          </div>

          <!-- Product Info -->
          <div class="mb-2">
            <NuxtLink :to="productLink">
              <p
                class="text-sm text-gray-400"
                v-html="secondaryText || '&nbsp;'"
              />
              <h4 class="text-gray-800" v-html="primaryText" />
            </NuxtLink>
          </div>

          <!-- Product Description -->
          <div class="mb-8">
            <NuxtLink :to="productLink">
              <p
                class="text-sm text-gray-600"
                v-html="truncate(productDescription, 119)"
              />
            </NuxtLink>
          </div>
        </div>
        <ProductCardInfo
          v-model="currentProductVariant"
          :bigcommerce-product="props.bigcommerceProduct"
          :link="productLink"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.input-form {
  /* This will remove properly input focus box-shadow/ring */
  &:focus {
    box-shadow: none;
    --tw-ring-shadow: none;
  }

  &--search,
  &--select,
  &--textarea,
  &--text {
    /* `outline-none` will remove flicker when focusing the input */
    @apply min-h-12 w-full rounded-forminput border border-tertiary-light bg-white px-6 py-2 text-sm text-tertiary placeholder-tertiary/70 outline-none transition focus:border-primary;
  }

  &--search,
  &--textarea,
  &--text {
    @apply font-bold text-primary placeholder:font-normal;
  }

  &--search {
    @apply pr-14;

    /* Hide the native search icon */
    &:enabled:read-write:-webkit-any(
        :focus,
        :hover
      )::-webkit-search-cancel-button,
    &::-webkit-search-cancel-button {
      @apply hidden h-0 w-0;
    }
  }

  /* Input Select */
  &--select {
    @apply bg-chevron-select pl-7 pr-14;
    /* Custom select icon size */
    background-size: 0.375rem 0.25rem;
    /* Custom select icon position */
    background-position: right 1.5rem center;

    &-hasvalue {
      @apply font-bold text-primary;
    }

    &--small {
      @apply min-h-10 pl-5 pr-10 text-xs;
    }
  }

  /* Input Textarea */
  &--textarea {
    @apply min-h-40 py-6;
  }

  /* Checkbox */
  &--checkbox {
    --tw-ring-inset: none;
    --tw-ring-color: none;
    --tw-ring-shadow: none;
    @apply border-tertiary text-primary hover:border-2 hover:border-primary focus:border-primary focus:shadow-none;
  }

  /* white background `input-form--inputwhite` */
  &--inputwhite {
    @apply bg-white;
  }

  &--text-xs {
    @apply text-xs;
  }
}

h1,
h2,
h3,
h4,
h5,
h6 {
  @apply font-heading;
}
.large-font-content {
  .heading-3,
  h3 {
    font-size: 28px;
    line-height: 40px;
    @screen md {
      font-size: 42px;
      line-height: 60.5px;
    }
  }
  .heading-4,
  h4 {
    font-size: 24px;
    line-height: 39px;
    @screen md {
      font-size: 28px;
      line-height: 48px;
    }
  }
  li,
  p {
    font-size: 14px;
    line-height: 1.4;
    @screen md {
      font-size: 18px;
    }
  }
  br {
    display: none;
  }
  table {
    tr {
      td {
        font-size: 18px;
        line-height: 32px;
        @apply leading-8;
        h5 {
          font-size: 28px;
          line-height: 53px;
        }
      }
    }
  }
}
.small-font-content h1,
h1 {
  font-size: 2.5rem; /* 40px */
  line-height: 1.1;

  @screen md {
    font-size: 3rem; /* 48px */
    line-height: 1.4;
  }
}
.small-font-content h2,
.small-font-content h3,
.small-font-content h4,
h2,
h3,
h4 {
  @apply leading-tight;
}
.small-font-content h2,
h2 {
  font-size: 2.25rem; /* 36px */

  @screen md {
    font-size: 2.5rem; /* 40px */
  }
}
.small-font-content h3,
h3 {
  font-size: 2rem; /* 32px */
}
.small-font-content h4,
h4 {
  font-size: 1.5rem; /* 24px */
}
.small-font-content h5,
h5 {
  font-size: 1.125rem; /* 18px */
}
</style>
