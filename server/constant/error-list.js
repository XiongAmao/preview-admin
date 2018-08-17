const errList = {
  40000: {},
  40001: {
    status: 400,
    code: 40001,
    name: 'UsernameExist',
    msg: '用户名已存在'
  },
  40002: {
    status: 401,
    code: 40002,
    name: 'PasswordOrUsernameError',
    msg: '用户名或密码错误'
  },
  40003: {
    status: 401,
    code: 40001,
    name: '',
    msg: ''
  }
}

module.exports = errList
