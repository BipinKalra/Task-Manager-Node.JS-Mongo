require("../src/db/mongoose")
const User = require("../src/models/user")
const Task = require("../src/models/task")

// Using async-await
const deleteTaskandCount = async (id) => {
  const task = await Task.findByIdAndDelete(id)
  const count = await Task.countDocuments({ completed: true})

  return count
}

deleteTaskandCount("5e820147e0f3237175ad1a81").then((result) => {
  console.log(result)
}).catch((error) => {
  console.log(error)
})

// DEPRECATED CODE FOR LEARNING

// User.findByIdAndUpdate("5e81ddc9ee3fdd534dd671f4", {
//   age: 22
// }).then((user) => {
//   console.log(user)

//   return User.countDocuments({
//     age: 22
//   })
// }).then((result) => {
//   console.log(result)
// }).catch((error) => {
//   console.log(error)
// })

// Using async-await
// const updateAgeAndCount = async (id, age) => {
//   const user = await User.findByIdAndUpdate(id, { age: age})
//   const count = await User.countDocuments({ age: 22})

//   return count
// }

// updateAgeAndCount("5e81ddc9ee3fdd534dd671f4", 25).then((result) => {
//   console.log(result)
// }).catch((error) => {
//   console.log(error)
// })

// Task.findByIdAndDelete("5e82010ee0f3237175ad1a7f").then((task) => {
//   console.log(task)

//   return Task.countDocuments({
//     completed: false
//   })
// }).then((result) => {
//   console.log(result)
// }).catch((error) => {
//   console.log(error)
// })