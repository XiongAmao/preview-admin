import Axios from '@/libs/axios.js'

export const login = ({ userName, password }) => {
  const data = {
    account: userName,
    pw: password
  }
  return Axios.request({
    url: '/api/user/login',
    method: 'post',
    data
  })
}

export const logout = () => {
  return Axios.request({
    url: '/api/user/logout',
    method: 'post'
  })
}

export const getUserList = () => {
  return Axios.request({
    url: '/api/user',
    method: 'get'
  })
}

/**
 *
 * @param rpList rp权限列表
 * @param permission 功能权限 rp / sketch ...
 */
export const createUser = ({ username, password, rpList, permission }) => {
  const data = {
    username,
    password,
    rpList,
    permission
  }
  return Axios.request({
    url: '/api/user',
    method: 'post',
    data
  })
}

export const modifyUser = ({id, rpList, permission}) => {
  const data = {
    rpList,
    permission
  }
  return Axios.request({
    url: `/api/user/${id}`,
    method: 'put',
    data
  })
}

export const deleteUser = (id) => {
  return Axios.request({
    url: `/api/user/${id}`,
    method: 'put'
  })
}

export default {
  login,
  logout,
  getUserList,
  createUser,
  modifyUser,
  deleteUser
}
