const express = require('express') // Used to build out our API, handles the requests/responses. Stops us from having to hand-code all of those things.
const app = express() // Wrap the above in 'app' to avoid having to continuously retype all that.
const mongoose = require('mongoose') // Helps us interact with our database - connect, use models, etc. 
const passport = require('passport') // Helps us handle our authentication and has STRATEGIES. (You can swap out those strategies to do different stuff - right now we're using a "local" strategy, but you could use Google Auth / Twitter Auth etc - check out the passportjs.org website! You can change the strategies in the /config/passport file)
const session = require('express-session') // This (and below line) helps us have logged-in users. Creates a session when the user is logged in, using cookies, that allows the user to stay logged in. Whenever you have an open session, we're matching that session in the user's cookies with the session that's logged in our back-end.
const MongoStore = require('connect-mongo')(session)
const flash = require('express-flash') // Helps us have the "flash notifications" (alerts for invalid username/password, invalid email when signing up)
const logger = require('morgan') // Logs the requests coming through
const connectDB = require('./config/database') // holds the function in our /config/database file, so you need to call that function later on! (line 18)
const mainRoutes = require('./routes/main') // Linking to our routes.
const logRoutes = require('./routes/medlogs') // For the /medlogs route. This file holds all of the routes for anything on logs. Requires us to go to the routes folder and get the logs file.

require('dotenv').config({path: './config/.env'}) // Configure Express to use the envvironment variables in the .env file

// Passport config
require('./config/passport')(passport)

connectDB()

app.set('view engine', 'ejs') // using ejs for our views
app.use(express.static('public')) // using public folder 
app.use(express.urlencoded({ extended: true })) // This line and the one below it enables us to look at the requests coming through and pull the stuff we need.
app.use(express.json())
app.use(logger('dev')) // Setting up MORGAN to run and log every request.

// Sessions
app.use(
    session({
      secret: 'keyboard cat', // Setting up the cookies with a "seed" to make them more unique
      resave: false,
      saveUninitialized: false,
      store: new MongoStore({ mongooseConnection: mongoose.connection }), // Store the session info in the mongo database, to match with the session info stored in the user's browser (cookie). By having this line, we allow the session to remain active even if the user closes the browser/website.
    })
  )
  
// Passport middleware
app.use(passport.initialize()) // Let us know that Passport will be handling our auth
app.use(passport.session()) // using sessions with Passport

app.use(flash()) // Set up flash notifications

// These lines handle the request that comes in from the client. They logged in, signed up, or typed it in directly - these lines hear the request and send the user to the correct router.
app.use('/', mainRoutes) // Was the request on the main route? (login, sign up, homepage)
app.use('/medlogs', logRoutes) // Or was the request on the medLogs route? 
 
app.listen(process.env.PORT, ()=>{ // Start the server!
    console.log('Server is running, you better catch it!')
})    