const app = require("./app")
const port = process.env.PORT

// Listen is kept here while initialising the express application has been moved to app.js so that the express
// server can be used without running for testing purposes
app.listen(port, () => {
  console.log("Server is up on port - " + port)
})


// DEPRECATED CODE FOR LEARNING

// const multer = require("multer")
// const upload = multer({
//   dest: "images",
//   limits: {
//     fileSize: 2000000
//   },
//   // This function allows us to filter the file types that we want to add upload allowance for
//   // Here req - request, file - file data, cb - callback
//   fileFilter(req, file, cb) {
//     // if (!file.originalname.endsWith(".pdf")) {
//     //   return cb(new Error("Please upload a PDF!"))
//     // }

//     // .match function in a string allows it to be matched with a regular expression
//     if (!file.originalname.match(/\.(doc|docx)$/)) {
//       return cb(new Error("Please upload a word doc!"))
//     }

//     cb(undefined, true)

//     // cb function has two arguments, error msg and then upload boolean
//     // cb(new Error("Please upload a valid image!"))
//     // cb(undefined, true)
//   }
// })

// // const errorMiddleware = (req, res, next) => {
// //   throw new Error("From my Middleware")
// // }

// // Here upload.single("upload") looks for an entity titled "upload in the form data"
// app.post("/upload", upload.single("upload"), (req, res) => {
//   res.send()
// }, (error, req, res, next) => {
//   res.status(400).send({
//     error: error.message
//   })
// })