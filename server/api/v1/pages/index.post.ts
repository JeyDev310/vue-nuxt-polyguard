import { defineCachedEventHandler } from 'nitropack/runtime'
import { useValidatedBody, z } from 'h3-zod'
import { createPagesRepository } from '~~/server/integrations/craftcms/pages/repository'
import { useRuntimeConfig } from '#imports'

const config = useRuntimeConfig()
const { env } = config.public

const pagesRepository = createPagesRepository({ env })

const bodySchema = {
  uri: z.string(),
}

export default defineCachedEventHandler(
  async (event) => {
    const { uri } = await useValidatedBody(event, bodySchema)

    return await pagesRepository.fetchPage(uri)
  },
  {
    maxAge: 600, // Cache for 10 minutes
    getKey: async (event) => {
      const { uri } = await useValidatedBody(event, bodySchema)
      return `pages--${uri}`
    },
  },
)
