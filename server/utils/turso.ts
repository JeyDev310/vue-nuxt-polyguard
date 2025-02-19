import { createClient } from '@libsql/client'

interface Params {
  databaseUrl: string
  authToken: string
}

export function useTursoDb(params: Params) {
  return createClient({
    url: params.databaseUrl,
    authToken: params.authToken,
  })
}
