const crypto = require('crypto')

// TODO: 密钥和盐应该另外保存, 否则安全无法保证
module.exports = {
  MD5_SUFFIX: '很长的盐',
  secretKey: 'test-admin-secretKey',
  md5: (pwd) => {
    let md5 = crypto.createHash('md5')
    return md5.update(pwd).digest('hex')
  }
}
