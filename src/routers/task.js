const express = require("express")
const Task = require("../models/task")
const auth = require("../middleware/authentication")

const router = new express.Router()

// Endpoint to create a task
router.post("/tasks", auth, async (req, res) => {
  // const task = new Task(req.body)

  const task = new Task({
    ...req.body,
    owner: req.user._id
  })

  try {
    await task.save()
    res.status(201).send(task)
  } catch (error) {
    res.status(400).send(error)
  }
})

//Endpoint to read tasks
// GET /tasks?completed=true + limit, skip for pagination
router.get("/tasks", auth, async (req, res) => {
  const match = {}

  if (req.query.completed) {
    match.completed = req.query.completed === "true"
  }

  try {
    // await req.user.populate("tasks").execPopulate()

    // Populating using a match criteria
    await req.user.populate({
      path: "tasks",
      match,
      options: {
        limit: parseInt(req.query.limit),
        skip: parseInt(req.query.skip)
      }
    }).execPopulate()
    res.send(req.user.tasks)

    // Alternative method
    // const tasks = await Task.find({
    //   owner: req.user._id
    // })

    // res.send(tasks)
  } catch (error) {
    res.status(500).send()
  }
})

// Endpoint to read a particular task
router.get("/tasks/:id", auth, async (req, res) => {
  const _id = req.params.id

  try {
    // const task = await Task.findById(_id)
    const task = await Task.findOne({
      _id,
      owner: req.user._id
    })

    if (!task) {
      return res.status(404).send()
    }
    res.send(task)
  } catch (error) {
    res.status(500).send()
  }
})

// Endpoint for updating task
router.patch("/tasks/:id", auth, async (req, res) => {
  const allowedUpdates = ["description", "completed"]
  const updates = Object.keys(req.body)
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

  if (!isValidOperation) {
    return res.status(400).send("Error: Invalid Operation!")
  }

  try {
    // const task = await Task.findById(req.params.id)
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id
    })

    // const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    //   new: true,
    //   runValidators: true
    // })

    if (!task) {
      return res.status(404).send()
    }

    updates.forEach((update) => task[update] = req.body[update])
    await task.save()

    res.send(task)
  } catch (error) {
    res.status(400).send()
  }
})

// Endpoint for deleting task
router.delete("/tasks/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id
    })

    if (!task) {
      return res.status(404).send()
    }
    res.send(task)
  } catch (error) {
    res.status(500).send()
  }
})

module.exports = router