<script setup lang="ts">
import { kebabCase } from 'scule'

import BlockCta2ColumnsBanner from './blocks/Cta2ColumnsBanner.vue'
import BlockLatestCaseStudies from './blocks/LatestCaseStudies.vue'
import BlockCtaSimpleBanner from './blocks/CtaSimpleBanner.vue'
import BlockResponsiveImageBanner from './blocks/ResponsiveImageBanner.vue'
import BlockFaqs from './blocks/Faqs.vue'
import BlockCtaEdgeImage from './blocks/CtaEdgeImage.vue'
import BlockFeaturedCaseStudy from './blocks/FeaturedCaseStudy.vue'
import BlockProductList from './blocks/ProductList.vue'
import BlockAlternateContentSection from './blocks/AlternateContentSection.vue'
import BlockOembedVideo from './blocks/OembedVideo.vue'
import BlockFeaturedPages from './blocks/FeaturedPages.vue'
import BlockExistingContentModule from './blocks/ExistingContentModule.vue'
import BlockDivider from './blocks/Divider.vue'
import BlockFormieForm from './blocks/FormieForm.vue'
import BlockVideoGrid from './blocks/VideoGrid.vue'
import BlockFeaturedResources from './blocks/FeaturedResources.vue'
import BlockImage from './blocks/Image.vue'
import BlockRichText from './blocks/RichText.vue'
import BlockFeaturedCards from './blocks/FeaturedCards.vue'
import BlockCta2ColumnsCta from './blocks/Cta2ColumnsCta.vue'
import BlockLatestNews from './blocks/LatestNews.vue'
import BlockJumpLinkTarget from './blocks/JumpLinkTarget.vue'
import BlockFormosanMap from './blocks/FormosanMap.vue'

import type { StandardContentBuilderBlockEntry } from '#shared/types'

interface Props {
  entry?: Array<StandardContentBuilderBlockEntry | null> | null
}

const props = withDefaults(defineProps<Props>(), {
  entry: undefined,
})

function generateBlockClasses(typeHandle?: string): string {
  const classes = ['standard-content-builder']
  if (typeHandle) {
    classes.push(kebabCase(typeHandle))
  } else {
    classes.push('unknown')
  }

  return classes.join(' ')
}
</script>

<template>
  <div>
    <template v-for="block in props.entry" :key="block?.id">
      <BlockCta2ColumnsBanner
        v-if="block?.__typename === 'pageSectionsCtas2ColumnsBanner_Entry'"
        :class="generateBlockClasses(block?.typeHandle)"
        :block="block"
      />
      <BlockLatestCaseStudies
        v-else-if="block?.__typename === 'pageSectionsLatestCaseStudies_Entry'"
        :class="generateBlockClasses(block?.typeHandle)"
        :block="block"
      />
      <BlockCtaSimpleBanner
        v-else-if="block?.__typename === 'pageSectionsCtasSimpleBanner_Entry'"
        :class="generateBlockClasses(block?.typeHandle)"
        :block="block"
      />
      <BlockResponsiveImageBanner
        v-else-if="
          block?.__typename === 'pageSectionsResponsiveImageBanner_Entry'
        "
        :class="generateBlockClasses(block?.typeHandle)"
        :block="block"
      />
      <BlockFaqs
        v-else-if="block?.__typename === 'pageSectionsFaqs_Entry'"
        :class="generateBlockClasses(block?.typeHandle)"
        :block="block"
      />
      <BlockCtaEdgeImage
        v-else-if="block?.__typename === 'pageSectionsCtasEdgeImage_Entry'"
        :class="generateBlockClasses(block?.typeHandle)"
        :block="block"
      />
      <BlockFeaturedCaseStudy
        v-else-if="block?.__typename === 'pageSectionsFeaturedCaseStudy_Entry'"
        :class="generateBlockClasses(block?.typeHandle)"
        :block="block"
      />
      <BlockProductList
        v-else-if="block?.__typename === 'pageSectionsProductList_Entry'"
        :class="generateBlockClasses(block?.typeHandle)"
        :block="block"
      />
      <BlockAlternateContentSection
        v-else-if="block?.__typename === 'pageSectionsAlternateContent_Entry'"
        :class="generateBlockClasses(block?.typeHandle)"
        :block="block"
      />
      <BlockOembedVideo
        v-else-if="block?.__typename === 'pageSectionsOembedVideo_Entry'"
        :class="generateBlockClasses(block?.typeHandle)"
        :block="block"
      />
      <BlockFeaturedPages
        v-else-if="block?.__typename === 'pageSectionsFeaturedPages_Entry'"
        :class="generateBlockClasses(block?.typeHandle)"
        :block="block"
      />
      <BlockExistingContentModule
        v-else-if="
          block?.__typename === 'pageSectionsExistingContentModule_Entry'
        "
        :class="generateBlockClasses(block?.typeHandle)"
        :block="block"
      />
      <BlockDivider
        v-else-if="block?.__typename === 'pageSectionsDivider_Entry'"
        :class="generateBlockClasses(block?.typeHandle)"
        :block="block"
      />
      <BlockFormieForm
        v-else-if="block?.__typename === 'pageSectionsFormieForm_Entry'"
        :class="generateBlockClasses(block?.typeHandle)"
        :block="block"
      />
      <BlockVideoGrid
        v-else-if="block?.__typename === 'pageSectionsVideoGrid_Entry'"
        :class="generateBlockClasses(block?.typeHandle)"
        :block="block"
      />
      <BlockFeaturedResources
        v-else-if="block?.__typename === 'pageSectionsFeaturedResources_Entry'"
        :class="generateBlockClasses(block?.typeHandle)"
        :block="block"
      />
      <BlockImage
        v-else-if="block?.__typename === 'pageSectionsImage_Entry'"
        :class="generateBlockClasses(block?.typeHandle)"
        :block="block"
      />
      <BlockRichText
        v-else-if="block?.__typename === 'pageSectionsRichText_Entry'"
        :class="generateBlockClasses(block?.typeHandle)"
        :block="block"
      />
      <BlockFeaturedCards
        v-else-if="block?.__typename === 'pageSectionsFeaturedCards_Entry'"
        :class="generateBlockClasses(block?.typeHandle)"
        :block="block"
      />
      <BlockCta2ColumnsCta
        v-else-if="block?.__typename === 'pageSectionsCtas2Columns_Entry'"
        :class="generateBlockClasses(block?.typeHandle)"
        :block="block"
      />
      <BlockLatestNews
        v-else-if="block?.__typename === 'pageSectionsLatestNews_Entry'"
        :class="generateBlockClasses(block?.typeHandle)"
        :block="block"
      />
      <BlockJumpLinkTarget
        v-else-if="block?.__typename === 'pageSectionsJumpLinkTarget_Entry'"
        :class="generateBlockClasses(block?.typeHandle)"
        :block="block"
      />
      <BlockFormosanMap
        v-else-if="block?.__typename === 'pageSectionsFormosanMap_Entry'"
        :class="generateBlockClasses(block?.typeHandle)"
        :block="block"
      />
    </template>
  </div>
</template>
