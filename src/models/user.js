const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const Task = require("./task")

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
  }],
  avatar: {
    type: Buffer
  }
}, {
  timestamps: true // This property adds the createdAt and updatedAt properties to our model
})

// Virtual properties are not stored in the DB but just allow mongoose to realise the relationship between the data
userSchema.virtual("tasks", {
  ref: "Task",
  localField: "_id", // Field in current model which is important for the relation to be setup
  foreignField: "owner" // Field on the model being virtually related that connects to current model
})

// By registering it with userSchema.statics we get access to this wherever we have access to our user model
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email })

  if (!user) {
    throw new Error("Unable to login!")
  }

  const isMatch = await bcrypt.compare(password, user.password)

  if (!isMatch) {
    throw new Error("Unable to login!")
  }

  return user
}

// These methods are available on instances i.e. userSchema.methods
userSchema.methods.generateAuthToken = async function () {
  const user = this
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET)

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
  delete userObject.avatar

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

// Middleware that deletes the tasks related to a user when a user gets deleted
userSchema.pre("remove", async function (next) {
  const user = this
  await Task.deleteMany({
    owner: user._id
  })
  
  next()
})

const User = mongoose.model("User", userSchema)

module.exports = User