import { defineEventHandler } from 'h3'
import { createSinglesRepository } from '~~/server/integrations/craftcms/singles/repository'
import { useRuntimeConfig } from '#imports'

const config = useRuntimeConfig()
const { env } = config.public

const singlesRepository = createSinglesRepository({ env })

export default defineEventHandler(async () => {
  return await singlesRepository.fetchStickyBarCta()
})
