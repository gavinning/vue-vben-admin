import type { RouteRecordRaw } from 'vue-router'

import { IFrameView } from '#/layouts'

const routes: RouteRecordRaw[] = [
  {
    name: 'Helpers',
    path: '/helpers/tiny-png',
    component: IFrameView,
    meta: {
      icon: 'lucide:settings',
      title: '图片压缩',
      link: 'https://tinypng.com/',
      order: 9999,
    },
  },
]

export default routes
