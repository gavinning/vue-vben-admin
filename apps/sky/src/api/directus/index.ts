import type { VxeGridPropTypes } from 'vxe-table'

import { directusItem } from '../core'
import { defaultParams } from './base'

export * from './base'

export function getListBridge(collection: string) {
  return async ({ page }: VxeGridPropTypes.ProxyAjaxQueryParams) => {
    const body = await directusItem(collection).get(
      defaultParams(collection, {
        page: page.currentPage,
        limit: page.pageSize,
      }),
    )
    return {
      items: body.data,
      total: body.meta?.filter_count,
    }
  }
}
