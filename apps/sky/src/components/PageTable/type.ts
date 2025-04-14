import { VxeGridPropTypes } from 'vxe-table'

import { FormRenderProps, VbenFormProps } from '#/adapter/form'
import { VxeTableGridOptions } from '#/adapter/vxe-table'

interface ActionQueryBody {
  items: any[]
  total: number
}

type ActionQuery = (
  params: VxeGridPropTypes.ProxyAjaxQueryParams,
) => Promise<ActionQueryBody>

export interface TableAction {
  /**
   * 表格渲染数据查询方法
   */
  query: ActionQuery
  /**
   * 新增row
   */
  create?: (row: Item) => Promise<any>
  /**
   * 更新row
   */
  update?: (row: Item) => Promise<any>
  /**
   * 删除row
   */
  remove?: (row: Item) => Promise<any>
}

export interface RenderAction extends TableAction {
  create?: AnyFunction
}

export interface TableProps {
  /**
   * 表格列配置
   * 参考：https://doc.vben.pro/components/common-ui/vben-vxe-table.html
   */
  columns: Item[]
  /**
   * 表格操作事件
   */
  action: TableAction

  /**
   * 表格配置
   * 参考：https://doc.vben.pro/components/common-ui/vben-vxe-table.html
   */
  gridOptions?: VxeTableGridOptions

  /**
   * 表格工具栏配置
   * 参考：https://doc.vben.pro/components/common-ui/vben-vxe-table.html
   */
  toolbarConfig?: VxeGridPropTypes.ToolbarConfig

  /**
   * 表单attr完整配置，会透传到VbenForm组件
   * 参考：https://doc.vben.pro/components/common-ui/vben-form.html
   */
  formProps?: VbenFormProps

  /**
   * 表单渲染配置，服务器传递的schema对应此类型
   * 参考：https://doc.vben.pro/components/common-ui/vben-form.html
   */
  formRenderSchema?: FormRenderProps
}
