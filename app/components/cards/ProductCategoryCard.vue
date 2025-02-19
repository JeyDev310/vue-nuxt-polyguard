<script setup lang="ts">
import type { ProductCategoryCard } from '#shared/types'

interface Props {
  productCategory: ProductCategoryCard
}

const props = defineProps<Props>()
</script>

<template>
  <div
    class="group relative flex flex-col justify-between rounded-md border border-[#348EF2] bg-[#F3F8FE] p-6"
  >
    <div class="flex h-full justify-center">
      <div
        class="aspect-h-2 aspect-w-3 w-full overflow-hidden rounded-md lg:aspect-h-1 lg:aspect-w-1 lg:aspect-none group-hover:opacity-75"
      >
        <NuxtImg
          :src="props.productCategory.imageSrc"
          :alt="props.productCategory.imageAlt"
          class="h-full w-full object-cover object-center lg:h-full lg:w-full"
        />
      </div>
    </div>
    <div class="mt-4 flex justify-around">
      <div>
        <h3 class="text-base text-[#348EF2] sm:text-lg lg:text-2xl">
          <NuxtLink :href="props.productCategory.href">
            <span aria-hidden="true" class="absolute inset-0" />
            {{ props.productCategory.name }}
          </NuxtLink>
        </h3>
      </div>
    </div>
  </div>
</template>
