// CRUD - CREATE

// const mongodb = require("mongodb")
// const MongoClient = mongodb.MongoClient
// const objectID = mongodb.ObjectID

// We can use destructuring here

const { MongoClient, ObjectID} = require("mongodb")

// ObjectID that mongo uses can be generated on our own command
// const id = new ObjectID()
// console.log(id)
// console.log(id.getTimestamp())

// Using binary instead of string for ID reduces the length by half
// console.log(id.id.length)
// console.log(id.toHexString().length)

// Complete IP is being used here instead of just typing localhost as using localhost
// was bringing about some weird slowdown issues
const connectionURL = "mongodb://127.0.0.1:27017"
const databaseName = "task-manager"

MongoClient.connect(connectionURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, (error, client) => {
  if (error) {
    return console.log("Unable to connect to database!")
  }

  // console.log("Connected to DB!")

  // Takes in just the database name and returns a db reference after creating it for us
  const db = client.db(databaseName)

  // In NOSQL Databses like mongodb - 
  // tables - connections
  // records - documents

  // Inserting one into DB without any callback  
  // db.collection("users").insertOne({
  //   name: "Bipin",
  //   age: 22
  // })

//   // Inserting along with callback
  // db.collection("users").insertOne({
  //   // _id: id,
  //   name: "Suresh",
  //   age: 25
  // }, (error, result) => {
  //   if (error) {
  //     return console.log("Unable to insert user!")
  //   }

  //   // Array of all documents
  //   console.log(result.ops)
  // })

//   db.collection("users").insertMany([
//     {
//       name: "Himanshi",
//       age: 21
//     },
//     {
//       name: "Honey Singh",
//       age: 100
//     }
//   ], (error, result) => {
//     if (error) {
//       return console.log("Unable to insert users!")
//     }

//     console.log(result.ops)
//   })

  // db.collection("tasks").insertMany([
  //   {
  //     description: "First Task",
  //     completed: true
  //   },
  //   {
  //     description: "Second Task",
  //     completed: false
  //   },
  //   {
  //     description: "Task three",
  //     completed: false
  //   }
  // ], (error, result) => {
  //   if (error) {
  //     return console.log("Unable to insert tasks!")
  //   }

  //   console.log(result.ops)
  // })
})