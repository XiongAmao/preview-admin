const mongoose = require('mongoose')
const RpListSchema = require('../schema/rp_list_schema')
const RpListModel = mongoose.model('rp_list', RpListSchema)
// The first argument is the singular name of the collection your model is for. Mongoose automatically looks for the plural version of your model name
// Thus the collection name is setted in schema.

module.exports = RpListModel
