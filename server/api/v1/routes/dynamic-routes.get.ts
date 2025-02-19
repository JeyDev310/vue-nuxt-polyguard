import { defineEventHandler } from 'h3'
import { useRuntimeConfig } from '#imports'
import { createRoutesRepository } from '~~/server/integrations/craftcms/routes/repository'

const config = useRuntimeConfig()
const { env } = config.public

const routesRepository = createRoutesRepository({ env })

export default defineEventHandler(async () => {
  return await routesRepository.fetchDynamicRoutes()
})
