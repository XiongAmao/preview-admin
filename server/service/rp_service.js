const { getPreviewList } = require('../libs/util')
const RpListModel = require('../db/model/rp_list_model')
const rpEntry = require('../config').rpDirPath

// TODO: encodeURIComponent path!!!!!!!!!!!
const removeRpItemsByPathList = (list) => {
  return new Promise((resolve, reject) => {
    if (list.length === 0) return resolve()
    RpListModel.remove({ path: { $in: list } }, (err) => {
      if (err) reject(err)
      else resolve()
    })
  })
}

const createRpItemByList = (list) => {
  return new Promise((resolve, reject) => {
    if (list.length === 0) return resolve()
    RpListModel.create(list, (err, list) => {
      if (err) reject(err)
      else resolve()
    })
  })
}

// export service
const updateRPList = () => {
  const localList = getPreviewList(rpEntry)
  return new Promise((resolve, reject) => {
    getRpList().then(dbList => {
      const needRemoveList = dbList
        .filter(dbItem => localList.every(localItem => dbItem.path !== localItem.path))
        .map(item => item.path)

      const needUpdateList = localList
        .filter(localItem => dbList.every(dbItem => dbItem.path !== localItem.path))

      Promise.all([removeRpItemsByPathList(needRemoveList), createRpItemByList(needUpdateList)])
        .then(() => resolve())
        .catch(err => reject(err))
    })
  })
}

const getRpList = () => {
  return new Promise((resolve, reject) => {
    RpListModel.find({}, (err, dbList) => {
      if (err) reject(err)
      if (dbList) resolve(dbList)
    })
  })
}

module.exports = {
  updateRPList,
  getRpList
}
