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
        name: 'PM',
        path: '/pm',
        component: () => import('#/views/projects/pm/index.vue'),
        meta: {
          icon: 'line-md:link',
          title: '链接管理',
        },
      },
    ],
  },
]

export default routes
