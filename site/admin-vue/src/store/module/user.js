import { login, logout } from '@/api/user'
import { setLoginStatus, getLoginStatus, removeLoginStatus } from '@/libs/utils.js'

export default {
  namespaced: true,
  state: {
    account: '',
    uuid: '',
    hasLogin: getLoginStatus()
  },
  mutations: {
    setUsername (state, account) {
      state.account = account
    },
    setLoginStatus (state, boolean) {
      state.hasLogin = boolean
      if (boolean) setLoginStatus(boolean)
      else removeLoginStatus()
    }
  },
  actions: {
    handleLogin ({ commit }, { username, password }) {
      username = username.trim()
      return new Promise((resolve, reject) => {
        login({ username, password }).then(res => {
          commit('setUsername', res.username)
          commit('setLoginStatus', true)
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    handleLogout ({ state, commit }) {
      return new Promise((resolve, reject) => {
        logout().then(res => {
          commit('setUsername', '')
          commit('setLoginStatus', '')
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    handleLoginExpired ({ state, commit }) {
      return new Promise((resolve, reject) => {
        commit('setUsername', '')
        commit('setLoginStatus', '')
        resolve()
      })
    }
  },
  getters: {}
}
