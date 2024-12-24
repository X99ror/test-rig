const express = require('express')
const { addTeam, getTeam, addMember, getMember } = require('../controller/teamController')
const requireAuth = require('../middleware/requireAuth')
const router = express.Router()

router.get('/get-team/:year',getTeam)
router.get('/get-member/:year',getMember)
router.post('/add-team',addTeam)
router.post('/add-member',requireAuth,addMember)


module.exports = router