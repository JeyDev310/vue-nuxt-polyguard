import {
  ref,
  useRuntimeConfig,
  useRoute,
  reactive,
  watchEffect,
} from '#imports'
import { createSearchRepository } from '~~/server/integrations/craftcms/search/repository'
import type { ReturnType } from 'birpc'

interface SearchCategory {
  label: string
  criteria: {
    section?: string[]
  }
  eager: string[]
  total: number
}

// interface SearchState {
//   query: string
//   category: string
//   defaultedSearchCategory: boolean
//   categories: Record<string, SearchCategory>
//   productItems: any[]
//   blogItems: any[]
//   resourceItems: any[]
// }

export const useSearch = () => {
  const config = useRuntimeConfig()
  const { env } = config.public

  const searchRepository = createSearchRepository({ env })

  type SiteSearchResponseType = Awaited<
    ReturnType<typeof searchRepository.performSiteSearch>
  >
  type FoundProductsType = SiteSearchResponseType['products']
  type FoundBlogPostsType = SiteSearchResponseType['blogPosts']
  type FoundResourcesType = SiteSearchResponseType['resources']

  const route = useRoute()
  const searchQuery = ref((route.query.query as string) || '')
  const searchCategory = ref((route.query.category as string) || 'all')
  const defaultedSearchCategory = ref(false)

  const searchCategories = reactive<Record<string, SearchCategory>>({
    everything: {
      label: 'Everything',
      criteria: { section: ['resources', 'blog', 'pages'] },
      eager: ['standardContentBuilder', 'resourceAssets'],
      total: 0,
    },
    products: {
      label: 'Products',
      criteria: {},
      eager: [],
      total: 0,
    },
    resources: {
      label: 'Resources',
      criteria: { section: ['resources'] },
      eager: ['resourceAssets'],
      total: 0,
    },
    blog: {
      label: 'Blog',
      criteria: { section: ['blog'] },
      eager: [],
      total: 0,
    },
    pages: {
      label: 'Pages',
      criteria: { section: ['pages'] },
      eager: ['standardContentBuilder'],
      total: 0,
    },
    caseStudies: {
      label: 'Case Studies',
      criteria: { section: ['caseStudies'] },
      eager: ['standardContentBuilder'],
      total: 0,
    },
  })

  const productItems = ref<FoundProductsType>([])
  const blogItems = ref<FoundBlogPostsType>([])
  const resourceItems = ref<FoundResourcesType>([])
  const isLoading = ref(false)

  // Set default search category if one isn't set
  watchEffect(() => {
    if (!searchCategories[searchCategory.value]) {
      defaultedSearchCategory.value = true
      searchCategory.value = 'everything'
    }
  })

  // const buildExactMatchCondition = (query: string) => {
  //   const lowerQuery = query.toLowerCase()
  //   return [
  //     'or',
  //     ['like', 'lower(content)', ` ${lowerQuery} `],
  //     ['like', 'lower(content)', `${lowerQuery} `],
  //     ['like', 'lower(content)', ` ${lowerQuery}`],
  //   ]
  // }

  const fetchSearchResults = async () => {
    if (!searchQuery.value) return

    isLoading.value = true
    try {
      // const exactMatchCondition = buildExactMatchCondition(searchQuery.value)

      const searchTerm = searchQuery.value.toLowerCase()
      const response = await searchRepository.performSiteSearch(searchTerm)
      if (
        response !== null &&
        response !== undefined &&
        typeof response === 'object' &&
        'products' in response &&
        'blogPosts' in response &&
        'resources' in response
      ) {
        productItems.value = response.products
        blogItems.value = response.blogPosts
        resourceItems.value = response.resources
      }
    } catch (error) {
      console.error('Error fetching search results:', error)
    } finally {
      isLoading.value = false
    }
  }
  fetchSearchResults().then()
  // Watch for query changes
  watch(searchQuery, () => {
    if (searchQuery.value) {
      fetchSearchResults().then()
    } else {
      productItems.value = []
      blogItems.value = []
      resourceItems.value = []
    }
  })

  return {
    searchQuery,
    searchCategory,
    defaultedSearchCategory,
    searchCategories,
    productItems,
    blogItems,
    resourceItems,
    isLoading,
    fetchSearchResults,
  }
}
