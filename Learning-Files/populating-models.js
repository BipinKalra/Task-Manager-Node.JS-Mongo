const Task = require("../src/models/task")
const User = require("../src/models/user")

const main = async () => {
//   const task = await Task.findById("5e8b1f86e574412517249071")
//   // This function would populate the fields of User model within the task model entity
//   await task.populate("owner").execPopulate()
//   console.log(task)

  const user = await User.findById("5e874f235caf1e307322f56b")
  await user.populate("tasks").execPopulate()
  console.log(user.tasks)
  
} 

main()