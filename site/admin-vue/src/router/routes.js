import rp from './rp'
import user from './user'

const routes = [
  {
    path: '/login',
    name: 'login',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/views/login/login.vue')
  },
  // TODO: 入口暂定
  ...rp,
  ...user,
  {
    path: '*',
    name: 'error_404',
    meta: {
      type: '404'
    },
    component: () => import('@/views/error-page/404.vue')
  }
]

export default routes
