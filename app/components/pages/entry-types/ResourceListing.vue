<script setup lang="ts">
import { ref } from '#imports'
import type { PagesResourceListingEntry, BreadcrumbItem } from '#shared/types'

import BreadcrumbsSection from '~/components/common/BreadcrumbsSection.vue'
import MainContainer from '~/components/layout/MainContainer.vue'
import ButtonLink from '~/components/common/ButtonLink.vue'

interface Props {
  entry?: PagesResourceListingEntry | null
  breadcrumbs?: BreadcrumbItem[]
}

const props = withDefaults(defineProps<Props>(), {
  entry: null,
  breadcrumbs: () => [],
})

const hideBreadcrumbs = ref<boolean>(false)
</script>

<template>
  <main>
    <BreadcrumbsSection v-if="!hideBreadcrumbs" :items="props.breadcrumbs" />
    <section class="relative h-[446px]">
      <div
        class="absolute inset-0 z-0 w-full before:absolute before:inset-0 before:z-10 before:m-auto before:h-full before:w-full before:bg-black before:opacity-20 after:absolute after:inset-0 after:m-auto after:h-full after:w-full after:bg-gradient-to-tr after:from-black after:opacity-60 after:content-['']"
      >
        <picture class="h-full w-full">
          <NuxtImg
            src="https://s3-alpha-sig.figma.com/img/c327/f66b/831f5e4833b2c5221e87a8c3dc35a257?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=ahQx7XnYHgyCgs336eQMwR2P6FLjrd9E8fquqReT8HB0pz4dIZiAEHwh53G8kehngeIsG96YRqBpzvzrbX1M2ZgGYAObGq4WjQ0wIl7H8BTJAZFSAQ-IP~Wjz513Xd2jD1yq~tnNCoUqyCCrYK3IBVPnq6EBphil8FoEXmW5lpLKyvMW47RniJAIPq59TLUgSas7i3SXlObLWXJs~8vozWMKdUPRgJR3b5wPUNrlr9kE7qCLbmgi~ymNSDFy~6dyPz0Osxv2E6FBmjwwV9lNbCSJHBhql0LHaBwyzCaXZhcaIajprNBululFojlF25GxbIJtNbCnoFNgqWxt-LCQtw__"
            class="h-full w-full bg-[#072133] object-cover opacity-[57%]"
            alt="No image found"
          />
        </picture>
      </div>

      <div class="relative z-10">
        <MainContainer>
          <!-- Content -->
          <div
            class="flex h-[446px] flex-col items-start justify-center space-y-8 text-white"
          >
            <div class="max-w-prose space-y-6">
              <h1
                class="inline-block font-montserrat text-3xl font-semibold !leading-tight text-white sm:text-4xl md:text-5xl"
              >
                Resources
              </h1>
              <p
                class="font-inter text-base font-light text-white sm:text-lg md:text-xl"
              >
                Lorem ipsum dolor sit amet consectetur. Vitae lectus cursus
                suscipit eu porttitor tortor cras. Vitae porttitor ligula tempus
                platea. Aliquet ut aliquet id eu morbi semper. .
              </p>
            </div>

            <div class="flex items-center space-x-5">
              <input
                name="email"
                type="text"
                placeholder="Enter your email"
                class="w-full rounded-md px-4 py-2"
              />
              <ButtonLink to="" text="Subscribe" size="lg" />
            </div>
          </div>
        </MainContainer>
      </div>
    </section>
    <ResourcesResourceListing />
  </main>
</template>
