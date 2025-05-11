import { FormSchema } from '#/components/PageTable'

export interface IFormSchemaContext {
  /**
   * 当前的FormSchema
   */
  data: FormSchema
  /**
   * 数据表名称
   */
  name: App.Table

  /**
   * 是否是编辑模式 true: 编辑模式 false: 新增模式 undefined: 未知
   */
  isEdit?: boolean
}
