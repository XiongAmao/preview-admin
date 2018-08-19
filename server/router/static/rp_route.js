const express = require('express')
const rpDirPath = require('../../config').rpDirPath
const { rpListAuth } = require('../../controller/auth_contoller')
const router = express.Router()

router.use(rpListAuth, express.static(rpDirPath))

module.exports = router
