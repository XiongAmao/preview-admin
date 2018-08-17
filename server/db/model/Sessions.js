const mongoose = require('mongoose')
const SessionSchema = require('../schema/Sessions')

const SessionModel = mongoose.model('user', SessionSchema)

// 这里是绕过了session处理模块，直接对数据库操作对应session
// 仅用于修改权限/踢掉线 等需要重置session的地方
const removeSession = (username) => {
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

module.exports = {
  SessionModel,
  removeSession
}
