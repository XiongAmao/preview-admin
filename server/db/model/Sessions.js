const mongoose = require('mongoose')
const SessionSchema = require('../schema/Sessions')

const SessionModel = mongoose.model('user', SessionSchema)

const removeSession = (username) => {
  // 移除所有该用户的session
  const userRegexp = new RegExp(`username":"${username}`)
  SessionModel.find({
    session: userRegexp
  }).then(users => {
    users.map(user => user._id).forEach(id => {
      SessionModel.remove({
        _id: id
      }).catch(err => { throw err })
    })
  }).catch(err => {
    throw err
  })
}

module.exports = {
  SessionModel,
  removeSession
}
