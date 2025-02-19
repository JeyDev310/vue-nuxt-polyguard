import { defineCachedEventHandler } from 'nitropack/runtime'
import { useRuntimeConfig } from '#imports'
import { createResourcesRepository } from '~~/server/integrations/craftcms/resources/repository'

const config = useRuntimeConfig()
const { env } = config.public

const resourcesRepository = createResourcesRepository({ env })

export default defineCachedEventHandler(
  async () => {
    return await resourcesRepository.fetchResourceCategories()
  },
  {
    maxAge: 600, // Cache for 10 minutes
    getKey: async () => 'resources--resource-categories',
  },
)
