import { ResolverError } from '@vtex/api'

export async function executeCall(ctx: Context) {
  const {
    vtex: { logger },
    state: { requestBody },
  } = ctx

  logger.error({
    message: 'NOT IMPLEMENTED',
    data: {
      requestBody,
    },
  })

  throw new ResolverError('NOT IMPLEMENTED', 501, 'NOT_IMPLEMENTED')
}
