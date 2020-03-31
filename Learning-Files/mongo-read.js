// CRUD - READ

const { MongoClient, ObjectID} = require("mongodb")

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

  // Searching for a user using one or more fields as a criteria
  // If no user is found matching given credentials, null would be returned instead of an error
  db.collection("users").findOne({
    _id: new ObjectID("5e8098ce5f23fb7a06c2d1e0")
    // name: "Himanshi",
    // age: 1
  }, (error, user) => {
    if (error) {
      return console.log("Couldn't fetch user!")
    }

    console.log(user)
  })

  // Finding multiple documents
  // We get a cursor when using find which is a pointer to data and can be used to work extensively with it
  db.collection("users").find({
    name: "Bipin"
  }).toArray((error, users) => {
    console.log(users)
  })

  db.collection("users").find({
    name: "Bipin"
  }).count((error, count) => {
    console.log(count)
  })

  db.collection("tasks").find({
    completed: false
  }).toArray((error, tasks) => {
    console.log(tasks)
  })
})