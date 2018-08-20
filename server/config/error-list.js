const errList = {
  40000: {
    status: 401,
    name: 'UserIsNotLoggedIn',
    msg: '登录已失效'
  },
  40001: {
    status: 400,
    name: 'UsernameExist',
    msg: '用户名已存在'
  },
  40002: {
    status: 400,
    name: 'PasswordOrUsernameError',
    msg: '用户名或密码错误'
  },
  40003: {
    status: 400,
    name: 'UserDoesNotExist',
    msg: '用户不存在'
  },
  40004: {
    status: 401,
    name: 'PermissionDenied',
    msg: '没有访问权限'
  },
  40005: {
    status: 401,
    name: 'StaticResourceDenied',
    msg: '不允许访问该资源'
  }
}

module.exports = errList
