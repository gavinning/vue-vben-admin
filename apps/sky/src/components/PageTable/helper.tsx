import type {
  RenderAction,
  TableAction,
  TableControl,
  TableProps,
} from './type'

import { ElButton } from 'element-plus'

import { useVbenVxeGrid, VxeTableGridOptions } from '#/adapter/vxe-table'
import { getListBridge } from '#/api/directus'

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

export const renderAction = (action: RenderAction) => ({
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

export const getEasyAction = (
  collection: string,
  ctrl: TableControl = {},
): TableAction => {
  const api = actorItem2(collection)

  // 必须，渲染列表请求接口
  const query = getListBridge(collection)

  // 可选，新增数据事件
  const create = (row: Item) => api.add(row)

  // 可选，更新数据事件
  const update = async (row: Item) => api.update(row)

  // 可选，删除数据事件
  const remove = async (row: Item) => api.remove(row)

  const action: TableAction = { query }

  if (ctrl.create) action.create = create
  if (ctrl.update) action.update = update
  if (ctrl.remove) action.remove = remove

  return action
}
