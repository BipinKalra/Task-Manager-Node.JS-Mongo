const express = require("express")
const User = require("../models/user")
const auth = require("../middleware/authentication")

const router = new express.Router()

// Endpoint to create a user
router.post("/users", async (req, res) => {
  const user = new User(req.body)

  try {
    await user.save()

    const token = await user.generateAuthToken()

    res.status(201).send({
      user,
      token
    })
  } catch (error) {
    res.status(400).send(error)
  }
})

// Endpoint to allow user to login
router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password)
    const token = await user.generateAuthToken()

    res.send({
      user,
      token
    })
  } catch (error) {
    res.status(400).send()
  }
})

// Endpoint to read all users - won't exist in the final app, would be changed to profile
// Middleware is sent as the second argument to route handler
// router.get("/users", auth, async (req, res) => {
//   try {
//     const users = await User.find({})
//     res.send(users)
//   } catch (error) {
//     res.status(500).send()
//   }
// })

// Endpoint to fetch the profile of an authenticated user
router.get("/users/me", auth, async (req, res) => {
  res.send(req.user)
})

// Endpoint to read a particular user
router.get("/users/:id", async (req, res) => {
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
})

// Endpoint for updating user
router.patch("/users/:id", async (req, res) => {
  const allowedUpdates = ["name", "email", "password", "age"]
  const updates = Object.keys(req.body)

  const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

  if (!isValidOperation) {
    return res.status(400).send("Error: Invalid Operation!")
  }

  try {
    // const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    //   new: true,
    //   runValidators: true
    // })

    // For the middleware to run, we'll have to restructure the above code to

    const user = await User.findById(req.params.id)
    updates.forEach((update) => user[update] = req.body[update])
    await user.save() // Middleware would run right before save

    if (!user) {
      return res.status(404).send()
    }

    res.send(user)
  } catch (error) {
    res.status(400).send()
  }
})

// Endpoint for deleting user
router.delete("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id)

    if (!user) {
      return res.status(404).send()
    }
    res.send(user)
  } catch (error) {
    res.status(500).send()
  }
})

module.exports = router