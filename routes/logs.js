// This router handles anything/everything to do on the /logs route. 
// It hears the request and checks to see what type of request came through.

const express = require('express')
const router = express.Router()
const logsController = require('../controllers/logs') // Requires that we go to the controllers folder and use the logs file.
const { ensureAuth } = require('../middleware/auth') // Requires us to go the middleware folder and find the auth file, which exports an object that has the ensureAuth method. In this line, we're saving it to a variable.

router.get('/', ensureAuth, logsController.getLogs) // When the user goes to the /todos page. ensureAuth is a function that checks to make sure you're logged in (using ensureAuth function in middleware/auth.js).
// You can use ensureAuth on any request where you want to make sure that the user is logged in!
// logsController is the controller that we're going to use. getLogs is the method that we're going to use.

router.post('/createLog', logsController.createLog)

router.put('/markComplete', logsController.markComplete)

router.put('/markIncomplete', logsController.markIncomplete)

router.delete('/deleteLog', logsController.deleteLog)

module.exports = router