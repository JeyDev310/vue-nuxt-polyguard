import { defineCachedEventHandler } from 'nitropack/runtime'
import { useValidatedBody, z } from 'h3-zod'
import { createCaseStudiesRepository } from '~~/server/integrations/craftcms/case-studies/repository'
import { useRuntimeConfig } from '#imports'

const config = useRuntimeConfig()
const { env } = config.public

const caseStudiesRepository = createCaseStudiesRepository({ env })

const bodySchema = {
  uri: z.string(),
}

export default defineCachedEventHandler(
  async (event) => {
    const { uri } = await useValidatedBody(event, bodySchema)

    return await caseStudiesRepository.fetchCaseStudy(uri)
  },
  {
    maxAge: 600, // Cache for 10 minutes
    getKey: async (event) => {
      const { uri } = await useValidatedBody(event, bodySchema)
      return `case-studies--${uri}`
    },
  },
)
