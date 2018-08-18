const { getPreviewList } = require('../libs/util')
const RpListModel = require('../db/model/rp_list_model')
const rpEntry = require('../config').rpDirPath

const cacheRPList = () => {
  console.time('getPreviewList')
  const list = getPreviewList(rpEntry)
  console.timeEnd('getPreviewList')
}

module.exports = {
  cacheRPList
}
