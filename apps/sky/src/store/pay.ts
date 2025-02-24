import { ElNotification as Notice } from 'element-plus'
import { defineStore } from 'pinia'

import { addPayItem, getPayList, updatePayItem } from '#/api'
import { ok } from '#/helper/assert'

export const usePayStore = defineStore('pay', {
  state: () => ({
    payList: [] as App.Pay.Row[],
  }),
  actions: {
    async getPayList(params: any = {}) {
      this.payList = await getPayList(params)
    },

    async addPayItem(item: App.Pay.Row) {
      ok(item.appId, 'AppId 不能为空')
      ok(item.type, '支付类型 不能为空')
      // 代理可管理的支付固定位2
      item.channel = 2
      return addPayItem(item)
        .then(() => {
          Notice.success({
            title: '执行成功',
            message: `${item.name} 添加成功`,
          })
        })
        .catch((error) => {
          throw new Error(`${item.name} 添加失败：${error.message}`)
        })
    },

    async updatePayItem(item: App.Pay.Row) {
      ok(item.appId, 'AppId 不能为空')
      ok(item.type, '支付类型 不能为空')
      // 代理可管理的支付固定位2
      item.channel = 2
      return updatePayItem(item)
        .then(() => {
          Notice.success({
            title: '执行成功',
            message: `${item.name} 更新成功`,
          })
        })
        .catch((error) => {
          throw new Error(`${item.name} 更新失败：${error.message}`)
        })
    },
  },
})
