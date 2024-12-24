const express = require('express')
const { getAllProjects, createProjects, updateProjects, deleteProjects, getProjectById } = require('../controller/projectController')
const requireAuth = require('../middleware/requireAuth')
const router = express.Router()

router.get('/all-projects',getAllProjects)
router.post('/create-projects',requireAuth,createProjects)
router.put('/update-project/:id',requireAuth,updateProjects)
router.delete('/delete-project/:id',requireAuth,deleteProjects)
router.get('/get-project/:id',getProjectById)


module.exports = router