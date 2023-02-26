import { ForbiddenError } from '@vtex/api'

async function validateConfiguration(ctx: Context) {
  const {
    state: { requesterTokenDetails },
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

function validateRequestParams(ctx: Context) {
  const {
    query,
    state: { requesterTokenDetails },
    vtex: {
      account,
      route: { params },
    },
  } = ctx

  const queryAnValid = typeof query.an === 'undefined' || query.an === requesterTokenDetails.account
  const sellerAccountValid = typeof params.sellerAccount === 'undefined' || params.sellerAccount === requesterTokenDetails.account
  const marketplaceAccountValid = typeof params.marketplaceAccount === 'undefined' || params.marketplaceAccount === account

  return queryAnValid && sellerAccountValid && marketplaceAccountValid
}

export async function checkConfiguration(
  ctx: Context,
  next: () => Promise<any>
) {
  const {
    vtex: { logger, route: { params } },
    state: { requesterTokenDetails },
  } = ctx

  const validConfig = await validateConfiguration(ctx)
  if (!validConfig) {
    logger.error({
      message: 'Invalid configuration',
      data: {
        requesterTokenDetails,
        params,
      },
    })

    //If seller check affiliations (https://{account}.myvtex.com/admin/checkout/#/affiliates). If marketplace check sellers list (https://{account}.myvtex.com/admin/Site/Seller.aspx)
    throw new ForbiddenError(`Configuration for account ${requesterTokenDetails.account} not found.`)
  }

  const validRequestParams = validateRequestParams(ctx)
  if (!validRequestParams) {
    logger.error({
      message: 'Forbidden request params',
      data: {
        requesterTokenDetails,
        params,
      },
    })

    throw new ForbiddenError(`Forbidden request params for account ${requesterTokenDetails.account}.`)
  }

  await next()
}
