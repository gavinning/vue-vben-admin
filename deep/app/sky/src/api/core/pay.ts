import { requestClient as req } from '../request'

export namespace PayApi {
  export interface PayItem {
    account?: string
    appId: string
    appSecret?: string
    channel: number
    description?: string
    enabled: boolean
    id: number
    key?: string
    name: string
    owner: string
    salt?: string
    secret?: string
    type: string
  }
}

/**
 * 获取支付列表
 * @returns 支付列表
 */
export async function getPayList() {
  return req.get<PayApi.PayItem[]>('/items/pays')
}
