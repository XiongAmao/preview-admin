const UserModel = require('../db/model/user_model')
const SessionModel = require('../db/model/session_model')
const getError = require('../libs/error')

const { MD5_SUFFIX, md5 } = require('../config')

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

// 这里是绕过了session处理模块，直接对数据库操作对应session
// 仅用于修改权限/踢掉线 等需要重置session的地方
const removeUserSession = (username) => {
  // 移除所有该用户的session
  const userRegexp = new RegExp(`username":"${username}`)
  return new Promise((resolve, reject) => {
    SessionModel.find({
      session: userRegexp
    }, (err, users) => {
      if (err) reject(err)
      const ids = users.map(user => user._id)
      SessionModel.remove({ _id: { $in: ids } }, (err) => {
        if (err) reject(err)
        else resolve()
      })
    })
  })
}

const getUserInfo = (username, info) => {
  return new Promise((resolve, reject) => {
    UserModel.findOne({username}, (err, user) => {
      if (err) reject(err)
      if (user) {
        const result = user[info] || user
        resolve(result)
      } else {
        getError(40003)
      }
    })
  })
}

module.exports = {
  removeUserToken,
  addUserToken,
  addUser,
  checkUserPassword,
  removeUserSession,
  getUserInfo
}
