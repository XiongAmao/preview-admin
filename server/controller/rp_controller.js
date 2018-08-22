const RpService = require('../service/rp_service')
const UserService = require('../service/user_service')

const getRpList = async (req, res, next) => {
  const username = req.session.username
  const listPromise = RpService.getRpList().catch(err => next(err))
  const userRpPromise = UserService.getUserInfo(username, 'rp_list').catch(err => next(err))

  const list = await listPromise
  const userRpList = await userRpPromise

  const rpAuthString = userRpList.join(',')
  // 鉴权
  const tempArr = list.map(item => {
    const pName = item.projectName
    if (
      rpAuthString.indexOf(pName) !== -1 ||
      rpAuthString.indexOf('all') !== -1
    ) {
      return item
    } else {
      return null
    }
  }).filter(e => e)
  // 构造列表
  const result = []
  const suffixList = [] // index: ProjectName

  for (let i = 0; i < tempArr.length; i++) {
    const pName = tempArr[i].projectName
    const child = {
      subName: tempArr[i].subName,
      path: tempArr[i].path
    }
    const idx = suffixList.indexOf(pName)

    if (idx !== -1) {
      result[idx].children.push(child)
    } else {
      result.push({
        projectName: pName,
        children: [child]
      })
      suffixList.push(pName)
    }
  }
  return res.json({
    list: result
  })
}

module.exports = {
  getRpList
}
