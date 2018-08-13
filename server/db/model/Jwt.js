const mongoose = require('mongoose')
const UserSchema = require('../schema/User')

const User = mongoose.model('user', UserSchema)
module.exports = User
