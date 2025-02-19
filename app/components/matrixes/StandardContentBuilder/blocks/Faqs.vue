<script setup lang="ts">
import type { PageSectionsFaqsFieldsFragment } from '~~/server/codegen'
import { computed, onMounted, ref, useRuntimeConfig } from '#imports'
import { createFaqsRepository } from '~~/server/integrations/craftcms/faqs/repository'

interface Props {
  block?: PageSectionsFaqsFieldsFragment | null
}

const props = withDefaults(defineProps<Props>(), {
  block: undefined,
})

const config = useRuntimeConfig()
const { env } = config.public

const faqsRepository = createFaqsRepository({ env })

type FaqsResponseType = Awaited<ReturnType<typeof faqsRepository.fetchAllFaqs>>
type FaqEntry = FaqsResponseType['faqEntries'][number]

onMounted(async () => {
  try {
    faqEntries.value = await faqsRepository.fetchAllFaqs()
  } finally {
    loading.value = false
  }
})

const faqEntries = ref<FaqsResponseType>({ entryCount: 0, faqEntries: [] })
const loading = ref(true)
const activeTab = ref(1)

const categories = computed(() =>
  Array.from(
    new Set(
      faqEntries.value.faqEntries.map(
        (entry) => entry.faqCategories[0]?.title ?? 'Generic',
      ),
    ),
  ),
)

const faqs = computed(() => {
  return faqEntries.value.faqEntries.reduce(
    (acc: Record<string, Array<FaqEntry>>, entry) => {
      const category = entry.faqCategories?.[0]?.title ?? 'Generic'
      if (!acc[category]) {
        acc[category] = []
      }
      acc[category].push(entry)
      return acc
    },
    {},
  )
})
</script>

<template>
  <section>
    <!-- <div class="relative">{{ props.block?.typeHandle }}</div>
    <pre>{{ props.block }}</pre> -->
    <div :class="[props.block?.removeTopPadding ? 'pb-20' : 'py-10', 'px-6']">
      <div class="mx-auto max-w-container">
        <div class="flex flex-col space-y-4">
          <div>
            <div
              v-if="props.block?.primaryText || props.block?.secondaryText"
              class="prose--fancy prose mx-auto"
            >
              <h3
                v-if="props.block?.primaryText"
                style="text-align: center"
                v-html="props.block?.primaryText"
              />
              <p v-if="props.block?.secondaryText" style="text-align: center">
                {{ props.block?.secondaryText }}
              </p>
            </div>
          </div>
          <div>
            <div>
              <div
                class="flex flex-col space-y-12"
              >
                <div class="w-full">
                  <div class="generic-sidebar-list flex justify-center space-x-3">
                    <div 
                      v-for="(category, index) in categories" 
                      :key="index" 
                      class="px-3 py-0.5 bg-[#F7F8F8] border border-[#C3CFDC] rounded-[4px] cursor-pointer"
                      :class="
                          activeTab === index + 1
                            ? 'text-primary border-primary'
                            : ''
                        "
                    >
                      <span
                        class="font-normal text-[14px] leading-[18.2px] tracking-normal"
                        :aria-expanded="activeTab === index + 1"
                        aria-haspopup="true"
                        @click="() => (activeTab = index + 1)"
                        >{{ category }}</span
                      >
                    </div>
                  </div>
                </div>
                <div class="w-full">
                  <section>
                    <div
                      v-for="(faqArr, category, index) in faqs"
                      :key="category"
                      role="tabpanel"
                      :class="['x-cloak', 'x-show']"
                      :aria-hidden="activeTab !== index + 1"
                    >
                      <div v-if="activeTab == index + 1" class="grid grid-cols-2 gap-12">
                        <div
                          v-for="(faq, innIdx) in faqArr"
                          :key="innIdx"
                          class="space-y-3"
                        >
                          <CardsGenericListingCard
                            :site-id="faq.siteId"
                            :section="faq.faqCategories[0]?.title ?? ''"
                            :title="faq.title ?? ''"
                            :excerpt-text="faq.faqAnswer ?? ''"
                            :disable-line-clamping="true"
                          />
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
/* Add any custom styles here */
.prose {
  --tw-prose-body: theme('colors.tertiary.darkest');
  --tw-prose-bullets: theme('colors.primary.DEFAULT');
  /* Fancy Heading */
  &--fancy {
    h2,
    h3,
    h4,
    h5,
    h6 {
      @apply font-medium;
    }
  }

  /* White text */
  &--light {
    --tw-prose-body: theme('colors.white');
    --tw-prose-headings: theme('colors.white');
    --tw-prose-bold: theme('colors.white');
    --tw-prose-lead: theme('colors.white');
    --tw-prose-bullets: theme('colors.white');
    --tw-prose-links: theme('colors.white');
  }
}
</style>
