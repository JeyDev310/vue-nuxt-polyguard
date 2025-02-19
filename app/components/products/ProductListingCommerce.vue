<script setup lang="ts">
import { withLeadingSlash, withoutTrailingSlash } from 'ufo'
import { computed, onMounted, ref, useRuntimeConfig } from '#imports'
import { createSearchRepository } from '~~/server/integrations/craftcms/search/repository'

import MainContainer from '~/components/layout/MainContainer.vue'
import ProductListingCardCommerce from '~/components/products/ProductListingCardCommerce.vue'

interface Props {
  showCouponButton?: boolean
  topLevelProductCategoryId?: number
  topLevelProductDivisionId?: number
}

const props = withDefaults(defineProps<Props>(), {
  showCouponButton: false,
  topLevelProductCategoryId: undefined,
  topLevelProductDivisionId: undefined,
})

const config = useRuntimeConfig()
const { env } = config.public

const productsRepository = createSearchRepository({ env })

type ProductsSearchResponseType = Awaited<
  ReturnType<typeof productsRepository.performProductSearch>
>

onMounted(async () => {
  await handleSearch()
})

const showSearch = true

// State
const loading = ref(true)
const searchText = ref('')
const selectedCategory = ref('')

const featuredProducts = ref<ProductsSearchResponseType>({
  productCount: 0,
  products: [],
})
// Methods

const topLevelProductCategory = {
  hasDescendants: false,
  descendants: [
    {
      slug: 'books',
      title: 'Books',
    },
    {
      slug: 'courses',
      title: 'Online Courses',
    },
    {
      slug: 'tools',
      title: 'Building Tools',
    },
    {
      slug: 'software',
      title: 'Software',
    },
  ],
}

const activeCategory = {
  slug: 'all',
  title: 'All Products',
}

const productListTitle = ''

const products = computed(() => {
  return (featuredProducts.value?.products ?? [])
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

function handleCategoryChange() {
  loading.value = true
  try {
    // Implement your category filter logic here
    // await fetchProducts({ category: selectedCategory.value })
  } finally {
    loading.value = false
  }
}

async function handleSearch() {
  // Implement debounced search logic here
  try {
    let productCategoriesIds: number[] | undefined = undefined
    if (props.topLevelProductCategoryId) {
      productCategoriesIds = [props.topLevelProductCategoryId]
    }

    let productDivisionsIds: number[] | undefined = undefined
    if (props.topLevelProductDivisionId) {
      productDivisionsIds = [props.topLevelProductDivisionId]
    }

    featuredProducts.value = await productsRepository.performProductSearch({
      productCategoriesIds,
      productDivisionsIds,
      searchText: searchText.value,
    })
  } finally {
    loading.value = false
  }
}

function submitSearch() {
  handleSearch()
}

function resetSearch() {
  searchText.value = ''
  handleSearch()
}
</script>

<template>
  <div
    v-if="showCouponButton"
    id="product-listing-section"
    class="sr-only -mt-36 mb-36 md:mb-0 md:mt-0"
  >
    Product Listing Section
  </div>

  <div :class="showCouponButton ? 'my-20 md:py-40' : ''">
    <!-- Filter -->
    <div>
      <div class="px-6">
        <div class="mx-auto max-w-container">
          <!-- <div
            v-if="topLevelProductCategory.hasDescendants"
            class="mb-1 indent-5 text-xs"
          >
            Filter by
          </div> -->

          <div class="flex flex-col justify-between gap-5 md:flex-row">
            <!-- Left Column -->
            <div class="md:6/12 w-full lg:w-7/12">
              <h2 class="text-4xl leading-tight md:text-5xl">
                {{ productListTitle }}
              </h2>

              <div
                v-if="topLevelProductCategory.hasDescendants"
                class="flex flex-wrap gap-5"
              >
                <div class="flex-1 sm:max-w-xs">
                  <select
                    v-model="selectedCategory"
                    class="input-form input-form--select input-form--text-xs"
                    @change="handleCategoryChange"
                  >
                    <option value="">All</option>
                    <option
                      v-for="category in topLevelProductCategory.descendants"
                      :key="category.slug"
                      :value="category.slug"
                      :selected="
                        activeCategory && activeCategory.slug === category.slug
                      "
                    >
                      {{ category.title }}
                    </option>
                  </select>
                </div>
              </div>
            </div>

            <!-- Right Column -->
            <div class="md:6/12 w-full lg:w-4/12">
              <div class="sm:max-w-md">
                <!-- Coupon Button Section -->
                <div
                  v-if="showCouponButton"
                  class="flex items-center justify-end"
                >
                  <label class="mr-2">Get 30% Off</label>
                  <div class="relative">
                    <div
                      class="button--coupon group relative h-12 w-48 cursor-pointer overflow-hidden rounded-lg border border-orange transition-all duration-1000"
                    >
                      <div
                        class="absolute inset-0 flex flex-col items-center justify-center"
                      >
                        <span>BuildScience101</span>
                        <span class="text-xs text-gray-2"
                          >Ends Dec 31, 2023</span
                        >
                      </div>
                      <div
                        class="button--coupon--inner absolute inset-0 flex items-center justify-center text-black transition-all duration-1000 group-hover:text-black"
                      >
                        <div
                          class="flex h-[44px] -translate-x-3 -translate-y-full flex-col items-center justify-center"
                        >
                          <span>Reveal Coupon Code</span>
                        </div>
                      </div>
                    </div>
                    <span
                      class="absolute bottom-0 left-0 w-full translate-y-full py-1 text-center text-gray-2"
                    >
                      *Limit one per customer
                    </span>
                  </div>
                </div>

                <!-- Search Section -->
                <div
                  v-else-if="showSearch"
                  class="justify-center gap-x-4 space-y-4 sm:flex sm:space-y-0"
                >
                  <div class="flex-1">
                    <div class="relative">
                      <input
                        id="text-input-search"
                        v-model="searchText"
                        type="search"
                        placeholder="Product Search"
                        class="input-form input-form--text input-form--search input-form--text-xs"
                      />
                      <button
                        v-if="searchText"
                        type="button"
                        class="absolute inset-y-0 right-6 my-auto h-4 w-4 bg-input-search-icon-clear"
                        @click="resetSearch"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    class="inline-flex min-h-10 cursor-pointer items-center rounded-3xl border-2 border-secondary bg-secondary px-8 py-2 align-middle font-heading text-xs font-medium leading-tight text-white transition focus:bg-secondary-dark lg:hover:border-secondary-dark lg:hover:bg-secondary-dark"
                    @click="submitSearch"
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Products Section -->
    <section>
      <div class="my-8">
        <MainContainer>
          <!-- Product Listing -->
          <template v-if="!loading">
            <div
              v-if="products.length"
              class="grid gap-6 md:grid-cols-2 md:gap-8 lg:gap-11 xl:grid-cols-3"
            >
              <ProductListingCardCommerce
                v-for="product in products"
                :key="product.id"
                :bc-product="true"
                :featured-image="product.featuredImage"
                :product-featured-image="product.productFeaturedImage"
                :product-link="product.productLink"
                :primary-text="product.primaryText"
                :secondary-text="product.secondaryText"
                :product-description="product.productDescription"
                :bigcommerce-product="product.bigcommerceProduct"
              />
            </div>
            <div v-else class="py-20 text-center text-2xl">No Results</div>
          </template>

          <!-- Loading Placeholder -->
          <div
            v-else
            class="grid animate-pulse gap-8 sm:grid-cols-2 lg:grid-cols-3 2xl:gap-11"
          >
            <div
              v-for="i in 9"
              :key="i"
              class="relative z-10 flex h-full flex-col justify-between space-y-5 rounded-3xl border border-gray-300 p-5 hover:border-gray-50 hover:shadow-2xl"
            >
              <div>
                <div class="h-80 rounded-2xl bg-gray-100" />
                <div class="mt-8 h-16 rounded bg-gray-100" />
                <div class="mt-8 h-12 rounded-full bg-gray-200" />
                <div class="mt-8 flex flex-row justify-between space-x-8">
                  <div class="h-14 w-30 rounded bg-gray-100" />
                  <div class="h-14 w-30 rounded-full bg-gray-200" />
                </div>
                <div class="mt-8 h-12 rounded-full bg-gray-200" />
              </div>
            </div>
          </div>
        </MainContainer>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.button--coupon {
  .button--coupon--inner {
    display: inline-block;
    @apply border-l-[24px] border-r-0 border-t-[44px] border-orange border-l-transparent;
  }
  &:hover .button--coupon--inner {
    transform: translateX(calc(100% - 26px));
  }
}
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
</style>
