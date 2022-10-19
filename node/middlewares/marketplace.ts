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

  try {
    const response = await marketplace.registerMapper(mapperId, data)
    ctx.body = response.data
    ctx.status = response.status
  } catch (error) {
    ctx.body = error.response.data
    ctx.status = error.response.status
  }

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

  try {
    const response = await marketplace.registerMapperBrand(marketplaceAccount, sellerAccount)
    ctx.body = response.data
    ctx.status = response.status
  } catch (error) {
    ctx.body = error.response.data
    ctx.status = error.response.status
  }

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

  try {
    const response = await marketplace.registerMapperCategory(marketplaceAccount, sellerAccount)
    ctx.body = response.data
    ctx.status = response.status
  } catch (error) {
    ctx.body = error.response.data
    ctx.status = error.response.status
  }

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
  const sellerSkuId = params.sellerSkuId as string

  try {
    const response = await marketplace.notificationInventory(sellerAccount, sellerSkuId)
    ctx.body = response.data
    ctx.status = response.status
  } catch (error) {
    ctx.body = error.response.data
    ctx.status = error.response.status
  }

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
  const sellerSkuId = params.sellerSkuId as string

  try {
    const response = await marketplace.notificationPrice(sellerAccount, sellerSkuId)
    ctx.body = response.data
    ctx.status = response.status
  } catch (error) {
    ctx.body = error.response.data
    ctx.status = error.response.status
  }

  await next()
}

export async function getCategory(ctx: Context, next: () => Promise<any>) {
  const {
    vtex: {
      route: { params },
    },
    clients: { marketplace },
  } = ctx

  const categoryId = params.categoryId as string

  try {
    const response = await marketplace.getCategory(categoryId)
    ctx.body = response.data
    ctx.status = response.status
  } catch (error) {
    ctx.body = error.response.data
    ctx.status = error.response.status
  }

  await next()
}

export async function getBrand(ctx: Context, next: () => Promise<any>) {
  const {
    vtex: {
      route: { params },
    },
    clients: { marketplace },
  } = ctx

  const brandId = params.brandId as string

  try {
    const response = await marketplace.getBrand(brandId)
    ctx.body = response.data
    ctx.status = response.status
  } catch (error) {
    ctx.body = error.response.data
    ctx.status = error.response.status
  }

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
  const sellerSkuId = params.sellerSkuId as string

  try {
    const response = await marketplace.sendSKUSuggestion(marketplaceAccount, sellerAccount, sellerSkuId, data)
    ctx.body = response.data
    ctx.status = response.status
  } catch (error) {
    ctx.body = error.response.data
    ctx.status = error.response.status
  }

  await next()
}

export async function deleteSKUSuggestion(ctx: Context, next: () => Promise<any>) {
  const {
    vtex: {
      route: { params },
    },
    clients: { marketplace },
  } = ctx

  const marketplaceAccount = params.marketplaceAccount as string
  const sellerAccount = params.sellerAccount as string
  const sellerSkuId = params.sellerSkuId as string

  try {
    const response = await marketplace.deleteSKUSuggestion(marketplaceAccount, sellerAccount, sellerSkuId)
    ctx.body = response.data
    ctx.status = response.status
  } catch (error) {
    ctx.body = error.response.data
    ctx.status = error.response.status
  }

  await next()
}

export async function getSellerSKUBinding(ctx: Context, next: () => Promise<any>) {
  const {
    vtex: {
      route: { params },
    },
    clients: { marketplace },
  } = ctx

  const sellerAccount = params.sellerAccount as string
  const sellerSkuId = params.sellerSkuId as string

  try {
    const response = await marketplace.getSellerSKUBinding(sellerAccount, sellerSkuId)
    ctx.body = response.data
    ctx.status = response.status
  } catch (error) {
    ctx.body = error.response.data
    ctx.status = error.response.status
  }

  await next()
}

export async function activateSellerSKUBinding(ctx: Context, next: () => Promise<any>) {
  const {
    vtex: {
      route: { params },
    },
    clients: { marketplace },
  } = ctx

  const sellerAccount = params.sellerAccount as string
  const sellerSkuId = params.sellerSkuId as string

  try {
    const response = await marketplace.activateSellerSKUBinding(sellerAccount, sellerSkuId)
    ctx.body = response.data
    ctx.status = response.status
  } catch (error) {
    ctx.body = error.response.data
    ctx.status = error.response.status
  }

  await next()
}

export async function deactivateSellerSKUBinding(ctx: Context, next: () => Promise<any>) {
  const {
    vtex: {
      route: { params },
    },
    clients: { marketplace },
  } = ctx

  const sellerAccount = params.sellerAccount as string
  const sellerSkuId = params.sellerSkuId as string

  try {
    const response = await marketplace.deactivateSellerSKUBinding(sellerAccount, sellerSkuId)
    ctx.body = response.data
    ctx.status = response.status
  } catch (error) {
    ctx.body = error.response.data
    ctx.status = error.response.status
  }

  await next()
}

export async function removeSellerSKUBinding(ctx: Context, next: () => Promise<any>) {
  const {
    vtex: {
      route: { params },
    },
    clients: { marketplace },
  } = ctx

  const sellerAccount = params.sellerAccount as string
  const sellerSkuId = params.sellerSkuId as string

  try {
    const response = await marketplace.removeSellerSKUBinding(sellerAccount, sellerSkuId)
    ctx.body = response.data
    ctx.status = response.status
  } catch (error) {
    ctx.body = error.response.data
    ctx.status = error.response.status
  }

  await next()
}
