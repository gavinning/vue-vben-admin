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
        name: 'PayEdit',
        path: '/pay/edit/:id',
        component: () => import('#/views/dashboard/pay/edit.vue'),
        meta: {
          icon: 'carbon:edit',
          title: '修改支付',
          hideInMenu: true,
          hideInTabs: true,
        },
      },
    ],
  },
]

if (import.meta.env.DEV) {
  const analytics = {
    name: 'Analytics',
    path: '/analytics',
    component: () => import('#/views/dashboard/analytics/index.vue'),
    meta: {
      affixTab: true,
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

  routes[0]?.children?.push(analytics, workspace)
}

export default routes
