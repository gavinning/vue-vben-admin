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
        component: () => import('#/views/dashboard/pay/index.vue'),
        meta: {
          icon: 'carbon:wallet',
          title: '支付',
        },
      },

      {
        name: 'Trade',
        path: '/trades',
        component: () => import('#/views/dashboard/trade/index.vue'),
        meta: {
          icon: 'carbon:list',
          title: '订单',
        },
      },
    ],
  },
]

if (import.meta.env.DEV) {
  const demoPage = {
    name: 'DemoPage',
    path: '/demoPage',
    component: () => import('#/views/dashboard/demo/demo.vue'),
    meta: {
      icon: 'carbon:demo',
      title: '测试页面',
    },
  }

  const analytics = {
    name: 'Analytics',
    path: '/analytics',
    component: () => import('#/views/dashboard/analytics/index.vue'),
    meta: {
      icon: 'lucide:area-chart',
      title: $t('page.dashboard.analytics'),
    },
  }
  const workspace = {
    name: 'Workspace',
    path: '/workspace',
    component: () => import('#/views/dashboard/workspace/index.vue'),
    meta: {
      icon: 'carbon:workspace',
      title: $t('page.dashboard.workspace'),
    },
  }

  routes[0]?.children?.push(demoPage, analytics, workspace)
}

export default routes
