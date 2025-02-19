<script setup lang="ts">
import type { PageHeroGenericFieldsFragment } from '~~/server/codegen'
import { kebabCase } from 'scule'

interface Props {
  block?: PageHeroGenericFieldsFragment | null
}

const props = withDefaults(defineProps<Props>(), {
  block: undefined,
})

const showDivider = false

const extraClasses = computed((): string => {
  const classes = ['page-hero']
  if (props.block?.typeHandle) {
    classes.push(kebabCase(props.block?.typeHandle))
  } else {
    classes.push('unknown')
  }

  return classes.join(' ')
})
</script>

<template>
  <!-- <div>
    <div class="relative">{{ props.block?.typeHandle }}</div>
    <pre>{{ props.block }}</pre>
  </div> -->
  <section class="relative overflow-hidden" :class="extraClasses">
    <div class="my-18 px-6">
      <div class="mx-auto max-w-container">
        <!-- H1 Heading and Copy -->
        <div class="text-center">
          <h1
            v-if="props.block?.primaryText"
            class="text-4xl leading-tight md:text-5xl"
          >
            {{ props.block?.primaryText }}
          </h1>
          <p v-if="props.block?.secondaryText" class="mt-2">
            {{ props.block?.secondaryText }}
          </p>
        </div>
      </div>
    </div>
  </section>

  <hr v-if="showDivider" class="w-full" />
</template>
