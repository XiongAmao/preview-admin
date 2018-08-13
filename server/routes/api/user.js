const express = require('express')
const jwt = require('jsonwebtoken')
const UserModel = require('../db/model/User')
const { MD5_SUFFIX, md5, secretKey } = require('../constant')

const userRouter = express.Router()
// TODO: user业务逻辑
userRouter.get()

module.exports = userRouter

// mongoose.connection.on('connected', function() {
//   console.log('mongo connected')
// })

// const User = mongoose.model('account', new mongoose.Schema({
//   account: {type: String, require: true},
//   role: {type: Array},
//   admin: {type: Boolean},
//   rpList: {type: Array}
// }))

// User.create({
//   account: 'admin',
//   role: ['admin'],
//   admin: false,
//   rpList: ['admin/adsdf/adfasdf']
// }, function(err, doc) {
//   console.log(doc)
// })
