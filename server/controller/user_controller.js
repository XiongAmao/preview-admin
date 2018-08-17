const { checkUserPassword, addUser } = require('../service/user_service')

const userLogin = (req, res, next) => {
  const { username, password } = req.body

  if (!username || !password) {
    return next({ code: 400, msg: '请输入账号或密码' })
  }
  checkUserPassword(username, password)
    .then(() => {
      req.session.username = username
      req.session.hasLogin = true
      return res.json({
        code: 200,
        message: '登录成功',
        username
      })
    })
    .catch(err => {
      return next(err)
    })
}

const userLogout = (req, res, next) => {
  const session = req.session
  if (session.hasLogin) {
    session.regenerate(() => {
      return res.json({
        msg: 'Logout.',
        code: 20000
      })
    })
  } else {
    return res.json({
      msg: 'It\'s not login',
      code: 20001
    })
  }
}

const userRegister = (req, res, next) => {
  const { username, password } = req.body

  if (!username || !password) {
    return next({
      code: 400,
      msg: '请输入账号或密码'
    })
  }
  addUser(username, password)
    .then(() => {
      res.json({ msg: '账号已创建' })
    })
    .catch(err => {
      next(err)
    })
}

const getUserInfo = (req, res, next) => {

}

const userList = (req, res, next) => {

}

const userAuthModify = (req, res, next) => {

}

module.exports = {
  userLogout,
  userLogin,
  userRegister,
  getUserInfo,
  userList,
  userAuthModify
}
