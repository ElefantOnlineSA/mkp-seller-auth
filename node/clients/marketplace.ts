import { JanusClient, InstanceOptions, IOContext } from '@vtex/api'

export default class Marketplace extends JanusClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super(context, {
      ...options,
      headers: {
        ...options?.headers,
        VtexIdclientAutCookie:
          context.adminUserAuthToken ?? context.authToken ?? '',
        'x-vtex-user-agent': context.userAgent,
      },
    })
  }

  public registerMapper = async (mapperId: string, data: any) => {
    return this.http.putRaw(
      `/api/mkp-category-mapper/connector/configuration/${mapperId}`,
      data,
      { metric: 'register-mapper' }
    )
  }

  public registerMapperBrand = async (marketplaceAccount: string, sellerId: string) => {
    return this.http.postRaw(
      `/api/suggestion/${marketplaceAccount}/suggestions/mapping/seller/${sellerId}/register/brand`,
      null,
      { metric: 'register-mapper-brand' }
    )
  }

  public registerMapperCategory = async (marketplaceAccount: string, sellerId: string) => {
    return this.http.postRaw(
      `/api/suggestion/${marketplaceAccount}/suggestions/mapping/seller/${sellerId}/register/category`,
      null,
      { metric: 'register-mapper-category' }
    )
  }

  public notificationInventory = async (sellerAccount: string, idSku: string) => {
    return this.http.postRaw(
      `/api/notificator/${sellerAccount}/changenotification/${idSku}/inventory`,
      null,
      { metric: 'notification-inventory' }
    )
  }

  public notificationPrice = async (sellerAccount: string, idSku: string) => {
    return this.http.postRaw(
      `/api/notificator/${sellerAccount}/changenotification/${idSku}/price`,
      null,
      { metric: 'notification-price' }
    )
  }

  // Endpoint supports V1+V2 https://{accountName}.{environment}.com.br/api/catalog_system/pvt/sku/stockkeepingunitbyid/{skuId}
  public getSkuById = async (skuId: string) => {
    //https://developers.vtex.com/vtex-rest-api/reference/catalog-api-get-sku-context
    return this.http.getRaw(
      `/api/catalog_system/pvt/sku/stockkeepingunitbyid/${skuId}`,
      { metric: 'get-product-by-sku-id' }
    )
  }

  public getCategoryTree = async (categoryLevels: number = 10) => {
    //https://developers.vtex.com/vtex-rest-api/reference/catalog-api-get-category-tree
    return this.http.getRaw(
      `/api/catalog_system/pub/category/tree/${categoryLevels}`,
      { metric: 'get-category-tree' }
    )
  }

  public getCategory = async (categoryId: string) => {
    //https://developers.vtex.com/vtex-rest-api/reference/catalog-api-get-category
    return this.http.getRaw(
      `/api/catalog/pvt/category/${categoryId}`,
      { metric: 'get-category' }
    )
  }

  public getBrand = async (brandId: string) => {
    //https://developers.vtex.com/vtex-rest-api/reference/catalog-api-get-brand
    return this.http.getRaw(
      `/api/catalog_system/pvt/brand/${brandId}`,
      { metric: 'get-brand' }
    )
  }

  public sendSKUSuggestion = async (marketplaceAccount: string, sellerAccount: string, idSku: string, data: any) => {
    return this.http.putRaw(
      `/${marketplaceAccount}/suggestions/${sellerAccount}/${idSku}`,
      data,
      { metric: 'send-sku-suggestion' }
    )
  }
}
