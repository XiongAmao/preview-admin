import { login, logout } from '@/api/user'
import { getToken, setToken, removeToken } from '@/libs/utils.js'

export default {
  namespaced: true,
  state: {
    account: '',
    uuid: '',
    token: getToken()
  },
  mutations: {
    setUsername (state, account) {
      state.account = account
    },
    setToken (state, token) {
      state.token = token
      if (token) setToken(token)
      else removeToken()
    }
  },
  actions: {
    handleLogin ({ commit }, { username, password }) {
      username = username.trim()
      return new Promise((resolve, reject) => {
        login({ username, password }).then(res => {
          commit('setUsername', res.username)
          commit('setToken', res.token)
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
          commit('setToken', '')
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    handleLoginExpired ({ state, commit }) {
      return new Promise((resolve, reject) => {
        commit('setUsername', '')
        commit('setToken', '')
        resolve()
      })
    }
  },
  getters: {}
}
