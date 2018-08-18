const mongoose = require('mongoose')
const RpListSchema = require('../schema/rp_list_schema')
const RpListModel = mongoose.model('rp_list', RpListSchema)

module.exports = RpListModel
