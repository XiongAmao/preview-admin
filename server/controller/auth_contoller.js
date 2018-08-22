const getError = require('../libs/error')
const { getUserInfo } = require('../service/user_service')

const loginAuth = (req, res, next) => {
  const session = Object.assign({}, req.session)
  if (session.hasLogin) next()
  else next(getError(40000))
}

// 管理员权限验证
const adminRoleAuth = (req, res, next) => {
  const username = req.session.username
  getUserInfo(username, 'role').then(role => {
    if (role === 'admin') next()
    else return next(getError(40004))
  })
}

// 需要设置入口表示具体是哪一块的权限
const permissionAuth = (entry) => {
  const permissionRegExp = new RegExp(`(all|${entry})`)
  return (req, res, next) => {
    const username = req.session.username
    getUserInfo(username, 'permission').then(permissions => {
      const string = permissions.join(',')
      const isOk = permissionRegExp.test(string)
      if (isOk) return next()
      else return next(getError(40004))
    }).catch(err => next(err))
  }
}

const rpListAuth = (req, res, next) => {
  const username = req.session.username
  const path = req.path
  getUserInfo(username, 'rp_list').then(rpList => {
    // 通过检查项目名是否允许查看
    const isOk = rpList.some(item => {
      if (item === 'all') return true
      const regExp = new RegExp(`${item}`)
      return regExp.test(path)
    })
    if (isOk) return next()
    else return next(getError(40005))
  }).catch(err => next(err))
}

module.exports = {
  loginAuth,
  adminRoleAuth,
  permissionAuth,
  rpListAuth
}
