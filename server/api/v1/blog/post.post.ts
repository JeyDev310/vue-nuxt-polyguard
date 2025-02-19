import { useRuntimeConfig } from '#imports'
import { useValidatedBody, z } from 'h3-zod'
import { createBlogRepository } from '~~/server/integrations/craftcms/blog/repository'
import { defineCachedEventHandler } from 'nitropack/runtime'

const config = useRuntimeConfig()
const { env } = config.public

const blogRepository = createBlogRepository({ env })

const bodySchema = {
  uri: z.string(),
}

export default defineCachedEventHandler(
  async (event) => {
    const { uri } = await useValidatedBody(event, bodySchema)

    return await blogRepository.fetchBlogPost(uri)
  },
  {
    maxAge: 600, // Cache for 10 minutes
    getKey: async (event) => {
      const { uri } = await useValidatedBody(event, bodySchema)
      return `blog-post-${uri}`
    },
  },
)
