import { getProducts } from './api/get-products'
import { getProduct } from './api/get-product'
import { getSimpleProductProduct } from './api/get-simple-product-product'
import type { ApiContext } from '~~/shared/types'

export function createProductsRepository({ env }: ApiContext) {
  interface FetchProductsParams {
    page?: number
    pageSize?: number
    productCategoryIds?: Array<number>
    productDivisionIds?: Array<number>
  }

  async function fetchAllProducts(params: FetchProductsParams) {
    try {
      return await getProducts(params, { env })
    } catch {
      return null
    }
  }

  async function fetchProduct(uri: string) {
    try {
      return await getProduct(uri, { env })
    } catch {
      return null
    }
  }

  async function fetchSimpleProduct(uri: string) {
    try {
      return await getSimpleProductProduct(uri, { env })
    } catch {
      return null
    }
  }
  return {
    fetchAllProducts,
    fetchProduct,
    fetchSimpleProduct,
  }
}
