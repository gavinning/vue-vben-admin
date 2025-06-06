import { defineConfig } from '@vben/vite-config'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import ElementPlus from 'unplugin-element-plus/vite'
import createIndex from 'vite-plugin-index'

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
              '#/api': ['directusItem', 'defaultParams', 'http'],
              '#/api/sdk': ['actor', 'actorItem', 'actorItem2'],
              '#/config': ['App'],
              '#/exception': ['catchError'],
              '#/helper': ['ok', 'diff', 'filterFromArray', 'debug', 'emitter', 'AppEvent'],
              '#/store': [
                'useAppStore',
                'usePayStore',
                'useLinkStore',
                'useChartsHub',
                'useUploadHub',
              ],
              '@4a/helper': ['merge', 'mergeDefaults', 'removeKey', 'deepCopy', 'removeNull', 'removeEmpty'],
              '@vben/stores': ['useAccessStore', 'useUserStore'],
              'element-plus': [
                ['ElMessage', 'Message'],
                ['ElMessageBox', 'Popover'],
                ['ElNotification', 'Notice'],
                ['ElLoading', 'Loading'],
              ],
              '#/models': ['FileImage'],
              'es-toolkit': ['clone'],
              pinia: ['defineStore', 'createPinia'],
            },
          ],
          include: [
            /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
            /\.vue$/,
            /\.vue\?vue/, // .vue
            /\.md$/, // .md
          ],
        }),
        createIndex({
          rules: [
            {
              glob: '**/*.ts',
              target: ['models', 'helper', 'config'],
            },
            {
              indexFirstMode: true,
              glob: '**/*.ts',
              target: ['store'],
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
