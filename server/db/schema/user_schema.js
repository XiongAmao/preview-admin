const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  username: {
    type: String,
    index: true,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  logindate: {
    type: Date,
    default: Date.now()
  },
  role: {                   // user/admin 普通用户/管理员
    type: String,
    require: true
  },
  permission: [],           // 权限组，用于管理后台模块入口，比如账号管理模块/rp预览模块，对应
  token_list: [String],     // jwt存储，暂时不使用
  rp_list: [String],        // rp可预览权限
  sketch_list: [String]     // sketch可预览权限
}, {
  collection: 'users'
})

module.exports = userSchema
