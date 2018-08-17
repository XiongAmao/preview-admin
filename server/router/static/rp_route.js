const express = require('express')
const rpDirPath = require('../../config').rpDirPath
const router = express.Router()
const { rpAuth } = require('../../middleware/auth')

router.use(rpAuth, express.static(rpDirPath))

module.exports = router
