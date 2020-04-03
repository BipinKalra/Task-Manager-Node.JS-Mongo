const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    unique: true,
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
  },
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }]
})

// By registering it with userSchema.statics we get access to this wherever we have access to our user model
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email })

  if (!user) {
    throw new Error("Unable to login!")
  }

  const isMatch = await bcrypt.compare(password, user.password)

  if(!isMatch) {
    throw new Error("Unable to login!")
  }

  return user
}

// These methods are available on instances i.e. userSchema.methods
userSchema.methods.generateAuthToken = async function () {
  const user = this
  const token = jwt.sign({ _id: user._id.toString() }, "iamlearningnodejs")

  user.tokens = user.tokens.concat({ token })

  await user.save()

  return token
}

// To filter out the data to be shown while returning a user
// userSchema.methods.getPublicProfile = function () {
  userSchema.methods.toJSON = function () {
  // toJSON function gets called whenever an object is stringified
  // i.e. whenever an object is sent, toJSON is called internally by the routers before sending the JSON response
  const user = this
  const userObject = user.toObject()

  delete userObject.password
  delete userObject.tokens

  return userObject
}

// middleware to run something before an operation occurs
// middleware method post would be used in case of an operation to be run after an event occurs
userSchema.pre("save", async function (next) {
  // Here a normal function is used as this binding plays an important role here

  // Value of document i.e. individual user is saved in this
  const user = this

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8)
  }

  // Next is called for the function to know when to end in this case
  next()
})

const User = mongoose.model("User", userSchema)

module.exports = User