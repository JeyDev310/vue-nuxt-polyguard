import type { ApiContext } from '~~/shared/types'
import { performSiteSearch as _performSiteSearch } from '~~/server/integrations/craftcms/search/api/perform-site-search'
import { performProductSearch as _performProductSearch } from '~~/server/integrations/craftcms/search/api/perform-product-search'

export function createSearchRepository({ env }: ApiContext) {
  interface SearchProductsParams {
    searchText?: string
    productCategoriesIds?: Array<number>
    productDivisionsIds?: Array<number>
  }
  async function performSiteSearch(searchTerm: string = '') {
    return await _performSiteSearch(searchTerm, { env })
  }

  async function performProductSearch(searchTerm: SearchProductsParams) {
    return await _performProductSearch(searchTerm, { env })
  }
  return {
    performSiteSearch,
    performProductSearch,
  }
}
