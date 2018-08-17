const mongoose = require('mongoose')
const userSchema = require('../schema/User')
const getError = require('../../libs/error')

const { MD5_SUFFIX, md5 } = require('../../constant')

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

const checkUserPassword = (username, password) => {
  return new Promise((resolve, reject) => {
    UserModel.findOne({
      username,
      password: md5(password + MD5_SUFFIX)
    }, (err, user) => {
      if (err) return reject(err)
      if (!user) reject(getError(40002))
      if (user) resolve()
    })
  })
}

const addUser = (username, password) => {
  return new Promise((resolve, reject) => {
    UserModel.findOne({
      username
    }, (err, user) => {
      if (err) return reject(err)
      if (user === null) {
        const insertObj = {
          username: username,
          password: md5(password + MD5_SUFFIX),
          role: 'normal'
        }
        const newUser = new UserModel(insertObj)
        newUser.save(insertObj, (err) => {
          if (err) return reject(err)
          return resolve()
        })
      } else {
        reject(getError(40001))
      }
    })
  })
}

const removeUser = () => {}
const modifyRpList = () => {}

module.exports = {
  UserModel,
  addUserToken,
  removeUserToken,
  addUser,
  checkUserPassword,
  removeUser,
  modifyRpList
}
