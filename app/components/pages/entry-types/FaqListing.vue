<script setup lang="ts">
import { computed, ref } from '#imports'
import type { PagesFaqListingEntry, BreadcrumbItem } from '#shared/types'

import { createFaqsRepository } from '~~/server/integrations/craftcms/faqs/repository'

import SidebarPageLayout from '~/components/layout/SidebarPageLayout.vue'
import BreadcrumbsSection from '~/components/common/BreadcrumbsSection.vue'

interface Faq {
  site?: Record<string, string>
  title?: string
  faqAnswer?: string
}

interface Props {
  entry?: PagesFaqListingEntry | null
  breadcrumbs?: BreadcrumbItem[]
}

const props = withDefaults(defineProps<Props>(), {
  entry: null,
  breadcrumbs: () => [],
})

const hideBreadcrumbs = ref<boolean>(false)

const config = useRuntimeConfig()
const { env } = config.public

const faqsRepository = createFaqsRepository({ env })

type FaqsResponseType = Awaited<
  ReturnType<typeof faqsRepository.fetchFaqListing>
>
const faqPages = ref<FaqsResponseType>({ entryCount: 0, faqEntries: [] })

faqPages.value = await faqsRepository.fetchFaqListing()

const { faqEntries } = await faqsRepository.fetchAllFaqs()

const sidebarLinks = computed(() => {
  // Create sidebar links
  const links = [
    {
      attributes: {
        href: props.entry?.uri,
      },
      label: 'Everything',
      active: true,
    },
  ]

  // Add additional FAQ page links
  faqPages.value.faqEntries.forEach((faqPage) => {
    links.push({
      attributes: {
        href: faqPage.uri || '',
      },
      label: faqPage.title || '',
      active: false,
    })
  })

  return links
})
</script>

<template>
  <main>
    <BreadcrumbsSection v-if="!hideBreadcrumbs" :items="props.breadcrumbs" />
    <MatrixesPageHero :entry="props.entry?.pageHero" />
    <SidebarPageLayout
      :sidebar-title="'Categories'"
      :sidebar-links="sidebarLinks"
    >
      <template #innerContent>
        <div>
          <div class="grid gap-16">
            <FaqsFaqItem
              v-for="(faq, index) in faqEntries"
              :key="faq.id || index"
              :faq="faq as Faq"
            />
          </div>
        </div>
      </template>
    </SidebarPageLayout>
  </main>
</template>
