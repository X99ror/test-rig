const express =require('express')
const { registerUser, login, logout } = require('../controller/userController')
const router = express.Router()


router.post('/register',registerUser)
router.post('/login',login)
router.post('/logout',logout)

module.exports = router