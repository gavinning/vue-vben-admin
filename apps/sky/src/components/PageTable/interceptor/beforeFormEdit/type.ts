import { Schema } from '#/components/PageTable'

export interface IFormContext {
  data: Item // 表单数据
  name: App.Table // 表单名称
  uploadSchemas: Schema[]
}
