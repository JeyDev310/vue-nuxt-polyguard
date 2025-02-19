import { defineCachedEventHandler } from 'nitropack/runtime'
import { useValidatedBody, z } from 'h3-zod'
import { createResourcesRepository } from '~~/server/integrations/craftcms/resources/repository'
import { useRuntimeConfig } from '#imports'

const config = useRuntimeConfig()
const { env } = config.public

const resourcesRepository = createResourcesRepository({ env })

const bodySchema = {
  page: z.number().min(1).default(1),
  pageSize: z.number().min(1).max(36).default(12),
  searchTerm: z.string().optional(),
  resourceCategoriesSlugs: z.array(z.string()).optional(),
  resourceDivisionsSlugs: z.array(z.string()).optional(),
}

export default defineCachedEventHandler(
  async (event) => {
    const {
      page,
      pageSize,
      searchTerm,
      resourceCategoriesSlugs,
      resourceDivisionsSlugs,
    } = await useValidatedBody(event, bodySchema)

    const response = await resourcesRepository.fetchResources({
      page,
      pageSize,
      searchTerm,
      resourceCategoriesSlugs,
      resourceDivisionsSlugs,
    })

    const totalPages = Math.ceil((response.entryCount || 0) / pageSize)

    return {
      ...response,
      currentPage: page,
      totalPages,
    }
  },
  {
    maxAge: 600, // Cache for 10 minutes
    getKey: async (event) => {
      const {
        page,
        pageSize,
        searchTerm,
        resourceCategoriesSlugs,
        resourceDivisionsSlugs,
      } = await useValidatedBody(event, bodySchema)
      return `resources--${page}--${pageSize}--${searchTerm}--${resourceCategoriesSlugs?.join(',')}--${resourceDivisionsSlugs?.join(',')}`
    },
  },
)
