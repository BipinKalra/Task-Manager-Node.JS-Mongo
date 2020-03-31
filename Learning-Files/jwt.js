const jwt = require("jsonwebtoken")

const someFunction = async () => {
  // Sign method generates a new token and takes in 3 arguments - 
  // 1. Object which contains data to be embedded in the token
  // 2. Secret sequence which is a random sequence of characters
  // 3. Object containing options
  const token = jwt.sign({ _id: "abc123" }, "thisisanewtoken", { expiresIn: "7 days"})
  console.log(token)

  // const data = jwt.verify(token, "thisisanewtokens") // this would throw an error since the secret doesnt match
  const data = jwt.verify(token, "thisisanewtoken")
  console.log(data)
}

someFunction()