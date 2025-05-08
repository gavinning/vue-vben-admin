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

    // 文件类型字段
    // 该字段用于接口上传发起请求之前对文件类型进行上传和转换
    // @apps/sky/src/store/components/PageTable.ts
    // @apps/sky/src/api/sdk/Interceptor/actorItem.ts
    fileFieldMap: {} as Record<string, Set<string>>,
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

    /**
     * 向文件类型字段中添加字段
     * @param name 表名 collection
     * @param key 字段名 field
     */
    addFileFieldMap(name: string, key: string) {
      if (!this.fileFieldMap[name]) {
        this.fileFieldMap[name] = new Set([])
      }
      this.fileFieldMap[name].add(key)
    },

    getFileFieldMap(name: string) {
      if (!this.fileFieldMap[name]) {
        this.fileFieldMap[name] = new Set([])
      }
      return this.fileFieldMap[name]
    },
  },
})
