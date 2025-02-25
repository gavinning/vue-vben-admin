import type { VxeGridPropTypes } from 'vxe-table'

import type { VxeGridProps } from '#/adapter/vxe-table'

import { useVbenVxeGrid } from '#/adapter/vxe-table'

export interface GridOptions {
  columns: Item[]
  proxyConfig?: VxeGridPropTypes.ProxyConfig<any>
  toolbarConfig?: VxeGridPropTypes.ToolbarConfig
}

export function defineGird<T>(grid: GridOptions) {
  const gridOptions: VxeGridProps<T> = {
    keepSource: true,
    columns: grid.columns,
    proxyConfig: grid.proxyConfig,
    tooltipConfig: mergeDefaults(grid.toolbarConfig, {
      custom: true,
      export: false,
      import: false,
      refresh: true,
      zoom: true,
    }),
  }
  return useVbenVxeGrid({ gridOptions })
}
