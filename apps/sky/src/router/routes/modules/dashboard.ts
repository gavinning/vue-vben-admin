import type { RouteRecordRaw } from 'vue-router'

import { $t } from '#/locales'

const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'lucide:layout-dashboard',
      order: -1,
      title: $t('page.dashboard.title'),
    },
    name: 'Dashboard',
    path: '/dashboard',
    children: [
      {
        name: 'Pay',
        path: '/dashboard',
        component: () => import('#/views/dashboard/pay'),
        meta: {
          icon: 'carbon:wallet',
          title: '支付',
          authority: ['Proxy1', 'Proxy2'],
        },
      },
      {
        name: 'Trade',
        path: '/trades',
        component: () => import('#/views/dashboard/trade'),
        meta: {
          icon: 'carbon:list',
          title: '订单',
        },
      },
      {
        name: 'Product',
        path: '/products',
        component: () => import('#/views/dashboard/product'),
        meta: {
          icon: 'carbon:app',
          title: '分成',
          authority: ['Proxy1', 'Proxy2'],
        },
      },
      {
        name: 'Link',
        path: '/links',
        component: () => import('#/views/dashboard/link'),
        meta: {
          icon: 'carbon:link',
          title: '链接',
        },
      },
      {
        name: 'Topic',
        path: '/topics',
        component: () => import('#/views/dashboard/topic'),
        meta: {
          icon: 'ion:apps',
          title: '专题',
        },
      },
      {
        name: 'Cate',
        path: '/cates',
        component: () => import('#/views/dashboard/cate'),
        meta: {
          icon: 'nrk:category',
          title: '分类',
        },
      },
      {
        name: 'Charts',
        path: '/charts',
        component: () => import('#/views/dashboard/charts'),
        meta: {
          icon: 'carbon:analytics',
          title: '趋势',
        },
      },
      {
        name: 'Professional',
        path: '/professional',
        component: () => import('#/views/dashboard/professional'),
        meta: {
          icon: 'mdi:professional-hexagon',
          title: '专业版',
          authority: ['Proxy1', 'Proxy2'],
        },
      },
    ],
  },
]

export default routes
