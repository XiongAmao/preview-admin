import Vue from 'vue'
import Vuex from 'vuex'

import user from './module/user'
import app from './module/app'

import localCachePlugin from './plugin/local-cache'
import { getToken } from '@/libs/utils.js'

const token = getToken()

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
      { type: 'user/setUserUUID', check: token },
      { type: 'user/setUserAccount', check: token },
      { type: 'user/setToken', check: token },
    ])
  ]
})
