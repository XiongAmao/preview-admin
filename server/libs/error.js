const errList = require('../constant/error-list')

function CustomError (error) {
  const { name, code, msg, status } = error
  Error.captureStackTrace(this, this.constructor) // just in v8, chrome/Node.js
  Error.call(this, msg)
  this.name = name
  // error message
  this.message = msg
  // 错误码，对应error-list code
  this.code = code
  // http status code
  this.status = status
}

CustomError.prototype = Object.create(Error.prototype);
CustomError.prototype.constructor = CustomError;

const getError = (code) => {
  const err = errList[code]
  if (err) {
    return new CustomError(err)
  } else {
    return null
  }
}

module.exports = getError
