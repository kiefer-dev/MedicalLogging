const mongoose = require('mongoose')

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
