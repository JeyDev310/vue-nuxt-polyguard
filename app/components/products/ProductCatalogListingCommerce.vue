<script setup lang="ts">
import { withLeadingSlash, withoutTrailingSlash } from 'ufo'
import { computed, onMounted, ref, useRuntimeConfig } from '#imports'
import { createSearchRepository } from '~~/server/integrations/craftcms/search/repository'
import {
  Dialog,
  DialogPanel,
  TransitionChild,
  TransitionRoot,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Switch,
} from '@headlessui/vue'
import {
  ChevronDownIcon,
  AdjustmentsHorizontalIcon,
  ChevronLeftIcon,
} from '@heroicons/vue/20/solid'
import { Bars3Icon, Squares2X2Icon } from '@heroicons/vue/24/outline'

import PriceSlider from '~/components/product-categories/PriceSlider.vue'
import MainContainer from '~/components/layout/MainContainer.vue'
import ProductCatalogCard from '~/components/products/ProductCatalogCard.vue'

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

// const showSearch = true

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

// function submitSearch() {
//   handleSearch()
// }

// function resetSearch() {
//   searchText.value = ''
//   handleSearch()
// }
const sortOptions = [
  { name: 'Price: Low to High', href: '#', current: false },
  { name: 'Price: High to Low', href: '#', current: false },
  { name: 'Name: (A-Z)', href: '#', current: false },
  { name: 'Name: (Z-A)', href: '#', current: false },
]

const filters = ref([
  {
    id: 'LoremIpsum',
    name: 'Lorem Ipsum',
    expanded: true, // Add this property
    options: [
      { checked: 0, label: 'Write text label here' },
      { checked: 0, label: 'Write text label here' },
      { checked: 1, label: 'Write text label here' },
      { checked: 0, label: 'Write text label here' },
      { checked: 1, label: 'Write text label here' },
      { checked: 0, label: 'Write text label here' },
    ],
  },
  {
    id: 'LoremIpsum2',
    name: 'Lorem ipsum',
    expanded: false, // Add this property
    options: [
      { checked: 0, label: 'Write text label here' },
      { checked: 0, label: 'Write text label here' },
      { checked: 0, label: 'Write text label here' },
    ],
  },
])
const mobileFiltersOpen = ref<boolean>(false)
const isOpen = ref<boolean>(false)

const enabled = ref<boolean>(true)

const view = ref<string>('cards')

function toggleView(selectedView: string) {
  view.value = selectedView
}

function toggleMenu() {
  isOpen.value = !isOpen.value
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
        <div class="container mx-auto">
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
                <!-- <div
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
                </div> -->
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
          <TransitionRoot as="template" :show="mobileFiltersOpen">
            <Dialog
              class="relative z-40 lg:hidden"
              @close="mobileFiltersOpen = false"
            >
              <TransitionChild
                as="template"
                enter="transition-opacity ease-linear duration-300"
                enter-from="opacity-0"
                enter-to="opacity-100"
                leave="transition-opacity ease-linear duration-300"
                leave-from="opacity-100"
                leave-to="opacity-0"
              >
                <div class="fixed inset-0 bg-black bg-opacity-25" />
              </TransitionChild>

              <div class="fixed inset-0 z-40 flex">
                <TransitionChild
                  as="template"
                  enter="transition ease-in-out duration-300 transform"
                  enter-from="-translate-x-full"
                  enter-to="translate-x-0"
                  leave="transition ease-in-out duration-300 transform"
                  leave-from="translate-x-0"
                  leave-to="-translate-x-full"
                >
                  <DialogPanel
                    class="relative ml-auto flex h-full w-full flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl"
                  >
                    <div class="flex items-center justify-between px-4 pl-6">
                      <h2 class="text-lg font-medium text-gray-900">Filters</h2>
                      <button
                        type="button"
                        class="-mr-2 flex h-10 w-10 items-center justify-center p-2 text-gray-400 hover:text-gray-500"
                        @click="mobileFiltersOpen = false"
                      >
                        <span class="sr-only">Close menu</span>
                        <ChevronLeftIcon class="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>

                    <!-- Filters -->
                    <form class="mt-4">
                      <div
                        v-for="section in filters"
                        :key="section.id"
                        class="border-t border-gray-200 pb-4 pt-4"
                      >
                        <fieldset>
                          <legend class="w-full px-2">
                            <button
                              type="button"
                              class="flex w-full items-center justify-between p-2 text-gray-400 hover:text-gray-500"
                              @click="section.expanded = !section.expanded"
                            >
                              <span class="text-sm font-medium text-gray-900">{{
                                section.name
                              }}</span>
                              <span class="ml-6 flex h-7 items-center">
                                <ChevronDownIcon
                                  :class="{
                                    'rotate-180 transform': section.expanded,
                                  }"
                                  class="h-5 w-5 transition-transform duration-200"
                                  aria-hidden="true"
                                />
                              </span>
                            </button>
                          </legend>
                          <div v-if="section.expanded" class="px-4 pb-2 pt-4">
                            <div class="space-y-6">
                              <div
                                v-for="(option, optionIdx) in section.options"
                                :key="option.label"
                                class="flex items-center"
                              >
                                <input
                                  :id="`{section.id}-${optionIdx}-mobile`"
                                  :name="`{section.id}[]`"
                                  :value="option.checked"
                                  type="checkbox"
                                  class="h-4 w-4 rounded border-gray-300 text-[#348EF2] focus:ring-[#348EF2]"
                                  :checked="option.checked === 1"
                                />
                                <label
                                  :for="`{section.id}-{optionIdx}-mobile`"
                                  class="ml-3 text-sm text-gray-500"
                                  >{{ option.label }}</label
                                >
                              </div>
                            </div>
                          </div>
                        </fieldset>
                      </div>
                      <div class="border-t border-gray-200 pb-4 pt-4">
                        <fieldset>
                          <legend class="w-full px-2">
                            <div
                              class="flex w-full items-center justify-between p-2 text-gray-400 hover:text-gray-500"
                            >
                              <span class="text-sm font-medium text-gray-900"
                                >Price range</span
                              >
                            </div>
                          </legend>
                          <div class="px-4 pb-2 pt-4">
                            <div class="space-y-6">
                              <div class="flex items-center">
                                <PriceSlider />
                              </div>
                            </div>
                          </div>
                        </fieldset>
                      </div>
                      <div class="border-t border-gray-200 pb-4 pt-4">
                        <fieldset>
                          <div class="px-4 pb-2 pt-4">
                            <div class="space-y-6">
                              <div class="flex items-center">
                                <Switch
                                  v-model="enabled"
                                  :class="[
                                    enabled ? 'bg-primary' : 'bg-gray-200',
                                    'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out',
                                  ]"
                                >
                                  <span class="sr-only">Orderable online</span>
                                  <span
                                    aria-hidden="true"
                                    :class="[
                                      enabled
                                        ? 'translate-x-5'
                                        : 'translate-x-0',
                                      'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                                    ]"
                                  />
                                </Switch>
                                <p class="ml-3">Orderable online</p>
                              </div>
                            </div>
                          </div>
                        </fieldset>
                      </div>
                    </form>
                  </DialogPanel>
                </TransitionChild>
              </div>
            </Dialog>
          </TransitionRoot>
          <template v-if="!loading">
            <LayoutMainContainer>
              <main>
                <div
                  class="mx-auto flex max-w-2xl flex-row justify-between px-1 sm:px-1.5 lg:max-w-7xl lg:px-0 lg:pb-6 2xl:mx-0 2xl:max-w-none"
                >
                  <div
                    class="hidden items-center justify-center text-xl lg:flex"
                  >
                    <h6>Filters</h6>
                  </div>

                  <div
                    class="flex w-full justify-between text-white lg:w-auto lg:pr-2.5"
                  >
                    <button
                      type="button"
                      class="inline-flex items-center rounded-full bg-[#348EF2] px-10 py-2 lg:hidden"
                      @click="mobileFiltersOpen = true"
                    >
                      <span
                        class="text-Write text label here text-sm font-medium"
                        >Filters</span
                      >
                      <AdjustmentsHorizontalIcon
                        class="text-Write text label here ml-2 mt-1 h-5 w-5 flex-shrink-0"
                        aria-hidden="true"
                      />
                    </button>

                    <div
                      class="mr-5 hidden flex-row items-center justify-center gap-x-4 text-black lg:flex"
                    >
                      <button
                        :class="{
                          'text-primary': view === 'cards',
                          'text-black': view !== 'cards',
                        }"
                        class="flex flex-row items-center justify-between gap-x-2"
                        @click="toggleView('cards')"
                      >
                        <Squares2X2Icon class="h-5 w-5" />
                        <p>Cards</p>
                      </button>
                      <button
                        :class="{
                          'text-primary': view === 'lists',
                          'text-black': view !== 'lists',
                        }"
                        class="flex flex-row items-center justify-between gap-x-2"
                        @click="toggleView('lists')"
                      >
                        <Bars3Icon class="h-6 w-6" />
                        <p>List</p>
                      </button>
                    </div>

                    <Menu as="div" class="relative inline-block text-left">
                      <div>
                        <MenuButton
                          class="group flex justify-between gap-x-12 rounded-lg border-[0.74px] border-[#D1D1D1] px-4 py-2 text-sm font-medium text-black"
                          @click="toggleMenu"
                        >
                          Sort by
                          <ChevronDownIcon
                            :class="[
                              '-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-black',
                              { 'rotate-180': isOpen },
                            ]"
                            aria-hidden="true"
                          />
                        </MenuButton>
                      </div>

                      <transition
                        enter-active-class="transition ease-out duration-100"
                        enter-from-class="transform opacity-0 scale-95"
                        enter-to-class="transform opacity-100 scale-100"
                        leave-active-class="transition ease-in duration-75"
                        leave-from-class="transform opacity-100 scale-100"
                        leave-to-class="transform opacity-0 scale-95"
                      >
                        <MenuItems
                          v-if="isOpen"
                          class="bg-write text label here absolute right-0 z-10 mt-2 w-[148.5px] origin-top-right rounded-md shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none"
                        >
                          <div class="bg-white py-1">
                            <MenuItem
                              v-for="option in sortOptions"
                              :key="option.name"
                              v-slot="{ active }"
                            >
                              <a
                                :href="option.href"
                                :class="[
                                  option.current
                                    ? 'font-medium text-gray-900'
                                    : 'text-gray-500',
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-xs',
                                ]"
                                >{{ option.name }}</a
                              >
                            </MenuItem>
                          </div>
                        </MenuItems>
                      </transition>
                    </Menu>
                  </div>
                </div>
                <div class="lg:grid lg:grid-cols-4 lg:gap-x-8 xl:grid-cols-5">
                  <aside class="">
                    <h2 class="sr-only">Filters</h2>

                    <div class="hidden lg:block">
                      <div>
                        <form class="space-y-10 divide-y divide-gray-200">
                          <div
                            v-for="(section, sectionIdx) in filters"
                            :key="section.id"
                            :class="sectionIdx === 0 ? null : 'pt-10'"
                          >
                            <fieldset>
                              <legend
                                class="flex cursor-pointer items-center justify-between text-sm font-medium text-gray-900"
                                @click="section.expanded = !section.expanded"
                              >
                                <span>{{ section.name }}</span>
                                <span class="ml-2 flex h-5 items-center">
                                  <ChevronDownIcon
                                    :class="{
                                      'rotate-180 transform': section.expanded,
                                    }"
                                    class="h-5 w-5 transition-transform duration-200"
                                    aria-hidden="true"
                                  />
                                </span>
                              </legend>
                              <div
                                v-if="section.expanded"
                                class="space-y-3 pt-6"
                              >
                                <div
                                  v-for="(option, optionIdx) in section.options"
                                  :key="option.label"
                                  class="flex items-center"
                                >
                                  <input
                                    :id="`{section.id}-${optionIdx}`"
                                    :name="`{section.id}[]`"
                                    :value="option.checked"
                                    type="checkbox"
                                    class="h-4 w-4 rounded border-gray-300 text-[#348EF2] focus:ring-[#348EF2]"
                                    :checked="option.checked === 1"
                                  />
                                  <label
                                    :for="`{section.id}-{optionIdx}`"
                                    class="ml-3 text-sm text-gray-600"
                                    >{{ option.label }}</label
                                  >
                                </div>
                              </div>
                            </fieldset>
                          </div>

                          <div class="pt-10">
                            <legend
                              class="block text-sm font-medium text-gray-900"
                            >
                              Price range
                            </legend>
                            <div class="space-y-3 pt-6">
                              <div class="flex items-center">
                                <PriceSlider />
                              </div>
                            </div>
                          </div>
                          <div class="!mt-0 pt-10">
                            <div class="space-y-3">
                              <div class="flex items-center">
                                <Switch
                                  v-model="enabled"
                                  :class="[
                                    enabled ? 'bg-primary' : 'bg-gray-200',
                                    'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out',
                                  ]"
                                >
                                  <span class="sr-only">Orderable online</span>
                                  <span
                                    aria-hidden="true"
                                    :class="[
                                      enabled
                                        ? 'translate-x-5'
                                        : 'translate-x-0',
                                      'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                                    ]"
                                  />
                                </Switch>
                                <p class="ml-3">Orderable online</p>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </aside>
                  <div
                    v-if="products.length"
                    class="mt-6 lg:col-span-3 lg:mt-0 xl:col-span-4"
                  >
                    <div
                      :class="[
                        view === 'lists'
                          ? 'flex flex-col space-y-5'
                          : 'grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8',
                      ]"
                    >
                      <ProductCatalogCard
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
                        :view="view"
                      />
                    </div>
                  </div>
                  <div v-else class="py-20 text-center text-2xl">
                    No Results
                  </div>
                </div>
              </main>
            </LayoutMainContainer>
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
