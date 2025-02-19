<script setup lang="ts">
import type { PageHeroTypeformFieldsFragment } from '~~/server/codegen'

import { toKebabCase } from '~/utils'

interface Props {
  block?: PageHeroTypeformFieldsFragment | null
}

const props = withDefaults(defineProps<Props>(), {
  block: undefined,
})

const sectionClasses = computed(() => {
  return [toKebabCase(props.block?.typeHandle)]
})
</script>

<template>
  <section :class="sectionClasses" />
</template>
