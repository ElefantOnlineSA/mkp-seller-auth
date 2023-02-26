import type { InstanceOptions, IOContext } from '@vtex/api'
import { JanusClient } from '@vtex/api'

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

  public registerMapperBrand = async (marketplaceAccount: string, sellerAccount: string) => {
    return this.http.postRaw(
      `/api/suggestion/${marketplaceAccount}/suggestions/mapping/seller/${sellerAccount}/register/brand`,
      null,
      { metric: 'register-mapper-brand' }
    )
  }

  public registerMapperCategory = async (marketplaceAccount: string, sellerAccount: string) => {
    return this.http.postRaw(
      `/api/suggestion/${marketplaceAccount}/suggestions/mapping/seller/${sellerAccount}/register/category`,
      null,
      { metric: 'register-mapper-category' }
    )
  }

  public notificationInventory = async (sellerAccount: string, sellerSkuId: string) => {
    //https://developers.vtex.com/vtex-rest-api/reference/inventorynotification
    return this.http.postRaw(
      `/api/notificator/${sellerAccount}/changenotification/${sellerSkuId}/inventory`,
      null,
      { metric: 'notification-inventory' }
    )
  }

  public notificationPrice = async (sellerAccount: string, sellerSkuId: string) => {
    //https://developers.vtex.com/vtex-rest-api/reference/pricenotification
    return this.http.postRaw(
      `/api/notificator/${sellerAccount}/changenotification/${sellerSkuId}/price`,
      null,
      { metric: 'notification-price' }
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

  public sendSKUSuggestion = async (marketplaceAccount: string, sellerAccount: string, sellerSkuId: string, data: any) => {
    //https://developers.vtex.com/vtex-rest-api/reference/savesuggestion
    return this.http.putRaw(
      `/${marketplaceAccount}/suggestions/${sellerAccount}/${sellerSkuId}`,
      data,
      { metric: 'send-sku-suggestion' }
    )
  }

  public deleteSKUSuggestion = async (marketplaceAccount: string, sellerAccount: string, sellerSkuId: string) => {
    //https://developers.vtex.com/vtex-rest-api/reference/savesuggestion
    return this.http.delete(
      `/${marketplaceAccount}/suggestions/${sellerAccount}/${sellerSkuId}`,
      { metric: 'delete-sku-suggestion' }
    )
  }

  public getSellerSKUBinding = async (sellerAccount: string, sellerSkuId: string) => {
    //https://developers.vtex.com/vtex-rest-api/reference/getskuseller
    return this.http.getRaw(
      `/api/sku-binding/pvt/skuseller/${sellerAccount}/${sellerSkuId}`,
      { metric: 'get-seller-sku-binding' }
    )
  }

  public getSellerSKUBindingsInfo = async (sellerAccount: string, skuId: string = '', sellerSkuId: string = '', isActive: string | null = null, size: number = 1) => {
    //https://developers.vtex.com/vtex-rest-api/reference/getpagedadmin
    const params: { [key: string]: string } = {
      sellerId: sellerAccount,
      skuId: skuId,
      sellerSkuId: sellerSkuId,
      size: size.toString()
    }

    if (isActive != null) {
      params['isActive'] = isActive
    }

    return this.http.getRaw(
      `/api/sku-binding/pvt/skuseller/admin`,
      {
        params: params,
        metric: 'get-seller-sku-bindings-info'
      }
    )
  }

  public activateSellerSKUBinding = async (sellerAccount: string, sellerSkuId: string) => {
    //https://developers.vtex.com/vtex-rest-api/reference/activateskubinding
    return this.http.postRaw(
      `/api/sku-binding/pvt/skuseller/activate/${sellerAccount}/${sellerSkuId}`,
      null,
      { metric: 'activate-seller-sku-binding' }
    )
  }

  public deactivateSellerSKUBinding = async (sellerAccount: string, sellerSkuId: string) => {
    //https://developers.vtex.com/vtex-rest-api/reference/deactivateskubinding
    return this.http.postRaw(
      `/api/sku-binding/pvt/skuseller/inactivate/${sellerAccount}/${sellerSkuId}`,
      null,
      { metric: 'deactivate-seller-sku-binding' }
    )
  }

  public removeSellerSKUBinding = async (sellerAccount: string, sellerSkuId: string) => {
    //https://developers.vtex.com/vtex-rest-api/reference/deleteskusellerassociation
    return this.http.postRaw(
      `/api/sku-binding/pvt/skuseller/remove/${sellerAccount}/${sellerSkuId}`,
      null,
      { metric: 'remove-seller-sku-binding' }
    )
  }
}
