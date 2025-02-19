import { defineCachedEventHandler } from 'nitropack/runtime'
import { useValidatedBody, z } from 'h3-zod'
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
    const { ids } = await useValidatedBody(event, {
      ids: z.array(z.string()),
    })

    return await matrixesRepository.fetchStandardContentBuilderEntry(ids)
  },
  {
    maxAge: 600, // Cache for 10 minutes
    getKey: async (event) => {
      const { ids } = await useValidatedBody(event, bodySchema)
      return `matrixes--standard-content-builder--${ids.join(',')}`
    },
  },
)
