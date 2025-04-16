import { VxeGridPropTypes } from 'vxe-table'

import {
  ComponentProps,
  FormRenderProps,
  VbenFormProps,
  VbenFormSchema,
} from '#/adapter/form'
import { VxeTableGridOptions } from '#/adapter/vxe-table'

interface ActionQueryBody {
  items: any[]
  total: number
}

type ActionQuery = (
  params: VxeGridPropTypes.ProxyAjaxQueryParams,
) => Promise<ActionQueryBody>

export interface TableControl {
  create?: boolean
  update?: boolean
  remove?: boolean
}

export interface TableAction {
  /**
   * 表格渲染数据查询方法
   */
  query: ActionQuery
  /**
   * 新增row，用户提交创建表单时会调用此方法
   */
  create?: (row: Item) => Promise<any>
  /**
   * 更新row，用户提交编辑表单时会调用此方法
   */
  update?: (row: Item) => Promise<any>
  /**
   * 删除row，用户确定提交删除时会调用此方法
   */
  remove?: (row: Item) => Promise<any>
}

export interface RenderAction extends TableAction {
  create?: AnyFunction
}

// 扩展FormSchema
interface Schema extends VbenFormSchema {
  /**
   * 当值为数字类型时，用于控制数字输入框的输入范围
   */
  range: [number, number]
  /**
   * 表单组件编辑时渲染配置
   */
  editComponentProps: ComponentProps
  /**
   * 表单组件创建时渲染配置
   */
  createComponentProps: ComponentProps
}

export interface FormSchema extends FormRenderProps {
  schema?: Schema[]
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
  formRenderSchema?: FormSchema
}

// PageTable Hooks
export type PageTableHook<T extends Item = Item> = (
  schema: FormSchema,
  row?: Readonly<T>,
) => Promise<FormSchema>

export interface PageTableHooks {
  /**
   * 通用表单渲染钩子，在所有场景都会触发
   */
  hook?: PageTableHook
  /**
   * 新增表单渲染钩子
   */
  create?: PageTableHook
  /**
   * 编辑表单渲染钩子
   */
  update?: PageTableHook
}
