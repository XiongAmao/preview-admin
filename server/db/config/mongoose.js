const mongoose = require('mongoose')
const config = require('./index.js')

module.exports = () => {
  mongoose.connect(config.mongodb, { useNewUrlParser: true })
  var db = mongoose.connection
  db.on('error', console.error.bind(console, 'connection error:'))
  db.once('open', function () {
    console.log('MongoDB is Connected!')
  })
  return db
}
