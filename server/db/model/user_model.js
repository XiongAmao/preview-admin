const mongoose = require('mongoose')
const userSchema = require('../schema/user_schema')
const UserModel = mongoose.model('user', userSchema)
// The first argument is the singular name of the collection your model is for. Mongoose automatically looks for the plural version of your model name
// Thus the collection name is setted in schema.

module.exports = UserModel
