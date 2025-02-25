import type { QueryMany } from '@directus/sdk'

import { defaultParams } from '../directus'
import { requestClient as req } from '../request'

export async function getTradeList(params: QueryMany<any> = {}) {
  params = defaultParams({ ...params, fields: '*,app.name' })
  return req.get<App.Trade.Row[]>('/items/trades', { params })
}
