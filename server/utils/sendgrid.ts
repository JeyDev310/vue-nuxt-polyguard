import sendgridMail from '@sendgrid/mail'

interface Params {
  apiKey: string
}

export function useSendgridMailer(params: Params) {
  sendgridMail.setApiKey(params.apiKey)
  return sendgridMail
}
