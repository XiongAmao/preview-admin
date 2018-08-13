const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
const expressJwt = require('express-jwt')
const { secretKey } = require('../constant')

const jwtAuth = (req, res, next) => {
  let token = ''

  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    token = req.headers.authorization.split(' ')[1];
  } else {
    return next('Token invalid!')
  }
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return next(err)
    }
    req.tokenObj = decoded
    next()
  })
}
// const jwtAuth = expressJwt({
//     secret: secretKey,
//     audience: 'WEB',
//     getToken: function fromHeaderOrQuerystring (req) {
//       if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
//           return req.headers.authorization.split(' ')[1];
//       } else if (req.query && req.query.token) {
//         return req.query.token;
//       }
//       return null;
//     }
//   })

// const jwtErrorHandler = (err, req, res, next) => {
//   if (err.name === 'UnauthorizedError') {
//     res.status(401).send({
//       code: 401,
//       msg: 'Token invalid.'
//     });
//   }
// }

// router.use(jwtAuth, jwtErrorHandler)

// /**
//  * TODO:
//  * 1. jwt 过期、jwt重置
//  **/

module.exports = {
  jwtAuth,
//   jwtErrorHandler,
//   router
}
