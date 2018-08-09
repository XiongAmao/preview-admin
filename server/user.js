const express = require('express')
const Router = express.router()

Router.get('/info', function(req, res) {
  return res.json({code: 1})
})


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

module.exports = Router
