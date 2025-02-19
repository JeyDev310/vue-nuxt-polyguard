<script setup lang="ts">
import type { LocationQueryRaw } from 'vue-router'
import {
  ref,
  computed,
  useAsyncData,
  useRoute,
  watch,
  navigateTo,
} from '#imports'

import Paginator from '~/components/common/Paginator.vue'
import ResourcesSearchBar from '~/components/resources/ResourcesSearchBar.vue'
import ResourceCard from './ResourceCard.vue'
import MainContainer from '~/components/layout/MainContainer.vue'

interface SearchParams {
  term: string
  cat: string
  div: string
}

const route = useRoute()
const queryPage = route.query.page
const pageSize = 8

const searchParams = ref<SearchParams>(getSearchParams())
const currentPage = ref<number>(getCurrentPage())

const { data: foundResources } = await useAsyncData(
  `resource_index_found_resources_${currentPage.value}_${pageSize}_${searchParams.value.term}_${searchParams.value.div}_${searchParams.value.cat}`,
  async () => await searchResources(),
)

const totalPosts = computed(() => foundResources.value?.entryCount || 0)
const totalPages = computed(() => Math.ceil((totalPosts.value || 0) / pageSize))

watch(
  () => currentPage.value,
  async () => {
    const query = buildQueryStringParams()

    await navigateTo({
      path: route.path,
      query,
    })

    foundResources.value = await searchResources()
  },
)

watch(searchParams, async () => {
  const query = buildQueryStringParams(true)
  currentPage.value = 1

  await navigateTo({
    path: route.path,
    query,
  })

  foundResources.value = await searchResources()
})

async function searchResources() {
  const page = currentPage.value
  const searchTerm = searchParams.value?.term
  const resourceCategoriesSlugs = searchParams.value?.cat
    ? [searchParams.value?.cat, 'all']
    : undefined
  const resourceDivisionsSlugs = searchParams.value?.div
    ? [searchParams.value?.div, 'all']
    : undefined

  const resources = await $fetch('/api/v1/resources', {
    method: 'POST',
    body: {
      page,
      pageSize,
      searchTerm,
      resourceCategoriesSlugs,
      resourceDivisionsSlugs,
    },
  })

  return resources
}

function buildQueryStringParams(toFirstPage = false): LocationQueryRaw {
  const _query: LocationQueryRaw = {
    ...route.query,
    page: toFirstPage ? 1 : currentPage.value,
  }

  if (searchParams.value.term) {
    _query.term = searchParams.value.term
  } else {
    delete _query.term
  }

  if (searchParams.value.div) {
    _query.div = searchParams.value.div
  } else {
    delete _query.div
  }

  if (searchParams.value.cat) {
    _query.cat = searchParams.value.cat
  } else {
    delete _query.cat
  }

  return _query
}

function getCurrentPage(): number {
  if (!queryPage) return 1

  const pageNumber = parseInt(queryPage.toString())
  if (isNaN(pageNumber)) {
    return 1
  } else if (pageNumber < 1) {
    return 1
  } else {
    return pageNumber
  }
}

function getSearchParams(): SearchParams {
  const searchTerm = Array.isArray(route.query.term)
    ? route.query.term[0]
    : route.query.term

  const resourceCategoryTerm = Array.isArray(route.query.cat)
    ? route.query.cat[0]
    : route.query.cat

  const resourceDivisionTerm = Array.isArray(route.query.div)
    ? route.query.div[0]
    : route.query.div

  return {
    term: searchTerm ?? '',
    cat: resourceCategoryTerm ?? '',
    div: resourceDivisionTerm ?? '',
  }
}
</script>

<template>
  <div>
    <div class="my-16">
      <MainContainer>
        <div class="flex flex-col justify-between gap-5 md:flex-row">
          <ResourcesSearchBar v-model="searchParams" />
        </div>
      </MainContainer>
    </div>
  </div>

  <div>
    <div class="my-16">
      <MainContainer>
        <div class="flex flex-col gap-y-10">
          <ResourceCard
            v-for="(resource, index) in foundResources?.resources"
            :key="index"
            :title="resource.title || ''"
            :resource-divisions="resource.resourceDivisions"
            :__typename="resource.__typename"
            :resource-assets="
              resource.__typename === 'resourcesFileDownload_Entry'
                ? resource.resourceAssets
                : undefined
            "
          />
        </div>
      </MainContainer>
    </div>

    <!-- Paginator -->
    <div class="my-24 flex justify-center">
      <Paginator v-model="currentPage" :total-pages="totalPages" />
    </div>
    <!-- End Paginator -->
  </div>

  <div>
    <div class="my-16">
      <MainContainer>
        <div class="flex flex-col gap-y-10">
          <div>
            <h1 class="text-4xl font-medium tracking-wide">
              Fetured resources
            </h1>
            <div class="mt-12 grid grid-cols-2 gap-6">
              <ResourceCard
                v-for="(resource, index) in foundResources?.resources.slice(
                  0,
                  4,
                )"
                :key="index"
                :title="resource.title || ''"
                :resource-divisions="resource.resourceDivisions"
                :__typename="resource.__typename"
                :resource-assets="
                  resource.__typename === 'resourcesFileDownload_Entry'
                    ? resource.resourceAssets
                    : undefined
                "
              />
            </div>
          </div>
        </div>
      </MainContainer>
    </div>
  </div>
</template>
