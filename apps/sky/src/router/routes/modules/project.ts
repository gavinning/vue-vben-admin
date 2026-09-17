import type { RouteRecordRaw } from 'vue-router'

import { $t } from '#/locales'

const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'vscode-icons:file-type-fitbit',
      order: -1,
      title: 'DEV',
    },
    name: 'Projects',
    path: '/projects',
    children: [
      {
        name: 'Links',
        path: '/projects/links',
        component: () => import('#/views/projects/link/index.vue'),
        meta: {
          icon: 'line-md:link',
          title: '链接',
        },
      },
      {
        name: 'LinkEdit',
        path: '/projects/links/:id',
        component: () => import('#/views/projects/link/edit.vue'),
        meta: {
          icon: 'line-md:edit',
          title: 'Edit',
          hideInTab: true,
          hideInMenu: true,
        },
      },

      // ---
      {
        name: 'DemoPage',
        path: '/demoPage',
        component: () => import('#/views/projects/demo/demo.vue'),
        meta: {
          icon: 'carbon:demo',
          title: '测试页面',
        },
      },
      {
        name: 'Analytics',
        path: '/analytics',
        component: () => import('#/views/projects/analytics/index.vue'),
        meta: {
          icon: 'lucide:area-chart',
          title: $t('page.dashboard.analytics'),
        },
      },
      {
        name: 'Workspace',
        path: '/workspace',
        component: () => import('#/views/projects/workspace/index.vue'),
        meta: {
          icon: 'carbon:workspace',
          title: $t('page.dashboard.workspace'),
        },
      },
    ],
  },
]

export default import.meta.env.DEV ? routes : []
