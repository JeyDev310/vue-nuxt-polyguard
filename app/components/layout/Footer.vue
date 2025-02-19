<script setup lang="ts">
import { useAsyncData } from '#imports'

import MainContainer from '~/components/layout/MainContainer.vue'
import InstagramIcon from '~/components/common/icons/Instagram.vue'
import FacebookIcon from '~/components/common/icons/Facebook.vue'
import LinkedinIcon from '~/components/common/icons/Linkedin.vue'
import TwitterIcon from '~/components/common/icons/Twitter.vue'
import YoutubeIcon from '~/components/common/icons/Youtube.vue'

const { data: siteFooterData } = await useAsyncData(
  `siteFooterData`,
  async () => {
    const [siteFooterSingle, footerMenu, bottomFooterMenu] = await Promise.all([
      $fetch('/api/v1/singles/site-footer'),
      $fetch('/api/v1/menus/footer-menu'),
      $fetch('/api/v1/menus/bottom-footer-menu'),
    ])

    return {
      siteFooterSingle,
      footerMenu,
      bottomFooterMenu,
    }
  },
)

function socialIconByHandle(handle?: string | null) {
  switch (handle) {
    case 'instagram':
      return InstagramIcon
    case 'facebook':
      return FacebookIcon
    case 'linkedin':
      return LinkedinIcon
    case 'xTwitter':
      return TwitterIcon
    case 'youtube':
      return YoutubeIcon
    default:
      return ''
  }
}
</script>

<template>
  <footer
    class="border-t border-gray-200 bg-white"
    aria-labelledby="footer-heading"
  >
    <MainContainer>
      <div class="pb-10 pt-10 lg:pb-3 lg:pt-12">
        <h2 id="footer-heading" class="sr-only">Footer</h2>
        <div class="mx-auto grid gap-12 lg:gap-10">
          <div class="flex flex-col flex-wrap lg:flex-row">
            <div class="mb-14 flex flex-col gap-7 lg:w-1/3 xl:mb-0">
              <NuxtImg
                class="h-[33px] w-[163px]"
                src="/images/logo-polyguard-main.png"
                alt="Company name"
              />
              <div
                class="max-w-sm font-light text-gray-500 md:w-full"
                v-html="siteFooterData?.siteFooterSingle?.blurbText"
              />
              <div class="grid auto-cols-min grid-flow-col gap-4">
                <NuxtLink
                  v-for="(item, index) in siteFooterData?.siteFooterSingle
                    ?.socialLinks ?? []"
                  :key="index"
                  :to="item?.socialLinkProfileUrl ?? undefined"
                  class="text-blue-500"
                >
                  <Component
                    :is="socialIconByHandle(item?.socialNetwork)"
                    class="h-8 w-8 object-cover text-primary"
                  />
                </NuxtLink>
              </div>
            </div>

            <!-- Footer Menu Links -->
            <div
              class="grid flex-1 grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4 md:gap-8"
            >
              <div
                v-for="(section, sectionIdx) in siteFooterData?.footerMenu ??
                []"
                :key="sectionIdx"
                class="space-y-6"
              >
                <div>
                  <h3 class="text-sm font-normal uppercase text-gray-900">
                    <span v-if="section.typeLabel === 'Passive'">
                      {{ section.title }}</span
                    >
                    <NuxtLink
                      v-else
                      :to="section.nodeUri"
                      :target="section.newWindow ? '_blank' : '_self'"
                      class="text-sm hover:underline"
                    >
                      {{ section.title }}
                    </NuxtLink>
                  </h3>
                  <ul role="list" class="mt-4 space-y-4">
                    <li
                      v-for="(child, childSectionIdx) in section.children"
                      :key="childSectionIdx"
                    >
                      <NuxtLink
                        :to="child.nodeUri"
                        :target="child.newWindow ? '_blank' : '_self'"
                        class="text-base font-light text-gray-500 hover:text-gray-600 hover:underline"
                      >
                        {{ child.title }}
                      </NuxtLink>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div
            class="flex flex-row flex-wrap items-center justify-center space-x-8 lg:justify-between"
          >
            <div
              v-for="(item, index) in siteFooterData?.siteFooterSingle
                ?.genericLogoImages ?? []"
              :key="index"
              class="my-3"
            >
              <NuxtImg
                class="h-full w-full object-cover text-primary"
                height="24"
                width="24"
                :src="item.url ?? undefined"
                :alt="item.alt ?? undefined"
              />
            </div>
          </div>

          <div
            class="flex flex-col-reverse items-center justify-between gap-7 border-t border-gray-900/10 py-5 text-left font-inter text-base font-normal leading-5 lg:flex-row lg:justify-between lg:gap-0"
          >
            <div
              class="text-sm font-light text-gray-500"
              v-html="siteFooterData?.siteFooterSingle?.copyrightText"
            />

            <div
              class="flex flex-row flex-wrap items-center justify-center space-x-8 lg:justify-between"
            >
              <NuxtLink
                v-for="(item, index) in siteFooterData?.bottomFooterMenu ?? []"
                :key="index"
                :to="item.nodeUri"
                :target="item.newWindow ? '_blank' : '_self'"
                class="flex justify-center text-black hover:cursor-pointer sm:flex-none"
              >
                <div
                  class="text-left font-inter font-normal leading-5 text-gray-900 hover:cursor-pointer hover:underline"
                >
                  {{ item.title }}
                </div>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </MainContainer>
  </footer>
</template>
