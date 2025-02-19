import { defineCachedEventHandler } from 'nitropack/runtime'
import { useValidatedBody, z } from 'h3-zod'
import { useRuntimeConfig } from '#imports'
import { createCaseStudiesRepository } from '~~/server/integrations/craftcms/case-studies/repository'

const config = useRuntimeConfig()
const { env } = config.public

const caseStudiesRepository = createCaseStudiesRepository({ env })

const bodySchema = {
  limit: z.number().min(1).default(1),
  offset: z.number().min(0).default(2),
  categoryUris: z.array(z.string()).optional(),
}

export default defineCachedEventHandler(
  async (event) => {
    const { limit, offset, categoryUris } = await useValidatedBody(
      event,
      bodySchema,
    )
    return await caseStudiesRepository.fetchCaseStudies({
      limit,
      offset,
      categoryUris,
    })
  },
  {
    maxAge: 600, // Cache for 10 minutes
    getKey: async (event) => {
      const { limit, offset, categoryUris } = await useValidatedBody(
        event,
        bodySchema,
      )
      return `case-studies--${limit}--${offset}--${categoryUris?.join(',')}`
    },
  },
)
