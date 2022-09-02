const mongoose = require('mongoose') // Mongoose handles all the stuff we have to do to talk to the database. Allows us to create the individual documents (objects)

// Create a structure for all of the logs that will be created.
const LogSchema = new mongoose.Schema({
  log: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
  },
  userId: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Log', LogSchema)
