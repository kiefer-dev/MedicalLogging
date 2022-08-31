const express = require('express')
const router = express.Router()
const logsController = require('../controllers/logs') 
const { ensureAuth } = require('../middleware/auth')

router.get('/', ensureAuth, logsController.getLogs) //ensureAuth is a function that checks to make sure you're logged in (using ensureAuth function in middleware/auth.js)

router.post('/createLog', logsController.createLog)

router.put('/markComplete', logsController.markComplete)

router.put('/markIncomplete', logsController.markIncomplete)

router.delete('/deleteLog', logsController.deleteLog)

module.exports = router