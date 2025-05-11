// 数据中转站
// 1.用于跨组件通信
// 2.用于组件与系统通信
import { usePreferences } from '@vben/preferences'

import wujie from 'wujie-vue3'

import { getHost } from '#/config'

export const useChartsHub = defineStore('chartsHub', {
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
