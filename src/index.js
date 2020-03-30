const express = require("express")
require("./db/mongoose")
const User = require("./models/user")
const Task = require('./models/task')

const app = express()
const port = process.env.PORT || 9000

// This function call makes express automatically parse incoming json to an object
app.use(express.json())

// Endpoint to create a user
app.post("/users", async (req, res) => {
  // console.log(req.body)
  // res.send("Testing!")

  const user = new User(req.body)

  // Same functionality as below using await after making function async
  try {
    await user.save()
    res.status(201).send(user)
  } catch (error) {
    res.status(400).send(error)
  }

  // Old code without using async-await
  // user.save().then(() => {
  //   res.status(201).send(user)
  // }).catch((error) => {
  //   res.status(400).send(error)
  // })
})

// Endpoint to read all users
app.get("/users", async (req, res) => {
  try {
    const users = await User.find({})
    res.send(users)
  } catch (error) {
    res.status(500).send()
  }

  // User.find({}).then((users) => {
  //   res.send(users)
  // }).catch((error) => {
  //   res.status(500).send()
  // })
})

// Endpoint to read a particular user
// Here :id is a route parameter
app.get("/users/:id", async (req, res) => {
  const _id = req.params.id

  try {
    const user = await User.findById(_id)
    if (!user) {
      return res.status(404).send()
    }
    res.send(user)
  } catch (error) {
    res.status(500).send()
  }

  // User.findById(_id).then((user) => {
  //   if (!user) {
  //     return res.status(404).send()
  //   }
  //   res.send(user)
  // }).catch((error) => {
  //   res.status(500).send()
  // })
})

// Endpoint for updating user
app.patch("/users/:id", async (req, res) => {
  // List of properties someone is allowed to update
  const allowedUpdates = ["name", "email", "password", "age"]
  const updates = Object.keys(req.body)

  // Every checks for every single match in the array. False even if one is false otherwise true
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

  if (!isValidOperation) {
    return res.status(400).send("Error: Invalid Operation!")
  }

  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })

    if (!user) {
      return res.status(404).send()
    }

    res.send(user)
  } catch (error) {
    res.status(400).send()
  }
})

// Endpoint for deleting user
app.delete("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id)

    if(!user) {
      return res.status(404).send()
    }
    res.send(user)
  } catch (error) {
    res.status(500).send()
  }
})

// Endpoint to create a task
app.post("/tasks", async (req, res) => {
  const task = new Task(req.body)

  try {
    await task.save()
    res.status(201).send(task)
  } catch (error) {
    res.status(400).send(error)
  }

  // task.save().then(() => {
  //   res.status(201).send(task)
  // }).catch((error) => {
  //   res.status(400).send()
  // })
})

//Endpoint to read tasks
app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find({})
    res.send(tasks)
  } catch (error) {
    res.status(500).send()
  }

  // Task.find({}).then((tasks) => {
  //   res.send(tasks)
  // }).catch((error) => {
  //   res.status(500).send()
  // })
})

// Endpoint to read a particular task
app.get("/tasks/:id", async (req, res) => {
  const _id = req.params.id

  try {
    const task = await Task.findById(_id)

    if (!task) {
      return res.status(404).send()
    }
    res.send(task)
  } catch (error) {
    res.status(500).send()
  }

  // Task.findById(_id).then((task) => {
  //   if (!task) {
  //     return res.status(404).send()
  //   }
  //   res.send(task)
  // }).catch((error) => {
  //   res.status(500).send()
  // })
})

// Endpoint for updating task
app.patch("/tasks/:id", async (req, res) => {
  const allowedUpdates = ["description", "completed"]
  const updates = Object.keys(req.body)
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

  if (!isValidOperation) {
    return res.status(400).send("Error: Invalid Operation!")
  }

  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })

    if (!task) {
      return res.status(404).send()
    }

    res.send(task)
  } catch (error) {
    res.status(400).send()
  }
})

// Endpoint for deleting task
app.delete("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id)

    if(!task) {
      return res.status(404).send()
    }
    res.send(task)
  } catch (error) {
    res.status(500).send()
  }
})

app.listen(port, () => {
  console.log("Server is up on port - " + port)
})