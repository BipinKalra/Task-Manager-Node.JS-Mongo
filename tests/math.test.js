// Here the ".test" extension before ".js" lets jest know that this is a test file

const { calculateTip } = require("../src/math")

test("Should calculate the total tip!", () => {
  const total = calculateTip(10, 0.3)

  // if (total !== 13) {
  //   throw new Error("Total tip should be 13! Got " + total + "!")
  // }

  // jest provides a set of assertion functions in order to make the assertion simpler and eliminate dependence
  // on complex if statements

  expect(total).toBe(13)
})

test("Default total tip!", () => {
  const total = calculateTip(10)
  expect(total).toBe(10 * 1.25)
})

// An empty test case like so would pass as it doesn't throw any error
// test("Hello World!", () => {
// })

// Following test case is going to fail.
// test("This should fail!", () => {
//   throw new Error("Failure!")
// })