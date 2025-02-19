import { defineEventHandler } from 'h3'
import { createMenusRepository } from '~~/server/integrations/craftcms/menus/repository'
import { useRuntimeConfig } from '#imports'

const config = useRuntimeConfig()
const { env } = config.public

const menusRepository = createMenusRepository({ env })

export default defineEventHandler(async () => {
  return await menusRepository.fetchMechanicalNavigationMenu()
})
