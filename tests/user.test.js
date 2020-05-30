const request = require("supertest")
const app = require("../src/app")
const jwt = require("jsonwebtoken")
const mongoose = require("mongoose")
const User = require("../src/models/user")

const userOneId = mongoose.Types.ObjectId()

const userOne = {
  _id: userOneId,
  name: "Random User",
  email: "randomuser@gmail.com",
  password: "random123!",
  tokens: [{
    token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET)
  }]
}

// beforeEach and afterEach are globals provided by jest and they take in functions to run
// before/after each test case is executed
beforeEach(async () => {
  await User.deleteMany()
  await new User(userOne).save()
})

test("Should signup a new user!", async () => {
  const response = await request(app).post("/users").send({
    name: "Bipin",
    email: "bipinkalra2@yahoo.com",
    password: "bipin123!"
  }).expect(201)

  // Some other advanced form of assertions that we can make

  // Assert that the database was changed correctly
  const user = await User.findById(response.body.user._id)
  expect().not.toBeNull()

  // Assertions about object
  expect(response.body).toMatchObject({
    user: {
      name: "Bipin",
      email: "bipinkalra2@yahoo.com"
    },
    token: user.tokens[0].token
  })

  // Assertion to check that plaintext password isn't stored in DB
  expect(user.password).not.toBe("bipin123!")
})

test("Should login existing user!", async () => {
  await request(app).post("/users/login").send({
    email: userOne.email,
    password: userOne.password
  }).expect(200)
})

test("Should reject nonexistent user!", async () => {
  await request(app).post("/users/login").send({
    email: "junk@gmail.com",
    password: "junkpassword"
  }).expect(400)
})

test("Should fetch user profile!", async () => {
  await request(app)
    .get("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)
})

test("Shouldn't get any user profile when not authenticated!", async () => {
  await request(app)
    .get("/users/me")
    .send()
    .expect(401)
})

test("Should delete user profile!", async () => {
  await request(app)
    .delete("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)
})

test("Should not delete user profile since unauthenticated!", async () => {
  await request(app)
    .delete("/users/me")
    .send()
    .expect(401)
})