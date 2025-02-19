import { useRuntimeConfig } from '#imports'
import { useValidatedBody, z } from 'h3-zod'
import { createBlogRepository } from '~~/server/integrations/craftcms/blog/repository'
import { defineCachedEventHandler } from 'nitropack/runtime'

const config = useRuntimeConfig()
const { env } = config.public

const blogRepository = createBlogRepository({ env })

const pageSize = 12

const bodySchema = {
  page: z.number().min(1).default(1),
  categoryUri: z.string().optional(),
}

export default defineCachedEventHandler(
  async (event) => {
    const { page, categoryUri } = await useValidatedBody(event, bodySchema)

    const response = await blogRepository.fetchBlogPosts({
      page,
      pageSize,
      categoryUri,
    })

    return {
      ...response,
      currentPage: page,
      totalPages: Math.ceil((response.entryCount || 0) / pageSize),
    }
  },
  {
    maxAge: 600, // Cache for 10 minutes
    getKey: async (event) => {
      const { page, categoryUri } = await useValidatedBody(event, bodySchema)
      return `blog-posts-${categoryUri || 'all'}-${pageSize}-${page}`
    },
  },
)
