import { diff, removeNull } from '#/helper'

const api = directusItem('links')

export const useLinkStore = defineStore('linkStore', {
  state: () => ({
    currentLink: null as App.Link.Row | null,
  }),

  actions: {
    async getLink(id?: string) {
      id = id || (useRoute().params.id as string)
      this.currentLink = await api.getById<App.Link.Row>(id, {
        fields: '*,app.name',
      })
      return this.currentLink
    },

    validation(item: App.Link.Row) {
      ok(item.amount, '金额不能为空')
      ok(item.app?.name === 'GROUP' && item.resource, '发货内容不能为空')
    },

    async add(item: App.Link.Row) {
      this.validation(item)
      return api
        .add(item)
        .then(() => Message.success(`链接添加成功`))
        .catch((error) => {
          throw new Error(`链接添加失败：${error.message}`)
        })
    },

    async update(item: App.Link.Row) {
      item = removeNull(item)
      item = diff(this.currentLink, item, ['id', 'amount'])
      delete item.app
      return api
        .update(item)
        .then(() => Message.success(`${item.id} 更新成功`))
        .catch((error) => {
          throw new Error(`${item.id} 更新失败：${error.message}`)
        })
    },
  },
})
