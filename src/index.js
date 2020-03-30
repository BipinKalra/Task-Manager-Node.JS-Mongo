const express = require("express")
require("./db/mongoose")
const User = require("./models/user")
const Task = require('./models/task')

const app = express()
const port = process.env.PORT || 9000

// This function call makes express automatically parse incoming json to an object
app.use(express.json())

// Endpoint to create a user
app.post("/users", (req, res) => {
  // console.log(req.body)
  // res.send("Testing!")

  const user = new User(req.body)

  user.save().then(() => {
    res.status(201).send(user)
  }).catch((error) => {
    res.status(400).send(error)
  })
})

// Endpoint to read all users
app.get("/users", (req, res) => {
  User.find({}).then((users) => {
    res.send(users)
  }).catch((error) => {
    res.status(500).send()
  })
})

// Endpoint to read a particular user
// Here :id is a route parameter
app.get("/users/:id", (req, res) => {
  const _id = req.params.id

  User.findById(_id).then((user) => {
    if (!user) {
      return res.status(404).send()
    }

    res.send(user)
  }).catch((error) => {
    res.status(500).send()
  })
})

// Endpoint to create a task
app.post("/tasks", (req, res) => {
  const task = new Task(req.body)

  task.save().then(() => {
    res.status(201).send(task)
  }).catch((error) => {
    res.status(400).send()
  })
})

//Endpoint to read tasks
app.get("/tasks", (req, res) => {
  Task.find({}).then((tasks) => {
    res.send(tasks)
  }).catch((error) => {
    res.status(500).send()
  })
})

// Endpoint to read a particular task
app.get("/tasks/:id", (req, res) => {
  const _id = req.params.id

  Task.findById(_id).then((task) => {
    if (!task) {
      return res.status(404).send()
    }

    res.send(task)
  }).catch((error) => {
    res.status(500).send()
  })
})

app.listen(port, () => {
  console.log("Server is up on port - " + port)
})