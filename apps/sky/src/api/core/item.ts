import type { QueryMany } from '@directus/sdk'

import { RequestClientConfig } from '@vben/request'

import { requestClient as req, requestBody } from '../request'

async function get<T = Item>(
  collection: string,
  params: QueryMany<any> = {},
  config?: RequestClientConfig,
) {
  return requestBody.get<T>(`/items/${collection}`, { params, ...config })
}

async function getOne<T = Item>(
  collection: string,
  params: QueryMany<any> = {},
  config?: RequestClientConfig,
) {
  const body = await req.get(`/items/${collection}`, { params, ...config })
  return body[0] as T
}

function getById<T = Item>(
  collection: string,
  id: string,
  params: QueryMany<any> = {},
  config?: RequestClientConfig,
): Promise<T> {
  return req.get(`/items/${collection}/${id}`, { params, ...config })
}

async function add<T = Item>(
  collection: string,
  item: T,
  config?: RequestClientConfig,
) {
  return req.post(`/items/${collection}`, item, config)
}

async function update(
  collection: string,
  data: any,
  config?: RequestClientConfig,
) {
  return req.request(`/items/${collection}/${data.id}`, {
    data,
    method: 'patch',
    ...config,
  })
}

export function directusItem(collection: string) {
  return {
    getOne: <T = Item>(
      params: QueryMany<any> = {},
      config?: RequestClientConfig,
    ) => getOne<T>(collection, params, config),
    get: <T = Item>(
      params: QueryMany<any> = {},
      config?: RequestClientConfig,
    ) => get<T>(collection, params, config),
    add: <T = Item>(item: T, config?: RequestClientConfig) =>
      add<T>(collection, item, config),
    update: <T = Item>(item: T, config?: RequestClientConfig) =>
      update(collection, item, config),
    getById: <T = Item>(
      id: string,
      params: QueryMany<any> = {},
      config?: RequestClientConfig,
    ) => getById<T>(collection, id, params, config),
  }
}
