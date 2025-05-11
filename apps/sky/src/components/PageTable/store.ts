import { filter } from '#/api'
import { FormSchema } from '#/components/PageTable'

import {
  beforeFormEdit,
  beforeFormRender,
  beforeFormSubmit,
} from './interceptor'

// 处理表的增删改查 For PageTable
// 详见 #/components/PageTable/PageTable.tsx
export const usePageTableStore = defineStore('PageTableStore', {
  state: () => ({
    // 当前表
    name: '' as string,

    // 当前表的功能权限 c=create u=update d=remove
    cud: {} as Record<string, string>,

    // 当前表构建表单的schema
    schema: {} as Record<string, FormSchema>,

    // 当前表构建表格的列
    column: {} as Record<string, any[]>,
  }),

  getters: {
    api: () => directusItem('configs'),
    currentCUD: (state) => state.cud[state.name] || '',
    currentSchema: (state) => state.schema[state.name] || ({} as FormSchema),
    currentColumns: (state) => state.column[state.name] || ([] as any[]),

    // 获取当前表单的Upload组件
    currentUploadSchemas: (state) => {
      const formSchema = state.schema[state.name]
      if (!formSchema) return []
      return (
        formSchema.schema?.filter((item) => item.component === 'Upload') ?? []
      )
    },
  },

  actions: {
    // 外部调用·优先使用缓存
    async getFormSchema(name: string) {
      this.name = name
      return this.currentSchema.schema?.length
        ? this.currentSchema
        : this.getFormSchemaRequest()
    },

    // 外部应该调用getFormSchema方法
    // 从服务器获取创建和编辑的表单Schema
    async getFormSchemaRequest() {
      const data = await this.api.getOne(
        filter({ key: this.name, name: 'FormSchema' }),
      )

      const cud = data?.map?.cud || ''
      const form = (data?.map?.form as any) || {}
      const columns = (data?.map?.columns as any[]) || []

      this.cud[this.name] = cud
      this.schema[this.name] = form
      this.column[this.name] = columns
    },

    // 生命周期钩子：beforeFormEdit
    // 在FormSchema渲染之前，对FormSchema进行预处理
    // 调用时机：Form.reset之后，Form.setValues之前
    async beforeFormRender(isEdit?: boolean) {
      const ctx = await beforeFormRender({
        name: this.name as App.Table,
        data: this.currentSchema,
        isEdit,
      })
      this.schema[this.name] = ctx.data
    },

    // 生命周期钩子：beforeFormEdit
    // 在编辑表单之前，对数据进行预处理
    // 调用时机：beforeFormRender之后，Form.setValues之前
    async beforeFormEdit(row: Item) {
      row = clone(row)
      const ctx = await beforeFormEdit({
        data: row,
        name: this.name as App.Table,
        uploadSchemas: this.currentUploadSchemas,
      })
      return ctx.data
    },

    // 生命周期钩子：beforeFormSubmit
    // 在提交表单之前，对数据进行预处理
    // 调用时机1：handleValuesChange钩子内，用于处理表单值变化
    // 调用时机2：onFormSubmit钩子内，实际action触发之前
    async beforeFormSubmit(isEdit: boolean, row: Item) {
      row = clone(row)
      const ctx = await beforeFormSubmit({
        data: row,
        isEdit,
        name: this.name as App.Table,
        uploadSchemas: this.currentUploadSchemas,
      })
      return ctx.data
    },
  },
})
