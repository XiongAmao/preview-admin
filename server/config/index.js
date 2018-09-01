const fs = require('fs')
const path = require('path')

const resolve = (p) => {
  return path.resolve(__dirname, p)
}

let customConfig = null
let customConfigPath = resolve('../../config.js')

const defaultConfig = {
  port: 9992,
  rpDirPath: resolve('../../data'), // temp path, you have to use absolute path in production.
  sketchDirPath: '',
  mongodb: 'mongodb://127.0.0.1:27017/tools-admin',
  MD5_SUFFIX: '很长的盐', // salt
  secretKey: 'test-admin-secretKey'
}

if (fs.existsSync(customConfigPath)) {
  customConfig = require(customConfigPath)
}

const config = Object.assign({}, defaultConfig, customConfig)

module.exports = config
