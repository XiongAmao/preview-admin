const crypto = require('crypto')

module.exports = {
  MD5_SUFFIX: '很长的盐', // salt
  md5: (pwd) => {
    let md5 = crypto.createHash('md5')
    return md5.update(pwd).digest('hex')
  },
  secretKey: 'test-admin-secretKey'// 设置你的密钥
}
