const mongoose = require('mongoose')
const SessionSchema = require('../schema/session_schema')
const SessionModel = mongoose.model('session', SessionSchema)
// The first argument is the singular name of the collection your model is for. Mongoose automatically looks for the plural version of your model name
// Thus the collection name is setted in schema.

module.exports = SessionModel
