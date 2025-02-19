import * as dotenv from 'dotenv'
import { useTursoDb } from '~~/server/utils/turso'

dotenv.config()

async function initializeDatabase() {
  const databaseUrl = process.env.NUXT_TURSO_DATABASE_URL
  const authToken = process.env.NUXT_TURSO_AUTH_TOKEN

  if (!databaseUrl || !authToken) {
    throw new Error(
      'NUXT_TURSO_DATABASE_URL and NUXT_TURSO_AUTH_TOKEN must be set in the environment.',
    )
  }

  const tursoClient = useTursoDb({
    databaseUrl,
    authToken,
  })

  try {
    await tursoClient.execute({
      sql: `
        CREATE TABLE IF NOT EXISTS password_reset_tokens (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          customer_id INTEGER NOT NULL,
          token TEXT NOT NULL,
          expires_at DATETIME NOT NULL
        )
      `,
      args: [],
    })
    console.log('Database initialized successfully.')
  } catch (error) {
    console.error('Error initializing database:', error)
  }
}

initializeDatabase().then()
