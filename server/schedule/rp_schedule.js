const schedule = require('node-schedule')
const RpListModel = require('../db/model/rp_list_model')
const { getPreviewList } = require('../libs/util')
const rpEntry = require('../config').rpDirPath

const rpSchedule = () => {
  const rp = schedule.scheduleJob('30 * * * * *', function () {
    console.time('getPreviewList')
    const list = getPreviewList(rpEntry)
    console.timeEnd('getPreviewList')
  })
}

module.exports = rpSchedule
