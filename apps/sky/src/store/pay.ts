const api = directusItem('pays')

export const usePayStore = defineStore('payStore', {
  state: () => ({
    payList: [] as App.Pay.Row[],
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
  },
})
