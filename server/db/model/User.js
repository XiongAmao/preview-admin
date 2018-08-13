const mongoose = require('mongoose')
const userSchema = require('../schema/User')

const UserModel = mongoose.model('user', userSchema)
const findUser = (username) => {
  return UserModel.findOne({
    username
  })
}
const addUser = () => {}
const removeUser = () => {}
const modifyRpList = () => {}

module.exports = {
  UserModel,
  findUser,
  addUser,
  removeUser,
  modifyRpList
}
