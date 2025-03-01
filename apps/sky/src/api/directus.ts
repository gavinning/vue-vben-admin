import type { VxeGridPropTypes } from 'vxe-table'

import { directusItem } from './core'

export function getListBridge(collection: string) {
  return async ({ page }: VxeGridPropTypes.ProxyAjaxQueryParams) => {
    const body = await directusItem(collection).get({
      page: page.currentPage,
      limit: page.pageSize,
    })
    return {
      items: body.data,
      total: body.meta?.filter_count,
    }
  }
}
