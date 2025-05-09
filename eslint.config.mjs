// @ts-check
import { defineConfig } from '@vben/eslint-config'

export default defineConfig([
  {
    // 针对 Vue 文件的配置
    files: ["**/*.vue", "**/*.tsx"],
    rules: {
      "vue/multi-word-component-names": "off", // 全局关闭规则[2,5](@ref)
    },
  }
])
