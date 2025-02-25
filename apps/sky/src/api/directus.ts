import type { QueryMany } from '@directus/sdk'
import type { VxeGridPropTypes } from 'vxe-table'

import { getPayList, getTradeList } from './core'

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

/**
 * 合并默认Directus List API默认参数
 * @param params 实际参数
 * @returns 合并后的参数
 */
export function defaultParams(params: QueryMany<any> = {}): QueryMany<any> {
  return merge(true, {}, DEFAULT_PARAMS, params)
}

/**
 * VxeGrid列表数据代理
 * @param params VxeGrid.query参数
 * @param fn 实际请求函数
 * @returns VxeGrid列表数据
 */
export async function getDirectusListBridge({
  page,
}: VxeGridPropTypes.ProxyAjaxQueryParams) {
  const data = await getTradeList({
    page: page.currentPage,
    limit: page.pageSize,
  })
  return {
    items: data,
    total: data.length,
  }
}

// TODO 待实现公共处理
export async function getDirectusPayListBridge({
  page,
}: VxeGridPropTypes.ProxyAjaxQueryParams) {
  const data = await getPayList({
    page: page.currentPage,
    limit: page.pageSize,
  })
  return {
    items: data,
    total: data.length,
  }
}
