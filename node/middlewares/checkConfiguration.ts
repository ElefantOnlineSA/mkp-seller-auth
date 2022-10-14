import atob from 'atob'
import { NotFoundError } from '@vtex/api'

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

export async function checkConfiguration(
  ctx: Context,
  next: () => Promise<any>
) {
  const {
    vtex: { logger },
    state: { requestHeaders },
    clients: { sellers },
  } = ctx

  const requesterTokenDetails = parseJwt(
    requestHeaders.vtexidclientautcookie
  )

  // console.warn(
  //   'checkConfiguration requesterTokenDetails: ',
  //   requesterTokenDetails
  // )

  ctx.state.requesterTokenDetails = requesterTokenDetails
  const sellerResponse = await sellers.getSeller(requesterTokenDetails.account)
  const validConfig = sellerResponse.status === 200

  if (!validConfig) {
    logger.error({
      message: 'Invalid configuration',
      data: {
        requesterTokenDetails,
      },
    })

    //If seller check affiliations (https://{account}.myvtex.com/admin/checkout/#/affiliates). If marketplace check sellers list (https://{account}.myvtex.com/admin/Site/Seller.aspx)
    throw new NotFoundError(
      `Configuration for account ${requesterTokenDetails.account} not found.`
    )
  }

  await next()
}
