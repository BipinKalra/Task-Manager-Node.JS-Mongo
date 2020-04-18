const express = require("express")
const multer = require("multer")
const sharp = require("sharp")
const User = require("../models/user")
const auth = require("../middleware/authentication")

const router = new express.Router()

const upload = multer({
  // dest: "avatars",
  // By removing the dest property, multer gets configured to return the data from the middleware function call
  // instead of saving it to a directory in the file system
  limits: {
    fileSize: 2000000
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpeg|jpg|png)$/)) {
      return cb(new Error("Please upload a valid image! (jpg, jpeg, png)"))
    }

    cb(undefined, true)
  }
})

// Endpoint to create a user
router.post("/users", async (req, res) => {
  const user = new User(req.body)

  try {
    await user.save()

    const token = await user.generateAuthToken()

    res.status(201).send({
      // This function would return the public profile i.e. user details minus the password, tokens array etc.
      // user: user.getPublicProfile(),
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
      // user: user.getPublicProfile(),
      // We would automate the above behaviour by replacing the getPublicProfile function
      user,
      token
    })
  } catch (error) {
    res.status(400).send()
  }
})

// Endpoint to allow users to logout
router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(token => token.token !== req.token)

    await req.user.save()

    res.send()
  } catch (error) {
    res.status(500).send()
  }
})

// Endpoint to allow user to log out of all sessions
router.post("/users/logoutall", auth, async (req, res) => {
  try {
    req.user.tokens = []

    await req.user.save()

    res.send()
  } catch (error) {
    res.status(500).send()
  }
})

// Endpoint to fetch the profile of an authenticated user
router.get("/users/me", auth, async (req, res) => {
  res.send(req.user)
})

// Endpoint for updating user
router.patch("/users/me", auth, async (req, res) => {
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

    updates.forEach((update) => req.user[update] = req.body[update])
    await req.user.save() // Middleware would run right before save

    // if (!user) {
    //   return res.status(404).send()
    // }

    res.send(req.user)
  } catch (error) {
    res.status(400).send()
  }
})

// Endpoint for deleting user
// router.delete("/users/:id", auth, async (req, res) => {
// User should only be allowed to delete its own profile
router.delete("/users/me", auth, async (req, res) => {
  try {
    // const user = await User.findByIdAndDelete(req.params.id)
    // const user = await User.findByIdAndDelete(req.user._id)

    // if (!user) {
    //   return res.status(404).send()
    // }

    await req.user.remove()
    res.send(req.user)
  } catch (error) {
    res.status(500).send()
  }
})

// Endpoint for adding user avatar
router.post("/users/me/avatar", auth, upload.single("avatar"), async (req, res) => {
  // Contains buffer of binary data of file returned by multer
  // req.user.avatar = req.file.buffer

  // Here multiple function calls are chained
  const buffer = await sharp(req.file.buffer).resize({
    width: 250,
    height: 250
  }).png().toBuffer()

  req.user.avatar = buffer

  await req.user.save()
  res.send({
    success: "User avatar updated!"
  })
}, (error, req, res, next) => { // This callback is setup to handle errors thrown by multer
  res.status(400).send({
    error: error.message
  })
})

// Endpoint to fetch user avatar
router.get("/users/:id/avatar", async (req, res) => {
  try {
    const user = await User.findById(req.params.id)

    if(!user || !user.avatar) {
      throw new Error()
    }

    // This is used to set response headers
    res.set("Cotent-Type", "image/png")
    res.send(user.avatar)
  } catch (error) {
    res.status(404).send()
  }
})

// End to delete user avatar
router.delete("/users/me/avatar", auth, async (req, res) => {
  try {
    req.user.avatar = undefined
    await req.user.save()
    res.send()
  } catch (error) {
    res.status(500).send()
  }
})

module.exports = router

// DEPRECATED CODE FOR LEARNING

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

// Endpoint to read a particular user
// This isn't needed anymore as a user shouldn't be able to access other users' profiles using their IDs
// One can visit their own profile using the /users/me route
// router.get("/users/:id", async (req, res) => {
//   const _id = req.params.id

//   try {
//     const user = await User.findById(_id)
//     if (!user) {
//       return res.status(404).send()
//     }
//     res.send(user)
//   } catch (error) {
//     res.status(500).send()
//   }
// })