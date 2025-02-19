<script setup lang="ts">
import { computed } from 'vue'
//   import { marked } from 'marked'
interface Faq {
  site?: Record<string, string>
  title?: string
  faqAnswer?: string
}
interface Props {
  faq?: Faq
}
const props = withDefaults(defineProps<Props>(), {
  faq: undefined,
})

// Render markdown, but only inline elements
const renderedAnswer = computed(() => {
  // Use marked with inline-only rendering
  return props.faq?.faqAnswer || ''
})
</script>

<template>
  <div class="space-y-6">
    <div class="space-y-2">
      <div>
        <span class="font-heading text-xs font-medium">
          {{ props.faq?.site?.name }}
        </span>
      </div>
      <h5>{{ props.faq?.title }}</h5>
    </div>
    <div>
      <p class="text-sm leading-6">
        {{ renderedAnswer }}
      </p>
    </div>
  </div>
</template>
