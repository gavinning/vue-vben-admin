const api = actorItem2('pays')
const configApi = directusItem('configs')

export const usePayStore = defineStore('payStore', {
  state: () => ({
    payList: [] as App.Pay.Row[],
    payFormSchema: {} as any,
  }),
  actions: {
    // @deprecated
    async add(row: Item) {
      return api.add(row)
    },

    // @deprecated
    async update(row: Item) {
      return api.update(row)
    },

    async remove(row: Item) {
      return api.remove(row)
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

      // console.log(123, form)

      return (this.payFormSchema = form)
    },
  },
})
