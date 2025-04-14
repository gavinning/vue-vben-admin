import { defineConfig } from '@vben/vite-config'

import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import ElementPlus from 'unplugin-element-plus/vite'

export default defineConfig(async () => {
  return {
    application: {},
    vite: {
      plugins: [
        vueJsx(),
        ElementPlus({
          format: 'esm',
        }),
        AutoImport({
          dts: true,
          imports: [
            'vue',
            'vue-router',
            {
              '#/api': ['directusItem'],
              '#/api/base': ['defaultParams'],
              '#/api/sdk': ['actor', 'actorItem', 'actorItem2'],
              '#/config': [],
              '#/exception': ['catchError'],
              '#/helper': ['ok', 'filterFromArray', 'debug'],
              '#/store': ['usePayStore', 'useLinkStore', 'usePageTableStore'],
              '@4a/helper': ['merge', 'mergeDefaults', 'removeKey', 'deepCopy'],
              '@vben/stores': ['useAccessStore', 'useUserStore'],
              'element-plus': [
                ['ElMessage', 'Message'],
                ['ElMessageBox', 'Popover'],
                ['ElNotification', 'Notice'],
              ],
              pinia: ['defineStore', 'createPinia'],
              sky: ['emitter', 'AppEvent'],
            },
          ],
          include: [
            /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
            /\.vue$/,
            /\.vue\?vue/, // .vue
            /\.md$/, // .md
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
