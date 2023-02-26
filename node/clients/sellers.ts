import type { InstanceOptions, IOContext } from '@vtex/api'
import { JanusClient } from '@vtex/api'

export default class Sellers extends JanusClient {
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

  public async getSeller(sellerId: string, sc: string | null = null): Promise<any> {
    //https://developers.vtex.com/vtex-rest-api/reference/getretrieveseller
    const url = `/api/catalog_system/pvt/sellers/${sellerId}`
    const params = {
      sc: sc
    }

    return this.http.getRaw(
      url,
      {
        params: params,
        metric: 'seller'
      }
    )
  }
}
