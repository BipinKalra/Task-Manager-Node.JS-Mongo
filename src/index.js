const express = require("express")
require("./db/mongoose")
const userRouter = require("./routers/user")
const taskRouter = require("./routers/task")

const app = express()
const port = process.env.PORT || 9000

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
  console.log("Server is up on port - " + port)
})


// DEPRECATED CODE FOR LEARNING

// const multer = require("multer")
// const upload = multer({
//   dest: "images"
// })
// // Here upload.single("upload") looks for an entity titled "upload in the form data"
// app.post("/upload", upload.single("upload"), (req, res) => {
//   res.send()
// })