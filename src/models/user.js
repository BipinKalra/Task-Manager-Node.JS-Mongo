const mongoose = require("mongoose")
const validator = require("validator")

const User = mongoose.model("User", {
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email invalid!")
      }
    }
  },
  age: {
    type: Number,
    default: 0,
    // validate() function can be used to define custom validators
    validate(value) {
      if (value < 0) {
        throw new Error("Age must be a positive number!")
      }
    }
  },
  password: {
    type: String,
    minlength: 7,
    trim: true,
    validate(value) {
      if (value.toLowerCase().includes("password")) {
        throw new Error("Password must not contain the string 'password'!")
      }
    }
  }
})

module.exports = User