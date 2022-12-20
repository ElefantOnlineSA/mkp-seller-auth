import { ForbiddenError } from '@vtex/api'

async function validateConfiguration(ctx: Context, requesterTokenDetails: any) {
  const {
    clients: { sellers },
  } = ctx

  if (requesterTokenDetails.account == ctx.vtex.account)
    return true

  const sellerResponse = await sellers.getSeller(requesterTokenDetails.account).catch((error) => {
    return {
      status: error.response.status,
      data: error.response.data,
    }
  })

  return sellerResponse.status === 200
}

export async function checkConfiguration(
  ctx: Context,
  next: () => Promise<any>
) {
  const {
    vtex: { logger },
    state: { requesterTokenDetails },
  } = ctx

  const validConfig = await validateConfiguration(ctx, requesterTokenDetails)
  if (!validConfig) {
    logger.error({
      message: 'Invalid configuration',
      data: {
        requesterTokenDetails,
      },
    })

    //If seller check affiliations (https://{account}.myvtex.com/admin/checkout/#/affiliates). If marketplace check sellers list (https://{account}.myvtex.com/admin/Site/Seller.aspx)
    throw new ForbiddenError(`Configuration for account ${requesterTokenDetails.account} not found.`)
  }

  await next()
}
