import { defineEventHandler, createError, type H3Event } from 'h3'
import { useValidatedBody, z } from 'h3-zod'
import { SignJWT } from 'jose'
import { withoutLeadingSlash, withoutTrailingSlash } from 'ufo'
import { AxiosError } from 'axios'
import { useRuntimeConfig } from '#imports'
import { useBigCommerceManagementApi } from '~~/server/utils/bigcommerce/clients'
import { useTursoDb } from '~~/server/utils/turso'
import { useSendgridMailer } from '~~/server/utils/sendgrid'

const config = useRuntimeConfig()

const tursoDbClient = useTursoDb(config.turso)
const bigCommerceManagementApi = useBigCommerceManagementApi(config.bigcommerce)
const sendgridMailer = useSendgridMailer(config.sendgrid)

export default defineEventHandler(async (event: H3Event) => {
  const { email } = await useValidatedBody(event, {
    email: z.string().email(),
  })

  // Find customer ID by email
  const customerId = await findCustomerIdByEmail(email)

  // Generate token
  const token = await new SignJWT({ customerId })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('1h')
    .sign(new TextEncoder().encode(config.auth.jwtSecret))

  // Save token in Turso database
  await saveTokenInTursoDatabase(customerId, token)

  // Send email with reset link
  await sendEmailWithResetLink(email, token)

  return { message: 'Password reset link sent to email' }
})

async function findCustomerIdByEmail(email: string) {
  // Find customer by email using BigCommerce API
  const response = await bigCommerceManagementApi.get('/customers', {
    params: { 'email:in': email },
  })

  const { data } = response.data

  if (!data || !Array.isArray(data) || data.length === 0) {
    throw createError({
      statusCode: 404,
      message: 'User with the provided email has not been found.',
    })
  }

  return data[0].id
}

async function saveTokenInTursoDatabase(customerId: number, token: string) {
  await tursoDbClient.execute({
    sql: 'INSERT INTO password_reset_tokens (customer_id, token, expires_at) VALUES (?, ?, datetime("now", "+1 hour"))',
    args: [customerId, token],
  })
}

async function sendEmailWithResetLink(email: string, token: string) {
  try {
    // Create a password reset link
    const frontendUrl = withoutTrailingSlash(config.public.site.publicUrl)
    const pwResetPath = withoutLeadingSlash(
      withoutTrailingSlash(config.public.site.pwResetPath),
    )
    const resetLink = `${frontendUrl}/${pwResetPath}?token=${token}`

    // create a detailed string template for the email
    const textEmailTemplate = `Click here to reset your password: ${resetLink}`

    const htmlEmailTemplate = `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            h1 {
              font-size: 24px;
            }
            .button {
              display: inline-block;
              padding: 10px 20px;
              background-color: #000;
              color: #fff;
              text-decoration: none;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Polyguard</h1>
            <strong>Reset your password</strong>
            <p>Click the button below to reset your password.</p>
            <a href="${resetLink}" class="button">Reset password</a>
          </div>
        </body>
      </html>
    `

    await sendgridMailer.send({
      to: email,
      from: `${config.public.site.siteName} <${config.public.site.fromEmail}>`,
      subject: 'Password reset link',
      text: textEmailTemplate,
      html: htmlEmailTemplate,
    })
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error('Error (AxiosError) response:', error.response?.data)
    } else {
      console.error('Error:', error)
    }

    throw createError({
      statusCode: 500,
      message: 'Server error while sending email.',
    })
  }
}
