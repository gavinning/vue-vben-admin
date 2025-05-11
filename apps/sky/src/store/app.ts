export const useAppStore = defineStore('appStore', {
  state: () => ({}),

  getters: {
    charts: () => useChartsHub().charts,
  },

  actions: {
    init() {
      useChartsHub().init()
    },
  },
})
