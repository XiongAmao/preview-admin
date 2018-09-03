const path = require('path')

const resolve = (p) => {
  return path.resolve(__dirname, p)
}

const config = {
  port: 9992,
  rpDirPath: resolve('../../data'), // temp path, you have to use absolute path in production.
  sketchDirPath: '',
  mongodb: 'mongodb://127.0.0.1:27017/tools-admin',
  MD5_SUFFIX: '很长的盐', // salt
  secretKey: 'test-admin-secretKey'
}

module.exports = config
