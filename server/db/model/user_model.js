const mongoose = require('mongoose')
const userSchema = require('../schema/user_schema')
const UserModel = mongoose.model('users', userSchema)

module.exports = UserModel
