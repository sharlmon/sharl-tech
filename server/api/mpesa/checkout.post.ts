import { createError, readBody } from 'h3'

type CheckoutBody = {
  name?: string
  email?: string
  phone?: string
  company?: string
  brief?: string
  plan?: string
  amount?: number
}

function normalizePhone(phone: string) {
  const digits = phone.replace(/\D/g, '')
  if (digits.startsWith('254') && digits.length === 12) return digits
  if (digits.startsWith('0') && digits.length === 10) return `254${digits.slice(1)}`
  if ((digits.startsWith('7') || digits.startsWith('1')) && digits.length === 9) return `254${digits}`
  return ''
}

function mpesaTimestamp() {
  const eastAfricaTime = new Date(Date.now() + 3 * 60 * 60 * 1000)
  return eastAfricaTime.toISOString().replace(/[-T:]/g, '').slice(0, 14)
}

export default defineEventHandler(async (event) => {
  const body = await readBody<CheckoutBody>(event)
  const phone = normalizePhone(body.phone || '')

  if (!body.name || !body.email || !body.plan || !body.amount || !phone) {
    throw createError({ statusCode: 400, statusMessage: 'Please provide valid project and M-Pesa details.' })
  }

  const config = useRuntimeConfig(event)
  const required = [config.mpesaConsumerKey, config.mpesaConsumerSecret, config.mpesaShortcode, config.mpesaPasskey, config.mpesaCallbackUrl]
  if (required.some((value) => !value)) {
    throw createError({
      statusCode: 503,
      statusMessage: 'M-Pesa checkout is awaiting final merchant activation. Please email us to reserve your project.',
    })
  }

  const baseUrl = config.mpesaEnvironment === 'production' ? 'https://api.safaricom.co.ke' : 'https://sandbox.safaricom.co.ke'
  const credentials = btoa(`${config.mpesaConsumerKey}:${config.mpesaConsumerSecret}`)
  const tokenResponse = await $fetch<{ access_token: string }>(`${baseUrl}/oauth/v1/generate?grant_type=client_credentials`, {
    headers: { Authorization: `Basic ${credentials}` },
  })

  const timestamp = mpesaTimestamp()
  const password = btoa(`${config.mpesaShortcode}${config.mpesaPasskey}${timestamp}`)
  const reference = `ST-${Date.now().toString(36).toUpperCase()}`

  await $fetch(`${baseUrl}/mpesa/stkpush/v1/processrequest`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
    body: {
      BusinessShortCode: config.mpesaShortcode,
      Password: password,
      Timestamp: timestamp,
      TransactionType: 'CustomerPayBillOnline',
      Amount: Math.round(body.amount),
      PartyA: phone,
      PartyB: config.mpesaShortcode,
      PhoneNumber: phone,
      CallBackURL: config.mpesaCallbackUrl,
      AccountReference: reference,
      TransactionDesc: `${body.plan} project for ${body.name}`.slice(0, 100),
    },
  })

  return { reference, status: 'pending' }
})
