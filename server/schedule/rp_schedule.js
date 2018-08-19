const schedule = require('node-schedule')
const { updateRPList } = require('../service/rp_service')

const rpSchedule = () => {
  const rp = schedule.scheduleJob('30 * * * * *', function () {
    updateRPList().then(() => {
      console.log('[info] rp-list updated')
    }).catch(err => {
      throw err
    })
  })
}

module.exports = rpSchedule
