import Main from '@/layout/main/main.vue'

const RpList = () => import('@/views/rp/list/rp-list.vue')
const RpViewer = () => import('@/views/rp/viewer/rp-viewer.vue')
export default [
  {
    path: '/rp',
    component: Main,
    name: 'rp',
    redirect: '/rp/list',
    children: [
      {
        name: 'rp-list',
        path: 'list',
        component: RpList
      }
    ]
  },
  {
    name: 'rp-viewer',
    path: '/rp/view',
    component: RpViewer
  }
]
