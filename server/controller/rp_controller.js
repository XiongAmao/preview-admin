const RpService = require('../service/rp_service')

const getRpList = (req, res, next) => {
  RpService.getRpList()
}

module.exports = {
  getRpList
}
