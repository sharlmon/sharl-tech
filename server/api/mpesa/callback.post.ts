import { readBody } from 'h3'

export default defineEventHandler(async (event) => {
  const payload = await readBody(event)

  // Persist this payload to your CRM or project database before going live.
  console.info('M-Pesa callback received', JSON.stringify(payload))

  return { ResultCode: 0, ResultDesc: 'Accepted' }
})
