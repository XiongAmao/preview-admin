import Vue from 'vue'
import Vuex from 'vuex'

import user from './module/user'
import app from './module/app'

import localCachePlugin from './plugin/local-cache'
import { getLoginStatus } from '@/libs/utils.js'

const hasLogin = getLoginStatus()

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

  },
  mutations: {

  },
  actions: {

  },
  modules: {
    app,
    user
  },
  plugins: [
    localCachePlugin([
      { type: 'user/setUserUUID', check: hasLogin },
      { type: 'user/setUserAccount', check: hasLogin },
      { type: 'user/setLoginStatus', check: hasLogin },
      { type: 'app/setLoginStatus', check: hasLogin }
    ])
  ]
})
