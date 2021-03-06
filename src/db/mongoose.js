// Mongoose is an ODM just like an ORM in case of SQL databases
const mongoose = require("mongoose")
// const validator = require("validator")

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})

// DEPRECATED CODE FOR LEARNING

// const User = mongoose.model("User", {
//   name: {
//     type: String,
//     required: true,
//     trim: true
//   },
//   email: {
//     type: String,
//     required: true,
//     trim: true,
//     lowercase: true,
//     validate(value) {
//       if (!validator.isEmail(value)) {
//         throw new Error("Email invalid!")
//       }
//     }
//   },
//   age: {
//     type: Number,
//     default: 0,
//     // validate() function can be used to define custom validators
//     validate(value) {
//       if (value < 0) {
//         throw new Error("Age must be a positive number!")
//       }
//     }
//   },
//   password: {
//     type: String,
//     minlength: 7,
//     trim: true,
//     validate(value) {
//       if (value.toLowerCase().includes("password")) {
//         throw new Error("Password must not contain the string 'password'!")
//       }
//     }
//   }
// })

// const Task = mongoose.model("Task", {
//   description: {
//     type: String,
//     required: true,
//     trim: true
//   },
//   completed: {
//     type: Boolean,
//     default: false
//   }
// })

// const me = new User({
//   name: "Suresh",
//   email: "suresh@gmail.com",
//   age: 30,
//   password: "suresh1"
// })

// me.save().then(() => {
//   console.log(me)
// }).catch((error) => {
//   console.log(error)
// })

// const task = new Task({
//   description: "This task is complete!",
//   completed: true
//   // completed: false
//   // completed: "Honey Singh"
// })

// task.save().then((result) => {
//   console.log(result)
// }).catch((error) => {
//   console.log(error)
// })

