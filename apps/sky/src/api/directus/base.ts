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
}

// 默认的collection参数
const collectionDefaultParams = {
  trades: {
    filter: filter30DaysAgo(),
  },
}

/**
 * 合并默认Directus List API默认参数
 * @param collection 集合名称
 * @param params 实际参数
 * @returns 合并后的参数
 */
export function defaultParams(
  collection: string,
  params: QueryMany<any> = {},
): QueryMany<any> {
  const collectionParams = collectionDefaultParams[collection] || {}
  return merge(true, {}, DEFAULT_PARAMS, collectionParams, params)
}

// 计算往前推30天的日期
export function get30DaysAgoDate() {
  const date = new Date()
  date.setDate(date.getDate() - 30)
  return date.toISOString().split('T')[0]
}

// 过滤近30天的数据
export function filter30DaysAgo() {
  return { date_created: { _gte: get30DaysAgoDate() } }
}
