import { defineCachedEventHandler } from 'nitropack/runtime'
import { useValidatedBody, z } from 'h3-zod'
import { createProductsRepository } from '~~/server/integrations/craftcms/products/repository'
import { useRuntimeConfig } from '#imports'

const config = useRuntimeConfig()
const { env } = config.public

const productsRepository = createProductsRepository({ env })

const bodySchema = {
  page: z.number().min(1).default(1),
  productCategoryIds: z.array(z.number()).optional(),
  productDivisionIds: z.array(z.number()).optional(),
}

export default defineCachedEventHandler(
  async (event) => {
    const { page, productCategoryIds, productDivisionIds } =
      await useValidatedBody(event, bodySchema)

    const pageSize = 12

    const response = await productsRepository.fetchAllProducts({
      page,
      pageSize,
      productCategoryIds,
      productDivisionIds,
    })

    const totalPages = Math.ceil((response?.productCount || 0) / pageSize)

    return {
      ...response,
      currentPage: page,
      totalPages,
    }
  },
  {
    maxAge: 600, // Cache for 10 minutes
    getKey: async (event) => {
      const { page, productCategoryIds, productDivisionIds } =
        await useValidatedBody(event, bodySchema)
      return `products--${productCategoryIds?.join(',') || 'all'}--${productDivisionIds?.join(',') || 'all'}--${page}`
    },
  },
)
