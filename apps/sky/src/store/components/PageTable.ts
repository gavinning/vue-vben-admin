import { filter } from '#/api'
import {
  FormSchema,
  PageTableHook,
  PageTableHooks,
} from '#/components/PageTable'

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

    // form hooks
    // 在表单组件渲染前执行
    // 通常用于对FormSchema的动态修改需求
    // 比如某个下拉菜单需要根据服务器返回的数据来动态设置选项
    hook: {} as Record<string, PageTableHooks>,
  }),

  getters: {
    api: () => directusItem('configs'),
    currentCUD: (state) => state.cud[state.name] || '',
    currentHook: (state) => state.hook[state.name] || ({} as PageTableHooks),
    currentSchema: (state) => state.schema[state.name] || ({} as FormSchema),
    currentColumns: (state) => state.column[state.name] || ([] as any[]),
  },

  actions: {
    /**
     * 用于动态修改表单
     * 在表单组件渲染前执行
     * 通常用于对FormSchema的动态修改需求
     * 比如某个下拉菜单需要根据服务器返回的数据来动态设置选项
     * @param name 表名
     * @param hooks hook函数或hooks对象
     *
     * @example
     * store.setHook('links', async (schema) => {
     *   // schema do something
     *   return schema
     * })
     */
    setHook(name: string, hooks: PageTableHook | PageTableHooks) {
      this.hook[name] = typeof hooks === 'function' ? { hook: hooks } : hooks
    },

    /**
     * 创建类型表单渲染前执行
     * create操作的Form表单在渲染前调用
     * 一般与editComponentProps的key相同
     * 只是value不同，方便为创建和编辑设置不同的默认值
     */
    async beforeCreate() {
      // 表单通用渲染前钩子
      if (this.currentHook.hook) {
        this.schema[this.name] = await this.currentHook.hook(this.currentSchema)
      }
      // 创建类型表单渲染前钩子
      if (this.currentHook.create) {
        this.schema[this.name] = await this.currentHook.create(
          this.currentSchema,
        )
      }
      // 创建类型表单渲染前参数合并
      this.currentSchema.schema?.forEach((schema) => {
        if (schema.createComponentProps) {
          merge(schema.componentProps, schema.createComponentProps)
        }
      })
    },

    /**
     * 更新类型表单渲染前执行
     * update操作的Form表单在渲染前调用
     */
    async beforeEdit(row: Item) {
      // 表单通用渲染前钩子
      if (this.currentHook.hook) {
        this.schema[this.name] = await this.currentHook.hook(
          this.currentSchema,
          row,
        )
      }
      // 更新类型表单渲染前钩子
      if (this.currentHook.update) {
        this.schema[this.name] = await this.currentHook.update(
          this.currentSchema,
          row,
        )
      }
      // 更新类型表单渲染前参数合并
      this.currentSchema.schema?.forEach((schema) => {
        if (schema.editComponentProps) {
          merge(schema.componentProps, schema.editComponentProps)
        }
      })
    },

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
