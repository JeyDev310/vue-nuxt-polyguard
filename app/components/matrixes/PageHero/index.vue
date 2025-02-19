<script lang="ts" setup>
import PageHeroLandingPage2Block from './blocks/LandingPage2.vue'
import PageHeroGenericBlock from './blocks/Generic.vue'
import PageHeroGenericWideBlock from './blocks/Typeform.vue'
import PageHeroDefaultHeader from './blocks/DefaultHeader.vue'

import type {
  PageHeroGenericFieldsFragment,
  PageHeroLandingPageFieldsFragment,
  PageHeroTypeformFieldsFragment,
  PageHeroDefaultHeaderFieldsFragment,
} from '~~/server/codegen'

type PageHeroBlockEntry =
  | PageHeroGenericFieldsFragment
  | PageHeroLandingPageFieldsFragment
  | PageHeroTypeformFieldsFragment
  | PageHeroDefaultHeaderFieldsFragment

interface Props {
  entry?: Array<PageHeroBlockEntry | null> | null
}

const props = withDefaults(defineProps<Props>(), {
  entry: undefined,
})
</script>

<template>
  <div>
    <template v-for="block in props.entry" :key="block?.typeHandle">
      <PageHeroGenericBlock
        v-if="block?.__typename === 'pageHeroGeneric_Entry'"
        :block="block"
      />
      <PageHeroGenericWideBlock
        v-else-if="block?.__typename === 'pageHeroTypeform_Entry'"
        :block="block"
      />
      <PageHeroLandingPage2Block
        v-else-if="block?.__typename === 'pageHeroLandingPage_Entry'"
        :block="block"
      />
      <PageHeroDefaultHeader
        v-else-if="block?.__typename === 'pageHeroDefaultHeader_Entry'"
        :block="block"
      />
      <div v-else>
        <p>not supported</p>
      </div>
    </template>
  </div>
</template>
