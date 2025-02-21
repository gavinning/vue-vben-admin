import { ElNotification as Notice } from 'element-plus'
import { defineStore } from 'pinia'

import { addPayItem, getPayList, updatePayItem } from '#/api'

export const usePayStore = defineStore('pay', {
  state: () => ({
    payList: [] as App.Pay.Row[],
  }),
  actions: {
    async getPayList(params: any = {}) {
      this.payList = await getPayList(params)
    },

    async addPayItem(item: App.Pay.Row) {
      return addPayItem(item)
        .then(() => {
          Notice.success({
            title: '执行成功',
            message: `${item.name} 添加成功`,
          })
        })
        .catch((error) => {
          Notice.error({
            title: '执行失败',
            message: `${item.name} 添加失败：${error.message}`,
          })
          throw error
        })
    },

    async updatePayItem(item: App.Pay.Row) {
      return updatePayItem(item)
        .then(() => {
          Notice.success({
            title: '执行成功',
            message: `${item.name} 更新成功`,
          })
        })
        .catch((error) => {
          Notice.error({
            title: '执行失败',
            message: `${item.name} 更新失败：${error.message}`,
          })
          throw error
        })
    },
  },
})
