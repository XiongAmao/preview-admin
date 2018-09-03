const fs = require('fs')
const path = require('path')

const resolve = (p) => {
  return path.resolve(__dirname, p)
}

const defaultConfig = require('./default.config')

let customConfig = null
let customConfigPath = resolve('../../custom.server.config')

if (fs.existsSync(customConfigPath)) {
  customConfig = require(customConfigPath)
}

const config = Object.assign({}, defaultConfig, customConfig)

module.exports = config
