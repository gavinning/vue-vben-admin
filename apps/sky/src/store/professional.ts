import { ProData } from '#/api/mock/pro'

export const useProStore = defineStore('professionalStore', {
  state: () => ({
    data: {} as ProData,
  }),
  actions: {
    async getData() {
      this.data = (await http.pro()) ?? ({} as ProData)
    },
  },
})
