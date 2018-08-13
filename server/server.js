const express = require('express')
const path = require('path')
const staticRoute = require('./routes/static')
const apiRoute = require('./routes/api')

const app = express()

app.use('/api', apiRoute)
app.use('/', staticRoute)

app.use((req, res, next) => {
  res.status(404).json({
      code: 404,
      errMsg: 'Not Found'
  })
})

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
