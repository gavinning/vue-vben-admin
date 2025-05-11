import { Schema } from '#/components/PageTable'

export interface IFormContext {
  /**
   * 表单数据
   */
  data: Item
  /**
   * 数据表名称
   */
  name: App.Table
  /**
   * 上传的表单Schemas
   */
  uploadSchemas: Schema[]

  /**
   * 是否是编辑模式 true: 编辑模式 false: 新增模式 undefined: 未知
   */
  isEdit?: boolean
}
