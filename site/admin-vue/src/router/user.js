import Main from '@/layout/main/main.vue'

export default [
  {
    path: '/user',
    name: 'user',
    component: Main,
    children: [
      {
        path: 'list',
        name: 'user-list',
        component: () => import('@/views/user/list/user-list.vue')
      }
    ]
  }
]
