import { defineCachedEventHandler } from 'nitropack/runtime'
import { useValidatedBody, useValidatedParams, z } from 'h3-zod'
import { createMatrixesRepository } from '~~/server/integrations/craftcms/matrixes/repository'
import { useRuntimeConfig } from '#imports'

const config = useRuntimeConfig()
const { env } = config.public

const matrixesRepository = createMatrixesRepository({ env })

const bodySchema = {
  ids: z.array(z.string()),
}

export default defineCachedEventHandler(
  async (event) => {
    const { ids } = await useValidatedParams(event, bodySchema)

    return await matrixesRepository.fetchPageHeroEntry(ids)
  },
  {
    maxAge: 600, // Cache for 10 minutes
    getKey: async (event) => {
      const { ids } = await useValidatedBody(event, bodySchema)
      return `matrixes--page-hero--${ids.join(',')}`
    },
  },
)
