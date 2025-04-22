import { usePreferences } from '@vben/preferences'

import wujie from 'wujie-vue3'

import { getHost } from '#/config'

export const useAppStore = defineStore('appStore', {
  state: () => ({
    charts: {
      env: {
        apiURL: getHost(),
      },
      theme: {
        isDark: false,
      },
    },
  }),
  actions: {
    init() {
      const { isDark } = usePreferences()

      this.charts.theme.isDark = isDark.value
      wujie.bus.$emit('app:update', this.charts)

      watch(isDark, () => {
        this.charts.theme.isDark = isDark.value
        wujie.bus.$emit('app:update', this.charts)
      })
    },
  },
})
