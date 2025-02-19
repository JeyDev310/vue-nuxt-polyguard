import { useRuntimeConfig } from '#imports'
import { createBlogRepository } from '~~/server/integrations/craftcms/blog/repository'
import { defineCachedEventHandler } from 'nitropack/runtime'

const config = useRuntimeConfig()
const { env } = config.public

const blogRepository = createBlogRepository({ env })

export default defineCachedEventHandler(
  async () => {
    return await blogRepository.fetchBlogCategories()
  },
  {
    maxAge: 600, // Cache for 10 minutes
    getKey: async () => `blog-categories`,
  },
)
