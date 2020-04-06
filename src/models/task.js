const mongoose = require("mongoose")
const validator = require("validator")

const taskSchema = mongoose.Schema({
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
    required: true,
    ref: "User" // This would add a reference to the entire User model from within the task model
  }
}, {
  timestamps: true
})

const Task = mongoose.model("Task", taskSchema)

module.exports = Task

// DEPRECATED CODE FOR LEARNING

// const Task = mongoose.model("Task", {
//   description: {
//     type: String,
//     required: true,
//     trim: true
//   },
//   completed: {
//     type: Boolean,
//     default: false
//   },
//   // This field helps in forming relationship with the user who is the owner of a particular task
//   owner: {
//     type: mongoose.Schema.Types.ObjectId,
//     required: true,
//     ref: "User" // This would add a reference to the entire User model from within the task model
//   }
// })