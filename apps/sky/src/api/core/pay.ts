import { removeKey } from '@4a/helper'

import { ok } from '#/helper/assert'

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
  ok(item.appId, 'appId 不能为空')
  ok(item.type, '支付类型 不能为空')
  // 代理可管理的支付固定位2
  item.channel = 2
  return req.post('/items/pays', item)
}

export async function updatePayItem(item: App.Pay.Row) {
  ok(item.appId, 'appId 不能为空')
  ok(item.type, '支付类型 不能为空')
  // 代理可管理的支付固定位2
  item.channel = 2
  return req.request(`/items/pays/${item.id}`, {
    method: 'patch',
    data: removeKey(item, ['id']),
  })
}
