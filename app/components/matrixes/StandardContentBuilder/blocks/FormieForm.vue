<script setup lang="ts">
import type { PageSectionsFormieFormFieldsFragment } from '~~/server/codegen'

import FormieForm from '~/components/forms/FormieForm.vue'
import MainContainer from '~/components/layout/MainContainer.vue'

interface Props {
  block?: PageSectionsFormieFormFieldsFragment | null
}

const props = withDefaults(defineProps<Props>(), {
  block: undefined,
})
</script>

<template>
  <section class="py-10 md:py-16">
    <MainContainer>
      <div class="mx-auto w-full max-w-prose">
        <FormieForm v-if="props.block?.form" :block="props.block" />
      </div>
    </MainContainer>
  </section>
</template>
