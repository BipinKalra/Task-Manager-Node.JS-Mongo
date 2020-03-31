// CRUD - UPDATE

const { MongoClient, ObjectID } = require("mongodb")

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

  // Takes in just the database name and returns a db reference after creating it for us
  const db = client.db(databaseName)

  // In NOSQL Databses like mongodb - 
  // tables - connections
  // records - documents

  // const updatePromise = db.collection("users").updateOne({
  //   _id: new ObjectID("5e80979cc46f657957192da0")
  // }, {
  //   // This set keyword is provided by node to set certain field to certain value
  //   $set: {
  //     name: "StarLord"
  //   }
  // })

  // updatePromise.then((result) => {
  //   console.log(result)
  // }).catch((error) => {
  //   console.log(error)
  // })

  // Everything above can be chained together
  // db.collection("users").updateOne({
  //   _id: new ObjectID("5e8098ce5f23fb7a06c2d1df")
  // }, {
  //   $set: {
  //     name: "Bakar"
  //   }
  // }).then((result) => {
  //   console.log(result)
  // }).catch((error) => {
  //   console.log(error)
  // })

  // db.collection("users").updateOne({
  //   _id: new ObjectID("5e8098ce5f23fb7a06c2d1df")
  // }, {
  //   // inc is another one of mongodb update operators - inc the value of a field by a particular number
  //   $inc: {
  //     age: 10
  //   }
  // }).then((result) => {
  //   console.log(result)
  // }).catch((error) => {
  //   console.log(error)
  // })

  db.collection("tasks").updateMany({
    completed: false
  }, {
    $set: {
      completed: true
    }
  }).then((result) => {
    console.log(result)
  }).catch((error) => {
    console.log(error)
  })
})