import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'vscode-icons:file-type-fitbit',
      order: -1,
      title: '项目',
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
    ],
  },
]

export default routes
