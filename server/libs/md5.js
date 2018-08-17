const crypto = require('crypto')

const md5 = (pwd) => {
  let md5 = crypto.createHash('md5')
  return md5.update(pwd).digest('hex')
}

module.exports = md5
