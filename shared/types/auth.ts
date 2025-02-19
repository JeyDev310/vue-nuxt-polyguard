export interface User {
  entityId: number | null
  email: string | null
  firstName: string | null
  lastName: string | null
  company?: string | null
  phone?: string | null
}

export interface Auth {
  jwt: string
  jwtExpiresAt: number
  refreshToken: string
  refreshTokenExpiresAt: number
  schema: string
  user: User | null
}
