<script setup lang="ts">
/* __placeholder__ */
import type {
  Media_Asset,
  CaseStudiesDefaultEntryFragment,
  CaseStudyCategoriesDefault_Entry,
} from '~~/server/codegen'
import ArticleCard from '~/components/cards/ArticleCard.vue'

// interface Props {
//   block?: LatestCaseStudiesFieldsFragment | null
// }

// const props = withDefaults(defineProps<Props>(), {
//   block: undefined,
// })

// const caseStudies = ref([])

const { data: caseStudies } = await useFetch('/api/v1/case-studies', {
  method: 'POST',
  body: {
    limit: 3,
  },
})
</script>

<template>
  <section>
    <!-- <div class="relative">{{ props.block?.typeHandle }}</div>
    <pre>{{ props.block }}</pre> -->
    <div v-if="caseStudies?.caseStudiesEntries.length">
      <div class="bg-tertiary-lightest py-20">
        <div>
          <div class="px-6">
            <div class="mx-auto max-w-container">
              <div class="grid gap-x-5 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
                <ArticleCard
                  v-for="(caseStudy, index) in caseStudies.caseStudiesEntries"
                  :key="caseStudy.id || index"
                  :title="(caseStudy as CaseStudiesDefaultEntryFragment).title"
                  :category="
                    (caseStudy as CaseStudiesDefaultEntryFragment)
                      .caseStudyCategories[0] as unknown as CaseStudyCategoriesDefault_Entry
                  "
                  :slug="(caseStudy as CaseStudiesDefaultEntryFragment).slug"
                  :image="
                    (caseStudy as CaseStudiesDefaultEntryFragment)
                      .featuredImage as unknown as Media_Asset
                  "
                  :link-text="
                    (caseStudy as CaseStudiesDefaultEntryFragment).title
                  "
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
