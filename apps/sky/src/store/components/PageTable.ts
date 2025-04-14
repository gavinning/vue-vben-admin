import { filter } from '#/api'

// 处理表的增删改查 For PageTable
// 详见 #/components/PageTable/PageTable.tsx
export const usePageTableStore = defineStore('PageTableStore', {
  state: () => ({
    // 当前表
    name: '' as string,

    // 当前表的功能权限 c=create u=update d=remove
    cud: {} as Record<string, string>,

    // 当前表构建表单的schema
    schema: {} as Item,

    // 当前表构建表格的列
    column: {} as Record<string, any[]>,
  }),

  getters: {
    api: () => directusItem('configs'),
    currentCUD: (state) => state.cud[state.name] || '',
    currentSchema: (state) => state.schema[state.name] || {},
    currentColumns: (state) => state.column[state.name] || [],
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
        { withCredentials: false },
      )

      const cud = data?.map?.cud || ''
      const form = (data?.map?.form as any) || {}
      const columns = (data?.map?.columns as any[]) || []

      // 默认为Input
      form.schema = form.schema?.map((item) => {
        if (!item.component) item.component = 'Input'
        return item
      })

      this.cud[this.name] = cud
      this.schema[this.name] = form
      this.column[this.name] = columns
    },
  },
})
