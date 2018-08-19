const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RpListSchema = Schema({
  path: String,
  projectName: String,
  subName: String
}, {
  collection: 'rp_list'
})

module.exports = RpListSchema
