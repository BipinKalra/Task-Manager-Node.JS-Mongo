const bcrypt = require("bcrypt")

const someFunction = async () => {
  const password = "somethingrandom123!"
  // This function generates the hash by running hashing algo on the password 8 times
  const hashedPassword = await bcrypt.hash(password, 8)

  console.log(password)
  console.log(hashedPassword)

  // If given pass matches the hashed pass in the DB

  const isMatch = await bcrypt.compare("somethingrandom123!", hashedPassword)
  console.log(isMatch)
}

someFunction()