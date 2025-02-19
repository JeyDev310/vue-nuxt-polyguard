import { defineCachedEventHandler } from 'nitropack/runtime'
import { useValidatedBody, z } from 'h3-zod'
import { createCategoriesRepository } from '~~/server/integrations/craftcms/categories/repository'
import { useRuntimeConfig } from '#imports'

const config = useRuntimeConfig()
const { env } = config.public

const categoriesRepository = createCategoriesRepository({ env })

const bodySchema = {
  uri: z.string(),
}

export default defineCachedEventHandler(
  async (event) => {
    const { uri } = await useValidatedBody(event, bodySchema)

    return await categoriesRepository.fetchProductCategory(uri)
  },
  {
    maxAge: 600, // Cache for 10 minutes
    getKey: async (event) => {
      const { uri } = await useValidatedBody(event, bodySchema)
      return `categories--product-category--${uri}`
    },
  },
)
