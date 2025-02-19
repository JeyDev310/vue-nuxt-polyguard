<script lang="ts" setup>
import { withLeadingSlash } from 'ufo'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Thumbs } from 'swiper/modules'
import SwiperCore from 'swiper'
import 'swiper/css'
import 'swiper/css/thumbs'
import 'swiper/css/free-mode'
import { computed, ref, navigateTo, useFetch } from '#imports'
import type { Media_Asset, Products_Asset } from '~~/server/codegen'

import MainContainer from '~/components/layout/MainContainer.vue'
import ProductInfo from '~/components/products/ProductInfo.vue'
import RightArrowIcon from '~/components/common/icons/RightArrow.vue'
import ResourceCard from '~/components/resources/ResourceCard.vue'
import SwiperButton from '~/components/common/SwiperButton.vue'

SwiperCore.use([Navigation, Thumbs])
interface Props {
  productUri: string
}

const props = defineProps<Props>()

const { data: product } = await useFetch('/api/v1/product/simple-product', {
  method: 'POST',
  body: {
    uri: props.productUri,
  },
})

const isBestSellerBeginning = ref<boolean>(true)
const isBestSellerEnd = ref<boolean>(false)

function onBestSellerSwipe(swiper: SwiperCore) {
  isBestSellerBeginning.value = swiper.isBeginning
  isBestSellerEnd.value = swiper.isEnd
}

function onBestSellerSlideChange(swiper: SwiperCore) {
  isBestSellerBeginning.value = swiper.isBeginning
  isBestSellerEnd.value = swiper.isEnd
}

if (!product.value) {
  await navigateTo('/404', { redirectCode: 404 })
}

const thumbsSwiper = ref<SwiperCore | null>(null)

const hasCompanionProducts = computed(
  () => (product.value?.commerceCompanionProducts || []).length > 0,
)

const allMedia = computed(() => {
  const featuredImage = product.value?.productFeaturedImage || []
  const sliderMedia = product.value?.productSliderMedia || []
  return [...featuredImage, ...sliderMedia]
})

function onThumbsSwiper(swiper: SwiperCore) {
  thumbsSwiper.value = swiper
}

// function resourceClassesByFileType(fileType: string) {
//   switch (fileType.toUpperCase()) {
//     case 'PDF':
//       return 'bg-[#60b8b8] py-2 px-8 rounded-3xl font-medium text-white text-sm'
//     case 'DWG':
//       return 'bg-[#348ef2] py-2 px-8 rounded-3xl font-medium text-white text-sm'
//     default:
//       return 'bg-[#60b8b8] py-2 px-8 rounded-3xl font-medium text-white text-sm'
//   }
// }
const isMobileSwiper = ref(false)

const checkIfMobile = () => {
  if (window.innerWidth < 1024) {
    isMobileSwiper.value = true
  } else {
    isMobileSwiper.value = false
  }
}

const isVisible = ref(false)
let lastScrollY = 0
const scrollThreshold = 100 // Adjust this value to change sensitivity

const handleScroll = () => {
  const currentScrollY = window.scrollY
  const scrollDifference = currentScrollY - lastScrollY

  if (currentScrollY > 100) {
    // Show when scrolling down
    if (scrollDifference > 0) {
      isVisible.value = true
    }
    // Hide only if scrolling up beyond the threshold
    else if (scrollDifference < -scrollThreshold) {
      isVisible.value = false
    }
  } else {
    isVisible.value = false // Always hide when near the top
  }

  lastScrollY = currentScrollY
}

const observer = ref<IntersectionObserver | null>(null)

onMounted(async () => {
  checkIfMobile()
  window.addEventListener('resize', checkIfMobile)
  window.addEventListener('scroll', handleScroll)
  observer.value = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activeTab.value = entry.target.id
        }
      })
    },
    { rootMargin: '-40% 0px -40% 0px', threshold: 0.1 },
  )

  tabLinks.forEach((id) => {
    const section = document.getElementById(id.title)
    if (section && observer.value) observer.value.observe(section)
  })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  if (observer.value) observer?.value.disconnect()
})

const truncatedTitle = (title: string) => {
  return title.length > 30 ? title.substring(0, 30) + '...' : title
}

// const technicalDetailsContent = [
//   {
//     title: 'Blandit accumsan',
//     content:
//       'Lorem ipsum dolor sit amet consectetur. Vitae lectus cursus suscipit eu porttitor tortor cras. Vitae porttitor ligula tempus platea. Aliquet ut aliquet id eu morbi semper.',
//   },
//   {
//     title: 'Lorem ipsum dolor',
//     content:
//       'Posuere consectetur sociis lacus duis sed sed blandit accumsan. Sit eu non purus orci gravida nunc consectetur nulla. Semper at nulla egestas mattis vitae gravida. Id gravida velit elit fringilla. Pharetra netus ut est neque vivamus sit interdum elementum.',
//   },
//   {
//     title: 'Terdum elementum',
//     content:
//       'Porttitor tortor cras. Vitae porttitor ligula tempus platea. Aliquet ut aliquet id eu morbi semper.',
//   },
//   {
//     title: 'Lorem ipsum dolor',
//     content:
//       'Sit eu non purus orci gravida nunc consectetur nulla. Semper at nulla egestas mattis vitae gravida. Id gravida velit elit fringilla. Pharetra netus ut est neque vivamus sit interdum elementum.',
//   },
//   {
//     title: 'Pharetra netus ut est neque vivamus',
//     content: '46.1 cm (18.1 inches)',
//   },
// ]

const tabLinks = [
  {
    title: 'Overview',
  },
  {
    title: 'Companion products',
  },
  {
    title: 'Product Resources',
  },
  {
    title: 'Features & Benefits',
  },
  {
    title: 'Best sellers',
  },
]
const activeTab = ref('Overview')
const scrollToSection = (id: string) => {
  const section = document.getElementById(id)
  if (section) {
    const offset = 150 // Space from the top
    const top = section.getBoundingClientRect().top + window.scrollY - offset

    window.scrollTo({ top, behavior: 'smooth' })
  }
}
</script>

<template>
  <div>
    <div
      :class="[
        'fixed left-0 top-0 z-50 w-full bg-gray-100 transition-all duration-500 ease-in-out',
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0',
      ]"
    >
      <MainContainer>
        <div
          :class="
            isMobileSwiper
              ? 'py-3'
              : 'flex flex-col items-center py-3 lg:flex-row lg:justify-between'
          "
        >
          <div class="text-left">
            <h1 class="my-4 text-3xl leading-tight">
              {{ product?.title }}
            </h1>
            <div
              class="flex w-full touch-auto gap-x-6 overflow-x-auto scroll-smooth whitespace-nowrap text-gray-500 scrollbar-hide"
            >
              <button
                v-for="(tab, index) in tabLinks"
                :key="index"
                class="relative py-2 text-sm font-medium"
                :class="
                  activeTab === tab.title
                    ? 'text-blue-500'
                    : 'hover:text-gray-700'
                "
                @click="scrollToSection(tab.title)"
              >
                {{ tab.title }}
                <span
                  v-if="activeTab === tab.title"
                  class="absolute bottom-[-1px] left-0 h-0.5 w-full bg-blue-500"
                >
                </span>
              </button>
            </div>
          </div>
          <ProductInfo
            :bigcommerce-product="product?.bigcommerceProduct"
            :view="`lists`"
          />
        </div>
      </MainContainer>
    </div>
    <!-- Product Overview -->
    <section id="Overview" class="my-12 bg-white">
      <MainContainer>
        <div class="flex flex-col">
          <div class="relative my-10 space-y-20">
            <!-- H1 Heading and Copy -->
            <!-- <h1 class="text-center text-4xl leading-tight md:text-5xl">
              {{ product?.title }}
            </h1> -->

            <div
              class="flex flex-col justify-between gap-x-5 gap-y-32 lg:flex-row lg:gap-x-8 lg:gap-y-10"
            >
              <!-- Head Title -->
              <div
                class="rounded-lg bg-gray-100 p-4 lg:order-2 lg:w-5/12 lg:max-w-[35rem]"
              >
                <div class="lg:mb-10 lg:mt-16">
                  <h1 class="text-4xl font-medium leading-tight">
                    {{ product?.title }}
                  </h1>
                  <div class="prose prose-gray max-w-none">
                    <div
                      class="prose prose-gray font-light"
                      v-html="product?.productDescription"
                    />
                  </div>
                </div>

                <NuxtLink
                  v-if="!product?.returnable"
                  to="/return-policy"
                  class="item-center mt-4 flex justify-center gap-2 rounded-md border-2 border-orange-400 px-4 py-4 text-orange-400"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="h-6 w-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                    />
                  </svg>
                  <span class="leading-6">This item is non-returnable</span>
                </NuxtLink>
                <div>
                  <NuxtLink
                    v-if="product?.productCtaButton[0]?.linkUri"
                    class="inline-flex min-h-10 cursor-pointer items-center rounded-3xl px-8 py-2 align-middle font-heading text-sm font-medium leading-tight text-primary no-underline transition"
                    :to="
                      product.productCtaButton[0]?.linkUri
                        ? withLeadingSlash(product.productCtaButton[0].linkUri)
                        : undefined
                    "
                    >{{ product.productCtaButton[0]?.linkText }}
                    <RightArrowIcon class="ml-1 h-3 w-7" />
                  </NuxtLink>
                </div>
                <ProductsSimpleProductInfo
                  :bigcommerce-product="product?.bigcommerceProduct"
                />
              </div>
              <!-- END: Head Title -->
              <!-- Slider Gallery -->
              <div class="lg:w-7/12 lg:max-w-[40.75rem]">
                <div class="relative flex flex-col space-y-3 sm:space-y-6">
                  <div class="block w-full flex-1">
                    <div class="relative">
                      <!-- Navigation Controls -->
                      <div class="absolute inset-0 flex h-full w-full">
                        <button
                          type="button"
                          aria-label="Previous"
                          class="swiper-button-prev navigation-control slider-product-overview__control slider-product-overview__control-prev text-gray-900 hover:bg-white"
                        >
                          <svg
                            class="navigation-control__arrow rotate-180 transform fill-current"
                            width="18"
                            height="12"
                            viewBox="0 0 18 12"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M19.4142136,10.3431458 L24.363961,15.2928932 C24.7544853,15.6834175 24.7544853,16.3165825 24.363961,16.7071068 L19.4142136,21.6568542 L18,20.2426407 L21.242,16.9991458 L7,17 L7,15 L21.24,14.9991458 L18,11.7573593 L19.4142136,10.3431458 Z"
                              transform="translate(-730.000000, -614.000000) translate(723.000000, 604.000000)"
                              fill="currentColor"
                              fill-rule="evenodd"
                            />
                          </svg>
                        </button>
                        <button
                          type="button"
                          aria-label="Next"
                          class="swiper-button-next navigation-control slider-product-overview__control slider-product-overview__control-next text-gray-900 hover:bg-white"
                        >
                          <svg
                            class="navigation-control__arrow fill-current"
                            width="18"
                            height="12"
                            viewBox="0 0 18 12"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M19.4142136,10.3431458 L24.363961,15.2928932 C24.7544853,15.6834175 24.7544853,16.3165825 24.363961,16.7071068 L19.4142136,21.6568542 L18,20.2426407 L21.242,16.9991458 L7,17 L7,15 L21.24,14.9991458 L18,11.7573593 L19.4142136,10.3431458 Z"
                              transform="translate(-730.000000, -614.000000) translate(723.000000, 604.000000)"
                              fill="currentColor"
                              fill-rule="evenodd"
                            />
                          </svg>
                        </button>
                      </div>

                      <!-- Main Swiper -->
                      <swiper
                        :modules="[Navigation, Thumbs]"
                        :slides-per-view="1"
                        :space-between="30"
                        :threshold="20"
                        :centered-slides="true"
                        :centered-slides-bounds="true"
                        :loop="false"
                        :navigation="{
                          prevEl: '.swiper-button-prev',
                          nextEl: '.swiper-button-next',
                        }"
                        :thumbs="{ swiper: thumbsSwiper }"
                        class="relative overflow-hidden"
                      >
                        <swiper-slide
                          v-for="(asset, index) in allMedia"
                          :key="index"
                        >
                          <div
                            class="relative flex items-center justify-center"
                          >
                            <picture class="aspect-video slide-image w-full">
                              <NuxtImg
                                class="relative h-full w-full object-cover"
                                :srcset="(asset as Media_Asset)?.srcset"
                                :alt="
                                  (asset as Products_Asset)?.alt || undefined
                                "
                                loading="lazy"
                              />
                            </picture>
                          </div>
                        </swiper-slide>
                      </swiper>
                    </div>
                  </div>

                  <!-- Thumbnails Swiper -->
                  <div class="relative flex-none">
                    <swiper
                      :modules="[Thumbs]"
                      :space-between="30"
                      :threshold="20"
                      :centered-slides="true"
                      :centered-slides-bounds="true"
                      :loop="false"
                      :watch-slides-progress="true"
                      class="relative overflow-hidden"
                      :breakpoints="{
                        // When window width is >= 640px
                        640: {
                          slidesPerView: 5,
                        },
                        // When window width is < 640px
                        0: {
                          slidesPerView: 3,
                        },
                      }"
                      @swiper="onThumbsSwiper"
                    >
                      <swiper-slide
                        v-for="(asset, index) in allMedia"
                        :key="index"
                        class="slider-product-overview__thumb"
                      >
                        <div
                          class="aspect-video relative flex w-full cursor-pointer items-center justify-center transition"
                        >
                          <NuxtImg
                            class="relative h-24 w-24 object-cover transition"
                            :srcset="
                              (asset as Media_Asset)?.srcset || undefined
                            "
                            alt="thumbnail preview"
                            loading="lazy"
                          />
                        </div>
                      </swiper-slide>
                    </swiper>
                  </div>
                </div>
              </div>
              <!-- END: Slider Gallery -->
            </div>
          </div>
        </div>
        <div>
          <h2 class="mb-4 font-montserrat text-5xl font-medium">Overview</h2>
          <div
            class="prose w-3/5 font-light lg:prose-lg"
            v-html="product?.productDescription"
          />
          <div class="flex flex-col justify-between gap-x-5 md:flex-row">
            <div class="prose w-full pl-4 font-light lg:prose-lg md:w-1/2">
              <ul style="list-style-type: disc">
                <li>Lorem ipsum dolor sit amet consectetur.</li>
                <li>Pellentesque pharetra facilisis odio donec.</li>
                <li>Integer diam enim lorem nisl lorem.</li>
                <li>Lorem ipsum dolor sit amet consectetur.</li>
                <li>Lorem ipsum dolor sit amet consectetur.</li>
                <li>Pellentesque pharetra facilisis odio donec</li>
              </ul>
            </div>
            <div class="w-full md:w-1/2">
              <div
                class="mx-auto my-6 grid w-full grid-cols-2 gap-x-3 gap-y-3 rounded-md border border-l-2 border-gray-1 px-4"
              >
                <div
                  v-for="(
                    item, index
                  ) in product?.featuredProductResources.filter(
                    (p) => p.__typename === 'resourcesFileDownload_Entry',
                  )"
                  :key="index"
                  :class="index % 2 === 0 ? 'text-primary' : 'text-green-300'"
                  class="justify-between border-b-2 border-gray-1 p-4"
                >
                  <div class="flex">
                    <figure class="grid justify-center">
                      <NuxtImg
                        src="/images/file-document.svg"
                        alt="Resource Download Icon"
                        class="object-contain filter"
                        width="30"
                        height="30"
                      />
                    </figure>
                    <div class="mx-6 text-left text-sm">
                      {{ truncatedTitle(item.title || '') }}
                    </div>
                  </div>
                  <div class="flex gap-x-2">
                    <NuxtLink
                      v-for="(link, raIndex) in item.resourceAssets"
                      :key="raIndex"
                      :to="link.url || undefined"
                      :title="'Download ' + link.extension + ' for '"
                      class="inline-flex items-center space-x-2 rounded-xl px-3 py-1 text-gray-2"
                    >
                      <div class="text-xs font-medium capitalize leading-tight">
                        {{ link.extension }}
                      </div>
                      <div>
                        <figure class="grid justify-center">
                          <NuxtImg
                            src="/images/download.svg"
                            alt="Resource Download Icon"
                            class="object-contain filter"
                            width="15"
                            height="15"
                          />
                        </figure>
                      </div>
                    </NuxtLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MainContainer>
    </section>
    <!-- End Product Overview -->
    <section
      v-if="hasCompanionProducts"
      id="Companion products"
      class="bg-primary-light py-10"
    >
      <div class="pl-6">
        <div class="container mx-auto mb-[100px] sm:mb-0">
          <h2
            class="my-4 font-montserrat text-[42px] font-medium leading-[50.4px] tracking-normal"
          >
            Companion products
          </h2>
          <div class="prose mb-4 flex flex-row justify-between font-light">
            <p
              class="flex w-full max-w-[504px] items-center text-left font-inter text-text-gray"
            >
              Lorem ipsum dolor sit amet consectetur. Pellentesque pharetra
              facilisis odio donec. Integer diam enim lorem nisl lorem.
            </p>
          </div>
        </div>
        <div class="container mx-auto">
          <div class="carousel-container relative">
            <div class="overflow-x-auto">
              <swiper
                :slides-per-view="3.5"
                :space-between="20"
                :loop="true"
                :navigation="{
                  nextEl: '.swiper-button-next',
                  prevEl: '.swiper-button-prev',
                }"
                class="relative"
              >
                <swiper-slide
                  v-for="(item, index) in product?.commerceCompanionProducts"
                  :key="index"
                  class="min-w-[450px]"
                >
                  <ProductsCompanionProductsCard
                    :bc-product="true"
                    :featured-image="
                      item.productFeaturedImage[0]?.srcset || undefined
                    "
                    :product-featured-image="item.productFeaturedImage"
                    :product-link="item.uri || ''"
                    :primary-text="item.title || ''"
                    :secondary-text="item.excerptText || ''"
                    :product-description="item.productDescription || ''"
                    :bigcommerce-product="item.bigcommerceProduct"
                    :view="'lists'"
                  />
                </swiper-slide>
              </swiper>
              <div
                class="swiper-button-prev text-gray absolute right-[80px] top-[-80px] z-10 flex h-12 w-12 transform items-center justify-center rounded-full border border-solid border-gray-300 bg-white transition hover:cursor-pointer hover:text-blue-400 lg:top-[-50px]"
              >
                <svg
                  width="18"
                  height="12"
                  viewBox="0 0 18 12"
                  class="rotate-180 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M31.4142136,22.3431458 L36.363961,27.2928932 C36.7544853,27.6834175 36.7544853,28.3165825 36.363961,28.7071068 L31.4142136,33.6568542 L30,32.2426407 L33.242,28.9991458 L19,29 L19,27 L33.24,26.9991458 L30,23.7573593 L31.4142136,22.3431458 Z"
                    transform="translate(-532.000000, -799.000000) translate(147.000000, 473.000000) translate(366.000000, 304.000000)"
                    fill="currentColor"
                    fill-rule="evenodd"
                  />
                </svg>
              </div>
              <!-- Custom Next Button -->
              <div
                class="swiper-button-next text-gray absolute right-[10px] top-[-80px] z-10 flex h-12 w-12 transform items-center justify-center rounded-full border border-solid border-gray-300 bg-white transition hover:cursor-pointer hover:text-blue-400 lg:top-[-50px]"
              >
                <svg
                  width="18"
                  height="12"
                  viewBox="0 0 18 12"
                  class="fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M31.4142136,22.3431458 L36.363961,27.2928932 C36.7544853,27.6834175 36.7544853,28.3165825 36.363961,28.7071068 L31.4142136,33.6568542 L30,32.2426407 L33.242,28.9991458 L19,29 L19,27 L33.24,26.9991458 L30,23.7573593 L31.4142136,22.3431458 Z"
                    transform="translate(-532.000000, -799.000000) translate(147.000000, 473.000000) translate(366.000000, 304.000000)"
                    fill="currentColor"
                    fill-rule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Technical Details -->
    <!-- <section id="Technical details" class="my-4">
      <MainContainer>
        <h2>Technical details</h2>
        <div class="mx-auto my-6 w-full">
          <div
            v-for="(item, index) in technicalDetailsContent"
            :key="index"
            :class="index % 2 === 0 ? 'bg-blue-100' : 'bg-white'"
            class="flex p-4"
          >
            <h3 class="mx-6 w-1/3 text-left text-lg font-bold">
              {{ item.title }}
            </h3>
            <p class="w-2/3 text-gray-700">{{ item.content }}</p>
          </div>
        </div>
      </MainContainer>
    </section> -->
    <!-- Product resources -->
    <section id="Product Resources" class="my-10">
      <MainContainer>
        <h2
          class="font-montserrat text-5xl font-medium leading-[50.4px] tracking-normal"
        >
          Product resources
        </h2>
        <div class="mx-auto my-6 flex w-full flex-col gap-y-3">
          <ResourceCard
            v-for="(item, index) in product?.featuredProductResources.filter(
              (p) => p.__typename === 'resourcesFileDownload_Entry',
            )"
            :key="index"
            :title="truncatedTitle(item.title || '')"
            :resource-divisions="[]"
            __typename="resourcesFileDownload_Entry"
            :resource-assets="
              item.__typename === 'resourcesFileDownload_Entry'
                ? item.resourceAssets
                : undefined
            "
          />
        </div>
      </MainContainer>
    </section>
    <!-- Features & Benefits -->
    <section id="Features & Benefits" class="mb-6">
      <MainContainer>
        <div class="py-6">
          <h2
            class="font-montserrat text-[24px] font-semibold leading-[31.2px] tracking-normal"
          >
            Features & Benefits
          </h2>
          <p class="my-6 w-full max-w-[493px] text-text-gray">
            Lorem ipsum dolor sit amet consectetur. Pellentesque pharetra
            facilisis odio donec. Integer diam enim lorem nisl lorem.
          </p>
        </div>
        <div>
          <div class="grid gap-x-10 gap-y-10 sm:grid-cols-2 md:grid-cols-3">
            <div
              v-for="(item, index) in product?.productFeaturesBenefits"
              :key="index"
              class="max-w-72 justify-start space-y-4 text-base tracking-wide"
            >
              <div class="flex">
                <NuxtImg
                  :src="item.icon[0]?.url || undefined"
                  class="h-12 w-12"
                  width="48"
                  height="48"
                  :alt="item.icon[0]?.alt || undefined"
                  loading="lazy"
                />
              </div>
              <div class="space-y-2">
                <div v-if="item.primaryText" class="text-lg font-bold">
                  {{ item.primaryText }}
                </div>
                <div
                  v-if="item.secondaryText"
                  class="text-[14px] font-normal leading-[18.2px] tracking-normal text-text-grey"
                >
                  {{ item.secondaryText }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </MainContainer>
    </section>
    <!-- End Features & Benefits -->
    <!-- Best sellers-->
    <section
      v-if="hasCompanionProducts"
      id="Best sellers"
      class="bg-primary-light py-20"
    >
      <div class="pl-6">
        <div class="container mx-auto px-5">
          <h2
            class="w-full pb-4 text-left font-montserrat text-5xl font-semibold leading-snug"
          >
            Best sellers
          </h2>
          <div
            class="mb-8 flex flex-col items-center justify-between gap-8 font-medium sm:flex-row"
          >
            <p
              class="flex w-full max-w-[500px] items-center text-left font-inter font-light"
            >
              Lorem ipsum dolor sit amet consectetur. Pellentesque pharetra
              facilisis odio donec. Integer diam enim lorem nisl lorem.
            </p>
            <div class="flex flex-row items-center justify-center space-x-3">
              <SwiperButton
                direction="previous"
                class="swiper-button-prev"
                inverted
                :status="isBestSellerBeginning ? 'disabled' : 'active'"
              />
              <SwiperButton
                direction="next"
                class="swiper-button-next"
                inverted
                :status="isBestSellerEnd ? 'disabled' : 'active'"
              />
            </div>
          </div>
          <div class="mb-6">
            <Swiper
              :slides-per-view="3"
              :space-between="20"
              :loop="false"
              :navigation="{
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
              }"
              :breakpoints="{
                350: { slidesPerView: 1.2 }, // Mobile (1.5 cards)
                768: { slidesPerView: 2.2 }, // Tablet (2.5 cards)
                1024: { slidesPerView: 3 }, // Desktop (3 cards)
              }"
              @swiper="onBestSellerSwipe"
              @slide-change="onBestSellerSlideChange"
            >
              <SwiperSlide
                v-for="(item, index) in product?.commerceCompanionProducts"
                :key="index"
              >
                <ProductsProductCatalogCard
                  :bc-product="true"
                  :featured-image="
                    item.productFeaturedImage[0]?.srcset || undefined
                  "
                  :product-featured-image="item.productFeaturedImage"
                  :product-link="item.uri || ''"
                  :primary-text="item.title || ''"
                  :secondary-text="item.excerptText || ''"
                  :product-description="item.productDescription || ''"
                  :bigcommerce-product="item.bigcommerceProduct"
                  :view="`card`"
                />
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.slider-product-overview__thumb {
  width: auto;
}

.navigation-control {
  @apply absolute top-1/2 z-10 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 transition;
}

.slider-product-overview__control-prev {
  @apply left-10;
}

.slider-product-overview__control-next {
  @apply right-10;
}
:global(.swiper-slide-thumb-active.slider-product-overview__thumb) {
  @apply border-2 border-custom-blue;
}
</style>
