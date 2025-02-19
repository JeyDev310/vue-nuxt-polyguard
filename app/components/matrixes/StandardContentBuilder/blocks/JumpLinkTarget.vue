<script setup lang="ts">
import { computed } from '#imports'

import type { PageSectionsJumpLinkTargetFieldsFragment } from '~~/server/codegen'

interface Props {
  block?: PageSectionsJumpLinkTargetFieldsFragment | null
}

const props = withDefaults(defineProps<Props>(), {
  block: undefined,
})

const urlHash = computed(() => {
  const hash = props.block?.jumpLinkTargetHash ?? undefined
  return hash?.startsWith('#') ? hash.slice(1) : hash
})
</script>

<template>
  <section :id="urlHash" />
</template>
