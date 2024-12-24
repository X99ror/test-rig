const express = require('express')
const { getEvents, addEvents } = require('../controller/eventController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

router.get('/all-events',getEvents)
router.post('/add-events',requireAuth,addEvents)


module.exports = router