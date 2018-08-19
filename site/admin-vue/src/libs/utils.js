import { forEach } from './tools'
import LocalStorage from './local-storage'

const TOKEN_KEY = 'user/setToken' // 与store的commit相关联
const LOGIN_STATUS = 'login_status'
// 随机生成uuid 供后端调试使用
export const CreateRequestId = () => {
  var s = []
  var hexDigits = '0123456789abcdef'
  for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
  }
  s[14] = '4' // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1) // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = '-'

  var uuid = s.join('')
  return uuid
}

const hasChild = item => {
  return item.children && item.children.length !== 0
}

export const getMenuByRouter = (list) => {
  let res = []
  forEach(list, (item) => {
    if (item.meta && !item.meta.hideInMenu) {
      let obj = {
        icon: (item.meta && item.meta.icon) || '',
        name: item.name,
        meta: item.meta
      }
      if (hasChild(item)) {
        obj.children = getMenuByRouter(item.children)
      }
      res.push(obj)
    }
  })
  return res
}

// TOKEN 相关
export const getToken = () => {
  return LocalStorage.getItem(TOKEN_KEY)
}

export const setToken = (token) => {
  return LocalStorage.setItem(TOKEN_KEY, token)
}

export const removeToken = () => {
  return LocalStorage.removeItem(TOKEN_KEY)
}

export const setLoginStatus = (status) => {
  return LocalStorage.setItem(LOGIN_STATUS, status)
}

export const getLoginStatus = () => {
  return LocalStorage.getItem(LOGIN_STATUS)
}

export const removeLoginStatus = () => {
  return LocalStorage.removeItem(LOGIN_STATUS)
}
