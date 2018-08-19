import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes.js'
import iView from 'iview'
import Store from '../store'
Vue.use(Router)

const router = new Router({
  routes
})
const LOGIN_PAGE_NAME = 'login'
const HOME_PAGE_NAME = 'activation-code-list' // TODO: 待定首页为条形码

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start()

  const hasLogin = Store.state.user.hasLogin

  if (!hasLogin && to.name !== LOGIN_PAGE_NAME) {
    next({
      name: LOGIN_PAGE_NAME
    })
  } else if (hasLogin && to.name === LOGIN_PAGE_NAME) {
    next({
      name: HOME_PAGE_NAME
    })
  } else {
    next()
  }
})

router.afterEach((to, from) => {
  iView.LoadingBar.finish()
})

export default router
