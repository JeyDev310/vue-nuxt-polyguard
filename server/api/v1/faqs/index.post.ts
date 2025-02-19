import { defineCachedEventHandler } from 'nitropack/runtime'
import { useValidatedBody, z } from 'h3-zod'
import { useRuntimeConfig } from '#imports'
import { createFaqsRepository } from '~~/server/integrations/craftcms/faqs/repository'

const config = useRuntimeConfig()
const { env } = config.public

const faqsRepository = createFaqsRepository({ env })

export default defineCachedEventHandler(
  async (event) => {
    const { faqCategoriesIds } = await useValidatedBody(event, {
      faqCategoriesIds: z.array(z.number()).optional(),
    })

    return await faqsRepository.fetchFilteredFaqs({
      faqCategoriesIds,
    })
  },
  {
    maxAge: 600, // Cache for 10 minutes
    getKey: async (event) => {
      const { faqCategoriesIds } = await useValidatedBody(event, {
        faqCategoriesIds: z.array(z.number()).optional(),
      })
      return `faqs--${faqCategoriesIds?.join(',')}`
    },
  },
)
