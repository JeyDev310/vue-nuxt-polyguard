import { defineEventHandler, createError, readBody } from 'h3'
import { withLeadingSlash, withoutTrailingSlash } from 'ufo'
import type { RetourRedirect } from '~~/server/integrations/craftcms/routes/types'
import { createRoutesRepository } from '~~/server/integrations/craftcms/routes/repository'
import { useRuntimeConfig } from '#imports'

export default defineEventHandler(async (event): Promise<RetourRedirect> => {
  const config = useRuntimeConfig()
  const { env } = config.public

  const routesRepository = createRoutesRepository({ env })

  const body = await readBody(event)
  if (!body) {
    throw createError({
      statusCode: 400,
      message: 'Missing body',
    })
  }

  if (!body.route) {
    throw createError({
      statusCode: 400,
      message: 'Missing route parameter in request body',
    })
  }

  const toPath = body.route

  let redirects: Array<RetourRedirect> = []
  try {
    redirects = await routesRepository.fetchRedirects()
  } catch {
    throw createError({
      statusCode: 404,
      message: 'Not Found',
    })
  }

  let foundRedirect = redirects
    .filter((redirect) => redirect.matchType === 'exactmatch')
    .filter((redirect) => redirect.to)
    .find(
      (redirect) =>
        withLeadingSlash(withoutTrailingSlash(redirect.from)) ===
        withLeadingSlash(withoutTrailingSlash(toPath)),
    )

  if (!foundRedirect) {
    redirects
      .filter((redirect) => redirect.matchType === 'regexmatch')
      .filter((redirect) => redirect.to)
      .find((redirect) => {
        const regex = new RegExp(redirect.from)
        const match = regex.exec(toPath)
        if (!match || !match[1]) {
          return false
        }

        const to = redirect.to.replace(/\$1/g, match[1])

        foundRedirect = {
          ...redirect,
          to,
          from: toPath,
        }

        return true
      })
  }

  if (!foundRedirect) {
    throw createError({
      statusCode: 404,
      message: 'Not Found',
    })
  }

  return foundRedirect
})
