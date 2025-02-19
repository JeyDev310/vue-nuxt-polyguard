<script setup lang="ts">
import { computed } from '#imports'
import type { PageSectionsCtasSimpleBannerFieldsFragment } from '~~/server/codegen'
import MainContainer from '~/components/layout/MainContainer.vue'
import ButtonLink from '~/components/common/ButtonLink.vue'

interface Props {
  block?: PageSectionsCtasSimpleBannerFieldsFragment | null
}

const props = withDefaults(defineProps<Props>(), {
  block: undefined,
})

const dark = computed(
  () => props.block?.darkBackground ?? props.block?.darkBackground ?? false,
)

const wrapperClasses = computed(() => {
  if (!dark.value) return 'bg-[#F3F8FE]'
  return 'bg-tertiary-dark/90'
})

const buttonText = computed(() => props.block?.primaryLink[0]?.linkText)

const buttonLink = computed(() => {
  return '/' + (props.block?.primaryLink[0]?.linkUri || '').replace(/^\/+/, '')
})

const buttonType = computed(() => {
  return dark.value ? 'secondary' : 'primary'
})

function formatText(text: string) {
  return text.replace(/\n/g, '<br>')
}
</script>

<template>
  <section :class="wrapperClasses">
    <MainContainer>
      <div class="relative z-10 py-20">
        <div :class="['space-y-6 text-left', dark ? 'text-white' : '']">
          <h4
            class="text-5xl font-medium !leading-snug tracking-wide"
            v-html="props.block?.primaryText"
          />
          <p
            v-if="props.block?.secondaryText"
            class="prose font-light !leading-snug"
            v-html="formatText(props.block?.secondaryText)"
          />
          <ButtonLink
            v-if="buttonLink && buttonText"
            :to="buttonLink"
            :text="buttonText"
            size="lg"
            :type="buttonType"
          />
        </div>
      </div>
    </MainContainer>
  </section>
</template>
