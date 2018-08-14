const mongoose = require('mongoose')
const userSchema = require('../schema/User')

const UserModel = mongoose.model('user', userSchema)

const addUserToken = (username, token) => {
  return UserModel.update({username}, { $push: {
    'token_list': token
  }})
}

const removeUserToken = (username, token) => {
  const removeToken = token === 'all' ? [] : token
  return UserModel.update({username}, { $pull: {
    token_list: removeToken
  }}, (err) => { // 不适用错误捕获，就无法正常删除
    return err
  })
}

const addUser = () => {}
const removeUser = () => {}
const modifyRpList = () => {}

module.exports = {
  UserModel,
  addUserToken,
  removeUserToken,
  removeUser,
  modifyRpList
}
