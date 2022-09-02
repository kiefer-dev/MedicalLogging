// This router handles anything/everything to do on the /logs route. 
// It hears the request and checks to see what type of request came through.

const express = require('express')
const router = express.Router()
const medLogsController = require('../controllers/medlogs') // Requires that we go to the controllers folder and use the logs file.
const { ensureAuth } = require('../middleware/auth') // Requires us to go the middleware folder and find the auth file, which exports an object that has the ensureAuth method. In this line, we're saving it to a variable.

router.get('/', ensureAuth, medLogsController.getMedLogs) // When the user goes to the /todos page. ensureAuth is a function that checks to make sure you're logged in (using ensureAuth function in middleware/auth.js).
// You can use ensureAuth on any request where you want to make sure that the user is logged in!
// medLogsController is the controller that we're going to use. getMedLogs is the method that we're going to use.

router.post('/createMedLog', medLogsController.createMedLog)

router.put('/markComplete', medLogsController.markComplete)

router.put('/markIncomplete', medLogsController.markIncomplete)

router.delete('/deleteMedLog', medLogsController.deleteMedLog)

module.exports = router