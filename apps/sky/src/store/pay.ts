const configApi = directusItem('configs')

export const usePayStore = defineStore('payStore', {
  state: () => ({
    payList: [] as App.Pay.Row[],
    payColumns: [] as any[],
    payFormSchema: {} as any,
  }),
  actions: {
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
      const form = (data?.map?.form as any) || {}
      const columns = (data?.map?.columns as any[]) || []

      form.schema = form.schema?.map((item) => {
        if (!item.component) item.component = 'Input'
        return item
      })

      this.payColumns = columns
      this.payFormSchema = form
    },
  },
})
