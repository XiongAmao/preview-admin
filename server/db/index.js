const mongoose = require('mongoose')
const dbPath = require('../config').mongodb

module.exports = () => {
  mongoose.connect(dbPath, { useNewUrlParser: true })
  var db = mongoose.connection
  db.on('error', console.error.bind(console, 'connection error:'))
  db.once('open', function () {
    console.log('MongoDB is Connected!')
  })
  return db
}
