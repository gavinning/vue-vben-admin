import { defineConfig } from '@vben/vite-config'
import AutoImport from 'unplugin-auto-import/vite'
import ElementPlus from 'unplugin-element-plus/vite'
import vueJsx from '@vitejs/plugin-vue-jsx'

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
              sky: ['emitter', 'AppEvent'],
              pinia: ['defineStore', 'createPinia'],
              'element-plus': [
                ['ElMessage', 'Message'],
                ['ElMessageBox', 'Popover'],
                ['ElNotification', 'Notice'],
              ],
              '#/api': ['directusItem'],
              '#/api/base': ['defaultParams'],
              '#/api/sdk': ['actor', 'actorItem', 'actorItem2'],
              '#/store': ['usePayStore', 'useLinkStore'],
              '#/helper': ['ok', 'filterFromArray', 'debug'],
              '#/exception': ['catchError'],
              '#/config': [],
              '@4a/helper': ['merge', 'mergeDefaults', 'removeKey', 'deepCopy'],
              '@vben/stores': ['useAccessStore', 'useUserStore'],
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
