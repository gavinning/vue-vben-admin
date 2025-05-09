import { filter } from '#/api'
import {
  FormSchema,
  PageTableHook,
  PageTableHooks,
  Schema,
} from '#/components/PageTable'
import { isLikeUUID } from '#/helper'

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
    // 修正限制单条上传图片的组件数据结构，不使用数组 [file] => file
    fixUploadComponentsDataStructure(row: Item) {
      row = clone(row)
      this.currentUploadSchemas.forEach((item) => {
        if (
          item.fieldName in row && // 单条数据
          (!item.componentProps?.multiple || item.componentProps?.limit === 1)
        ) {
          row[item.fieldName] = row[item.fieldName][0]
        }
      })
      return row
    },

    // 表单渲染之前对图片进行编码
    encodeImg(row: Item) {
      row = clone(row)
      this.currentUploadSchemas.forEach((item) => {
        if (item.fieldName in row) {
          const key = item.fieldName
          const value = row[key]
          if (isLikeUUID(value)) {
            row[key] = [FileImage.init(value)]
          } else if (Array.isArray(value)) {
            row[key] = value.map((file) => {
              return isLikeUUID(file) ? FileImage.init(file) : file
            })
          }
        }
      })
      return row
    },

    // 对图片字段进行解码
    decodeImg(row: Item) {
      row = clone(row)
      this.currentUploadSchemas.forEach((item) => {
        if (item.fieldName in row) {
          const key = item.fieldName
          const value = row[key]
          if (FileImage.isInstance(value)) {
            row[key] = value.id
          } else if (Array.isArray(value)) {
            row[key] = value.map((file) => {
              return FileImage.isInstance(file) ? file.id : file
            })
          }
        }
      })
      return row
    },

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

    // 对FormSchema做出一定预处理
    precoding(schema: Schema[]): Schema[] {
      if (!schema) return []

      const app = useAppStore()

      // Schema预处理
      schema = schema.map((item) => {
        // 默认为Input
        if (!item.component) item.component = 'Input'

        // 如果是上传组件，添加文件字段映射
        if (item.component === 'Upload') {
          app.addFileFieldMap(this.name, item.fieldName)
        }
        return item
      })

      return schema
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

      form.schema = this.precoding(form.schema)

      this.cud[this.name] = cud
      this.schema[this.name] = form
      this.column[this.name] = columns
    },
  },
})
