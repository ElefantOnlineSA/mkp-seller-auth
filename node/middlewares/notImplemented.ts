//import { ResolverError } from '@vtex/api'

export async function notImplemented(ctx: Context, next: () => Promise<any>) {
  const {
    vtex: { logger },
    state: { requestBody },
  } = ctx

  //https://github.com/vtex/node-vtex-api/blob/master/src/service/worker/runtime/http/router.ts#L16
  const message = '501 Not Implemented'
  ctx.status = 501
  ctx.body = message

  logger.error({
    message: message,
    data: {
      requestBody,
    },
  })

  //throw new ResolverError(message, 501, 'NOT_IMPLEMENTED')

  await next()
}
