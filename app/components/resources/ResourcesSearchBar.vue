<script setup lang="ts">
import { computed, ref, useAsyncData } from '#imports'
import ButtonAction from '~/components/common/ButtonAction.vue'

interface SearchItem {
  term: string
  cat: string
  div: string
}

interface Props {
  modelValue?: SearchItem
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: () => ({
    term: '',
    cat: '',
    div: '',
  }),
})

const emit = defineEmits<{
  (event: 'update:modelValue', item: SearchItem): void
  (event: 'search'): void
}>()

const termRef = ref<string>(props.modelValue.term)
const resourceDivisionRef = ref<string>(props.modelValue.div)
const resourceCategoryRef = ref<string>(props.modelValue.cat)
const filteredSearchPerformed = ref<boolean>(false)
const resourceFilterRef = ref<string>('')

const { data: resourceTaxonomies } = await useAsyncData(
  'resource-taxonomies',
  async () => {
    const [resourceDivisions, resourceCategories] = await Promise.all([
      $fetch('/api/v1/resources/resource-divisions'),
      $fetch('/api/v1/resources/resource-categories'),
    ])
    return { resourceDivisions, resourceCategories }
  },
)

const isFiltered = computed(() => filteredSearchPerformed.value)

function clearFilters(): void {
  termRef.value = ''
  resourceCategoryRef.value = ''
  resourceDivisionRef.value = ''
  search()
  emit('update:modelValue', { term: '', cat: '', div: '' })
  filteredSearchPerformed.value = false
}

function selectDivision(division: string) {
  resourceDivisionRef.value = division
  search()
}

function search(): void {
  emit('update:modelValue', {
    term: termRef.value,
    cat: resourceCategoryRef.value,
    div: resourceDivisionRef.value,
  })
  emit('search')
  filteredSearchPerformed.value = true
}
</script>

<template>
  <div class="w-full">
    <div class="flex w-full flex-wrap gap-5">
      <div
        class="grid w-full grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6"
      >
        <div
          v-for="(division, index) in resourceTaxonomies?.resourceDivisions ||
          []"
          :key="index"
          :class="{
            'flex h-[150px] cursor-pointer items-center justify-center rounded-lg px-10 py-9 text-center font-montserrat text-[22px] font-semibold leading-[28.6px]': true,
            'border-blue-200 bg-blue-200 text-white hover:border-primary':
              resourceDivisionRef !== division.slug,
            'border-primary bg-primary text-white':
              resourceDivisionRef === division.slug,
          }"
          @click="selectDivision(division.slug ?? '')"
        >
          {{ division.title }}
        </div>
      </div>
      <div class="flex w-full flex-wrap gap-5">
        <div>
          <select
            v-model="resourceCategoryRef"
            class="h-10 w-48 rounded-full border border-gray-300 pl-6 text-sm text-gray-500 placeholder:text-gray-400"
            style="border-radius: 10px"
            @change="search"
          >
            <option value="">All Resource Types</option>
            <option
              v-for="(
                category, index
              ) in resourceTaxonomies?.resourceCategories || []"
              :key="index"
              :value="category.slug"
            >
              {{ category.title }}
            </option>
          </select>
        </div>
        <div>
          <select
            v-model="resourceFilterRef"
            class="h-10 w-48 rounded-full border border-gray-300 pl-6 text-sm text-gray-500 placeholder:text-gray-400"
            style="border-radius: 10px"
            @change="search"
          >
            <option value="">All Filters</option>
          </select>
        </div>
        <div class="w-fit" :class="!isFiltered && 'hidden'">
          <ButtonAction
            type="button"
            text="Clear Filters"
            color="warning"
            @click="clearFilters"
          />
        </div>
        <div class="w-full md:ml-auto md:w-4/12">
          <div class="float-right max-w-md">
            <div class="flex justify-center gap-4 lg:justify-end">
              <input
                v-model="termRef"
                class="h-10 w-48 rounded-md border border-gray-300 pl-6 text-sm text-gray-500 placeholder:text-gray-400"
                placeholder="Resource Search"
                @keydown.enter="search"
              />
              <ButtonAction
                type="button"
                text="Search"
                color="secondary"
                @click="search"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
