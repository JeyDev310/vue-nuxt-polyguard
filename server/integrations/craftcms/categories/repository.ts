import type { ApiContext } from '~~/shared/types'
import { getProductCategory } from '~~/server/integrations/craftcms/categories/api/get-product-category'

export function createCategoriesRepository({ env }: ApiContext) {
  async function fetchProductCategory(uri: string) {
    try {
      return await getProductCategory(uri, { env })
    } catch {
      return null
    }
  }

  return {
    fetchProductCategory,
  }
}
