import { removeKey } from '@4a/helper'

import { requestClient as req } from '../request'

/**
 * 获取支付列表
 * TODO params参数待实现
 * @param params 参数列表
 * @returns 支付列表
 */
export async function getPayList(params: any = {}) {
  return req.get<App.Pay.Row[]>('/items/pays', { params })
}

export async function addPayItem(item: App.Pay.Row) {
  return req.post('/items/pays', item)
}

export async function updatePayItem(item: App.Pay.Row) {
  return req.request(`/items/pays/${item.id}`, {
    method: 'patch',
    data: removeKey(item, [
      'id',
      '_X_ROW_KEY',
      'owner',
      'date_created',
      'date_updated',
      'deleted',
    ]),
  })
}
