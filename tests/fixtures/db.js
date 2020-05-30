const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const User = require("../../src/models/user")
const Task = require("../../src/models/task")

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

const userTwoId = mongoose.Types.ObjectId()
const userTwo = {
  _id: userTwoId,
  name: "Task User",
  email: "taskuser@gmail.com",
  password: "task123!",
  tokens: [{
    token: jwt.sign({ _id: userTwoId }, process.env.JWT_SECRET)
  }]
}

const taskOne = {
  _id: new mongoose.Types.ObjectId(),
  description: "First Task",
  owner: userOneId
}

const taskTwo = {
  _id: new mongoose.Types.ObjectId(),
  description: "Second Task",
  completed: true,
  owner: userOneId
}

const taskThree = {
  _id: new mongoose.Types.ObjectId(),
  description: "Third Task",
  owner: userTwoId
}

const setupDatabase = async () => {
  await User.deleteMany()
  await new User(userOne).save()
  await new User(userTwo).save()

  await Task.deleteMany()
  await new Task(taskOne).save()
  await new Task(taskTwo).save()
  await new Task(taskThree).save()
}

module.exports = { 
  userOneId,
  userOne,
  userTwoId,
  userTwo,
  taskOne,
  taskTwo,
  taskThree,
  setupDatabase
}