const express = require('express')
const app = express()
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const flash = require('express-flash')
const logger = require('morgan')
const connectDB = require('./config/database')
const mainRoutes = require('./routes/main')
const logRoutes = require('./routes/logs') // For the /logs route. This file holds all of the routes for anything on logs. Requires us to go to the routes folder and get the logs file.

require('dotenv').config({path: './config/.env'})

// Passport config
require('./config/passport')(passport)

connectDB()

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(logger('dev'))
// Sessions
app.use(
    session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false,
      store: new MongoStore({ mongooseConnection: mongoose.connection }),
    })
  )
  
// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

app.use(flash())

// These lines handle the request that comes in from the client. They logged in, signed up, or typed it in directly - these lines hear the request and send the user to the correct router.
app.use('/', mainRoutes) // Was the request on the main route? (login, sign up, homepage)
app.use('/logs', logRoutes) // Or was the request on the logs route? 
 
app.listen(process.env.PORT, ()=>{
    console.log('Server is running, you better catch it!')
})    