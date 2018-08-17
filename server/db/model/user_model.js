const mongoose = require('mongoose')
const userSchema = require('../schema/user_schema')
const UserModel = mongoose.model('user', userSchema)

module.exports = UserModel
