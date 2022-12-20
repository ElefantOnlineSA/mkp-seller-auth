import { AuthenticationError } from '@vtex/api'

export async function validateVtexIdclientAutCookie(
  ctx: Context,
  next: () => Promise<any>
) {
  const {
    vtex: { logger },
    state: { requestHeaders },
    clients: { vtexid },
  } = ctx

  const tokenValidation = await vtexid.validate(requestHeaders.vtexidclientautcookie)
  ctx.state.requesterTokenDetails = tokenValidation

  if (tokenValidation.authStatus !== 'Success') {
    logger.error({
      message: 'Invalid VtexIdClientAutCookie',
      data: {
        tokenValidation,
      },
    })

    throw new AuthenticationError('Invalid VtexIdClientAutCookie Header')
  }

  await next()
}
