import type { QueryMany } from '@directus/sdk'

import { defaultParams } from '../base'
import { requestClient as req, requestBody } from '../request'

async function get<T = Item>(collection: string, params: QueryMany<any> = {}) {
  params = defaultParams({ ...params, fields: '*,app.name' })
  return requestBody.get<T>(`/items/${collection}`, { params })
}

function getById<T = Item>(
  collection: string,
  id: string,
  params: QueryMany<any> = {},
): Promise<T> {
  return req.get(`/items/${collection}/${id}`, { params })
}

async function add<T = Item>(collection: string, item: T) {
  return req.post(`/items/${collection}`, item)
}

async function update(collection: string, data: any) {
  return req.request(`/items/${collection}/${data.id}`, {
    data,
    method: 'patch',
  })
}

export function directusItem(collection: string) {
  return {
    get: <T = Item>(params: QueryMany<any> = {}) => get<T>(collection, params),
    add: <T = Item>(item: T) => add<T>(collection, item),
    update: <T = Item>(item: T) => update(collection, item),
    getById: <T = Item>(id: string, params: QueryMany<any> = {}) =>
      getById<T>(collection, id, params),
  }
}
