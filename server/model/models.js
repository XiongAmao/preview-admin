const mongoose = require('mongoose')

const DB_URL = 'mongodb://localhost:27017'
mongoose.connect(DB_URL)

const models = {
  user: {
    'account': {type: String, require: true},
    'pwd': {type: String, require: true},
    'role': {type: String, require: true}, // super-admin / 老百姓
    'permission': {type: Array}, // 可用后台权限
    'rp-auth': {type: Array},    // rp 文件权限
    'sketch-auth': {type: Array} // sketch 文件权限
  }
}

for(let m in models) {
  mongoose.model(m, new mongoose.Schema(models[m]))
}

module.exports = {
  getModel: function (name) {
    return mongoose.model(name)
  }
}
