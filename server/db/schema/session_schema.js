const mongoose = require('mongoose')
const Schema = mongoose.Schema

const sessionsSchema = Schema({
  _id: String,
  expires: Date,
  session: String
}, {
  collection: 'sessions'
})

module.exports = sessionsSchema
