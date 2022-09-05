const mongoose = require('mongoose') // Mongoose handles all the stuff we have to do to talk to the database. Allows us to create the individual documents (objects)

// Create a structure for all of the logs that will be created.
const MedLogSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  systolic: {
    type: Number,
    required: true,
  },
  diastolic: {
    type: Number,
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

module.exports = mongoose.model('MedLog', MedLogSchema)
