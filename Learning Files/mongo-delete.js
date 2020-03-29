// CRUD

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

  db.collection("users").deleteOne({
    age: 32
  }).then((result) => {
    console.log(result)
  }).catch((error) => {
    console.log(error)
  })

  db.collection("tasks").deleteMany({
    completed: true
  }).then((result) => {
    console.log(result)
  }).catch((error) => {
    console.log(error)
  })
})