const api = directusItem('pays')
const configApi = directusItem('configs')

export const usePayStore = defineStore('payStore', {
  state: () => ({
    payList: [] as App.Pay.Row[],
    payFormSchema: {} as any,
  }),
  actions: {
    async add(item: App.Pay.Row) {
      ok(item.appId, 'AppId 不能为空')
      ok(item.type, '支付类型 不能为空')
      // 代理可管理的支付固定位2
      item.channel = 2
      return api
        .add(item)
        .then(() => Message.success(`${item.name} 添加成功`))
        .catch((error) => {
          throw new Error(`${item.name} 添加失败：${error.message}`)
        })
    },

    async update(item: App.Pay.Row) {
      ok(item.appId, 'AppId 不能为空')
      ok(item.type, '支付类型 不能为空')
      // 代理可管理的支付固定位2
      item.channel = 2
      return api
        .update(item)
        .then(() => Message.success(`${item.name} 更新成功`))
        .catch((error) => {
          throw new Error(`${item.name} 更新失败：${error.message}`)
        })
    },

    // 优先使用缓存
    async getFormSchema() {
      return this.payFormSchema.schema?.length
        ? this.payFormSchema
        : this.getFormSchemaRequest()
    },

    // 获取创建和编辑的表单Schema
    async getFormSchemaRequest() {
      const data = await configApi.getOne(
        { filter: { key: { _eq: 'pays' } } },
        { withCredentials: false },
      )
      const form = data?.map?.form as any

      if (!form) return

      form.schema = form.schema.map((item) => {
        if (!item.component) item.component = 'Input'
        return item
      })

      // console.log(123, body)

      return (this.payFormSchema = form)
    },
  },
})
