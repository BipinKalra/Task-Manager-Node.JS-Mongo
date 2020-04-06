const mongoose = require("mongoose")
const validator = require("validator")

const Task = mongoose.model("Task", {
  description: {
    type: String,
    required: true,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  // This field helps in forming relationship with the user who is the owner of a particular task
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
})

module.exports = Task