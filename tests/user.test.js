const request = require("supertest")
const app = require("../src/app")
const User = require("../src/models/user")
const { userOneId, userOne, setupDatabase } = require("./fixtures/db")

// beforeEach and afterEach are globals provided by jest and they take in functions to run
// before/after each test case is executed
beforeEach(setupDatabase)

test("Should signup a new user!", async () => {
  const response = await request(app).post("/users").send({
    name: "Bipin",
    email: "bipinkalra2@yahoo.com",
    password: "bipin123!"
  }).expect(201)

  // Some other advanced form of assertions that we can make

  // Assert that the database was changed correctly
  const user = await User.findById(response.body.user._id)
  expect(user).not.toBeNull()

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
  const response = await request(app).post("/users/login").send({
    email: userOne.email,
    password: userOne.password
  }).expect(200)

  const user = await User.findById(userOneId)
  expect(response.body.token).toBe(user.tokens[1].token)
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

  const user = await User.findById(userOneId)
  expect(user).toBeNull()
})

test("Should not delete user profile since unauthenticated!", async () => {
  await request(app)
    .delete("/users/me")
    .send()
    .expect(401)
})

test("Should upload avatar image!", async () => {
  await request(app)
    .post("/users/me/avatar")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .attach("avatar", "tests/fixtures/profile-pic.jpg")
    .expect(200)

  const user = await User.findById(userOneId)

  // The assertion below would fail as toBe uses triple equality which makes both the objects different
  // expect({}).toBe({})
  // The assertion below would pass though as toEqual checks for individual properties and compares them
  // expect({}).toEqual({})

  // This checks for the data to be of the type Buffer
  expect(user.avatar).toEqual(expect.any(Buffer))
})

test("Should update valid user profile field!", async () => {
  await request(app)
    .patch("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({
      name: "Bipin Kalra"
    })
    .expect(200)

  const user = await User.findById(userOneId)
  expect(user.name).toEqual("Bipin Kalra")
})

test("Should not update invalid user profile fields!", async () => {
  await request(app)
    .patch("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({
      location: "Delhi"
    })
    .expect(400)
})

// SOME EXTRA TESTING IDEAS

// Should not signup user with invalid name/email/password
// Should not update user if unauthenticated
// Should not update user with invalid name/email/password
// Should not delete user if unauthenticated