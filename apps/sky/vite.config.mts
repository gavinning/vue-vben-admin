import { defineConfig } from '@vben/vite-config'
import AutoImport from 'unplugin-auto-import/vite'
import ElementPlus from 'unplugin-element-plus/vite'

export default defineConfig(async () => {
  return {
    application: {},
    vite: {
      plugins: [
        ElementPlus({
          format: 'esm',
        }),
        AutoImport({
          include: [
            /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
            /\.vue$/,
            /\.vue\?vue/, // .vue
            /\.md$/, // .md
          ],
          dts: true,
          imports: [
            'vue',
            'vue-router',
            {
              pinia: ['defineStore', 'createPinia'],
              '@/config': [],
              '@/store': [],
              '@/helper': [],
              '@4a/helper': ['merge', 'mergeDefaults', 'removeKey'],
            },
          ],
        }),
      ],
      server: {
        proxy: {
          '/api': {
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, ''),
            // mock代理目标地址
            target: 'http://localhost:5320/api',
            ws: true,
          },
        },
      },
    },
  }
})
