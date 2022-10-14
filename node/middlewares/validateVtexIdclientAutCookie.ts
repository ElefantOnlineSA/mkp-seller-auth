import { AuthenticationError } from '@vtex/api'

export async function validateVtexIdclientAutCookie(
  ctx: Context,
  next: () => Promise<any>
) {
  const {
    vtex: { logger },
    state: { requestHeaders, requesterTokenDetails },
    clients: { vtexid },
  } = ctx

  const tokenValidation = await vtexid.validate(
    requestHeaders.vtexidclientautcookie,
    requesterTokenDetails.account
  )

  if (tokenValidation.authStatus !== 'Success') {
    logger.error({
      message: 'Invalid VtexIdClientAutCookie',
      data: {
        requesterTokenDetails,
      },
    })
    throw new AuthenticationError(
      'Invalid VtexIdClientAutCookie Header'
    )
  }

  await next()
}
