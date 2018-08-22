const moment = require('moment')

const errorHandler = function (err, req, res, next) {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss:SSS')}]  [error-info]: \n`, err)
  const { code = 500, message = 'Server error!' } = err

  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // 手动返回错误
  res.status(err.status || 500)
  res.send({ code, msg: message })
}

module.exports = errorHandler
