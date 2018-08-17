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
  role: {
    type: String,
    require: true
  },
  permission: [],
  token_list: [String],
  rp_list: [String],
  sketch_list: [String]
})

module.exports = userSchema
