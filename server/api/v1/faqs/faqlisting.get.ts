import { defineCachedEventHandler } from 'nitropack/runtime'
import { useRuntimeConfig } from '#imports'
import { createFaqsRepository } from '~~/server/integrations/craftcms/faqs/repository'

const config = useRuntimeConfig()
const { env } = config.public

const faqsRepository = createFaqsRepository({ env })

export default defineCachedEventHandler(
  async () => {
    return await faqsRepository.fetchFaqListing()
  },
  {
    maxAge: 600, // Cache for 10 minutes
    getKey: async () => `faqs--faq-listing`,
  },
)
