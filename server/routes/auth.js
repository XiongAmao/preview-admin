const jwt = require('jsonwebtoken')
const jwtCache = require('./cache/jwtCache')
const { UserModel, removeUserToken } = require('../db/model/User')

const { secretKey } = require('../constant')

// 验证token
const jwtAuth = (req, res, next) => {
  let token = getToken(req.headers)
  // 如果token 格式不对
  if (!token) {
    return next({ msg: 'Token invalid!', code: 4001, status: 400 })
  }
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        const { username } = jwt.decode(token)
        jwtCache.removeTokenCache(username, token)
        removeUserToken(username, token)
      }
      return next(err)
    }// token超时或token校验不过都会抛错
    const { username } = decoded
    const cacheToken = jwtCache.getTokenCache(username, token)
    // 缓存token不存在, 数据库中查
    if (!cacheToken) {
      UserModel.findOne({username}, (err, user) => {
        if (err) return next(err)
        const tokenList = user['token_list']
        if (tokenList.some(t => { return t === token })) {
          req.jwtPayload = Object.assign({}, decoded)
          next()
        } else {
          // 不存在token
          return next({ msg: 'Token invalid!', code: 4001, status: 400 })
        }
      })
    } else {
      req.jwtPayload = Object.assign({}, decoded)
      next()
    }
  })
}

const getToken = (headers) => {
  if (headers && headers.authorization) {
    const authorization = headers.authorization
    const part = authorization.split(' ')
    if (part.length === 2) {
      return part[1]
    } else {
      return null
    }
  } else {
    return null
  }
}

module.exports = {
  jwtAuth
}
