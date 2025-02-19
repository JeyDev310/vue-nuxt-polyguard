import { defineCachedEventHandler } from 'nitropack/runtime'
import { useValidatedBody, z } from 'h3-zod'
import { createProductsRepository } from '~~/server/integrations/craftcms/products/repository'
import { useRuntimeConfig } from '#imports'

const config = useRuntimeConfig()
const { env } = config.public

const productsRepository = createProductsRepository({ env })

const bodySchema = {
  uri: z.string(),
}

export default defineCachedEventHandler(
  async (event) => {
    const { uri } = await useValidatedBody(event, bodySchema)

    return await productsRepository.fetchSimpleProduct(uri)
  },
  {
    maxAge: 600, // Cache for 10 minutes
    getKey: async (event) => {
      const { uri } = await useValidatedBody(event, bodySchema)
      return `product--simple-product--${uri}`
    },
  },
)
