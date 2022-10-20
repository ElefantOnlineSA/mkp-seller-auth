import atob from 'atob'
import { ForbiddenError } from '@vtex/api'

function parseJwt(token: string) {
  const base64Url = token.split('.')[1]
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map((c: string) => {
        return `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`
      })
      .join('')
  )

  return JSON.parse(jsonPayload)
}

async function validateConfiguration(ctx: Context, requesterTokenDetails: any) {
  const {
    clients: { sellers },
  } = ctx

  if (requesterTokenDetails.account == ctx.vtex.account)
    return true

  const sellerResponse = await sellers.getSeller(requesterTokenDetails.account)
  return sellerResponse.status === 200
}

export async function checkConfiguration(
  ctx: Context,
  next: () => Promise<any>
) {
  const {
    vtex: { logger },
    state: { requestHeaders },
  } = ctx

  const requesterTokenDetails = parseJwt(requestHeaders.vtexidclientautcookie)
  ctx.state.requesterTokenDetails = requesterTokenDetails
  //console.warn('checkConfiguration requesterTokenDetails:', requesterTokenDetails)

  const validConfig = await validateConfiguration(ctx, requesterTokenDetails)
  //console.debug('sellerResponse:', sellerResponse)

  if (!validConfig) {
    logger.error({
      message: 'Invalid configuration',
      data: {
        requesterTokenDetails,
      },
    })

    //If seller check affiliations (https://{account}.myvtex.com/admin/checkout/#/affiliates). If marketplace check sellers list (https://{account}.myvtex.com/admin/Site/Seller.aspx)
    throw new ForbiddenError(
      `Configuration for account ${requesterTokenDetails.account} not found.`
    )
  }

  await next()
}
