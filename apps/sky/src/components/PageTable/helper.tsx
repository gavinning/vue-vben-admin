import { ElButton } from 'element-plus'
import { VxeGridPropTypes } from 'vxe-table'

import { useVbenVxeGrid, VxeTableGridOptions } from '#/adapter/vxe-table'

export interface ActionQueryBody {
  items: any[]
  total: number
}

type ActionQuery = (
  params: VxeGridPropTypes.ProxyAjaxQueryParams,
) => Promise<ActionQueryBody>

export interface TableProps {
  columns: Item[]
  action: {
    create?: AnyAsyncFunction
    query: ActionQuery
    remove?: (row: Item) => Promise<any>
    update?: (row: Item) => Promise<any>
  }
  toolbarConfig?: VxeGridPropTypes.ToolbarConfig
  gridOptions?: VxeTableGridOptions
}

// 操作列的默认配置
const defaultActionColumn = {
  field: 'action',
  fixed: 'right',
  slots: { default: 'action' },
  title: '操作',
  width: 120,
}

const defaultAction = (row: App.Pay.Row, action: TableProps['action']) => (
  <div class="table-action">
    <ElButton
      link
      onClick={() => action.update?.(row)}
      plain
      type="primary"
      v-show={action.update}
    >
      编辑
    </ElButton>
    <ElButton
      link
      onClick={() => action.remove?.(row)}
      plain
      type="danger"
      v-show={action.remove}
    >
      删除
    </ElButton>
  </div>
)

export const renderAction = (action: TableProps['action']) => ({
  action: ({ row }: Record<'row', App.Pay.Row>) => defaultAction(row, action),
  'toolbar-tools': () => (
    <ElButton
      class="mr-2"
      onClick={() => action.create?.()}
      type="primary"
      v-show={action.create}
    >
      新增
    </ElButton>
  ),
})

export const defineGrid = (props: TableProps) => {
  const action = props.action
  // 决定是否显示操作列
  const columns =
    action.update || action.remove
      ? [...props.columns, defaultActionColumn]
      : props.columns

  // 构建VbenVxeGrid的默认配置
  // 外部可以传入完整的props.gridOptions配置进行更多的定制
  const gridOptions: VxeTableGridOptions = mergeDefaults(
    {
      keepSource: true,
      columns,
      proxyConfig: {
        ajax: {
          query: action.query,
        },
        autoLoad: true,
        response: {
          result: 'items',
          total: 'total',
          list: 'items',
        },
      },
      toolbarConfig: {
        custom: true,
        export: false,
        import: false,
        refresh: true,
        zoom: true,
      },

      // 外部传入的props.gridOptions配置会覆盖默认配置
    },
    props.gridOptions,
  )

  return useVbenVxeGrid({ gridOptions })
}
