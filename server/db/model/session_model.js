const mongoose = require('mongoose')
const SessionSchema = require('../schema/session_schema')
const SessionModel = mongoose.model('sessions', SessionSchema)

module.exports = SessionModel
