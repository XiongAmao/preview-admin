const expressJwt = require('express-jwt')
const { scretKey } = require('./constant/constant')

const jwtAuth = expressJwt({
    secret: secretKey,
    audience: 'WEB',
  }).unless({path: ['']})

const jwtErrorHandler = (err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send({
      code: 401,
      errMsg: 'Token invalid.'
    });
  }
}

/**
 * TODO:
 * 1. jwt 过期、jwt重置
 * 2.
 * 3.
 **/

module.exports = {
  jwtAuth,
  jwtErrorHandler
}
