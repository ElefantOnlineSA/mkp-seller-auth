import { json } from 'co-body'

export async function configRegistration(ctx: Context, next: () => Promise<any>) {
  const {
    vtex: {
      route: { params },
    },
    clients: { marketplace },
  } = ctx

  const data = await json(ctx.req)
  const mapperId = params.mapperId as string
  const response = await marketplace.registerMapper(mapperId, data)

  ctx.body = response.data
  ctx.status = response.status

  await next()
}

export async function mapperBrands(ctx: Context, next: () => Promise<any>) {
  const {
    vtex: {
      route: { params },
    },
    clients: { marketplace },
  } = ctx

  const marketplaceAccount = params.marketplaceAccount as string
  const sellerAccount = params.sellerAccount as string
  const response = await marketplace.registerMapperBrand(marketplaceAccount, sellerAccount)

  ctx.body = response.data
  ctx.status = response.status

  await next()
}

export async function mapperCategories(ctx: Context, next: () => Promise<any>) {
  const {
    vtex: {
      route: { params },
    },
    clients: { marketplace },
  } = ctx

  const marketplaceAccount = params.marketplaceAccount as string
  const sellerAccount = params.sellerAccount as string
  const response = await marketplace.registerMapperCategory(marketplaceAccount, sellerAccount)

  ctx.body = response.data
  ctx.status = response.status

  await next()
}

export async function notificationInventory(ctx: Context, next: () => Promise<any>) {
  const {
    vtex: {
      route: { params },
    },
    clients: { marketplace },
  } = ctx

  const sellerAccount = params.sellerAccount as string
  const idSku = params.idSku as string
  const response = await marketplace.notificationInventory(sellerAccount, idSku)

  ctx.body = response.data
  ctx.status = response.status

  await next()
}

export async function notificationPrice(ctx: Context, next: () => Promise<any>) {
  const {
    vtex: {
      route: { params },
    },
    clients: { marketplace },
  } = ctx

  const sellerAccount = params.sellerAccount as string
  const idSku = params.idSku as string
  const response = await marketplace.notificationPrice(sellerAccount, idSku)

  ctx.body = response.data
  ctx.status = response.status

  await next()
}

export async function mkpCategoryInfo(ctx: Context, next: () => Promise<any>) {
  const {
    vtex: {
      route: { params },
    },
    clients: { marketplace },
  } = ctx

  const categoryId = params.categoryId as string
  const response = await marketplace.getCategory(categoryId)

  ctx.body = response.data
  ctx.status = response.status

  await next()
}

export async function mkpBrandInfo(ctx: Context, next: () => Promise<any>) {
  const {
    vtex: {
      route: { params },
    },
    clients: { marketplace },
  } = ctx

  const brandId = params.brandId as string
  const response = await marketplace.getBrand(brandId)

  ctx.body = response.data
  ctx.status = response.status

  await next()
}

export async function sendSKUSuggestion(ctx: Context, next: () => Promise<any>) {
  const {
    vtex: {
      route: { params },
    },
    clients: { marketplace },
  } = ctx

  const data = await json(ctx.req)
  const marketplaceAccount = params.marketplaceAccount as string
  const sellerAccount = params.sellerAccount as string
  const idSku = params.idSku as string
  const response = await marketplace.sendSKUSuggestion(marketplaceAccount, sellerAccount, idSku, data)

  ctx.body = response.data
  ctx.status = response.status

  await next()
}
