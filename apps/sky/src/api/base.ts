import type { QueryMany } from '@directus/sdk'

/**
 * Default params for Directus API
 * @url https://docs.directus.io/reference/query.html
 */
const DEFAULT_PARAMS = {
  page: 1,
  limit: 20,
  meta: 'filter_count',
  sort: ['-date_created'],
  filter: {
    owner: {
      _eq: '$CURRENT_USER',
    },
  },
  fields: '*,app.name',
}

/**
 * 合并默认Directus List API默认参数
 * @param params 实际参数
 * @returns 合并后的参数
 */
export function defaultParams(params: QueryMany<any> = {}): QueryMany<any> {
  return merge(true, {}, DEFAULT_PARAMS, params)
}
