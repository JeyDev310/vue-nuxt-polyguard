<script setup lang="ts">
import type { PageSectionsFeaturedCaseStudyFieldsFragment } from '~~/server/codegen'

interface Props {
  block?: PageSectionsFeaturedCaseStudyFieldsFragment | null
  sectionTitle?: string | null
}

const props = withDefaults(defineProps<Props>(), {
  block: undefined,
  sectionTitle: '',
})

const sectionTitle = computed(
  () => props.sectionTitle ?? props.block?.sectionTitle ?? null,
)
// Fetch case studies
const { data: caseStudy } = await useFetch('/api/v1/case-studies', {
  method: 'POST',
  body: {
    limit: 1,
  },
})

// Fallback to block's case study if exists
// const resolvedCaseStudy = computed(() =>
//   props.block?.caseStudy?.with(['caseStudyCategories', 'featuredImage']).one() ??
//   caseStudy.value?.[0] ??
//   null
// )
</script>

<template>
  <section>
    <!-- <div class="relative">{{ props.block?.typeHandle }}</div>
    <pre>{{ props.block }}</pre> -->
    <CtasFeaturedArticle
      :with-bg="true"
      :section-title="sectionTitle"
      :entry="caseStudy?.caseStudiesEntries[0]"
    />
  </section>
</template>
