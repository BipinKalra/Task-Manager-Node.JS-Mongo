// Here the ".test" extension before ".js" lets jest know that this is a test file

const { calculateTip, fahrenheitToCelsius, celsiusToFahrenheit, add } = require("../src/math")

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

test("Should convert 32F to 0C", () => {
  const temp = fahrenheitToCelsius(32)
  expect(temp).toBe(0)
})

test("Should convert 0C to 32F", () => {
  const temp = celsiusToFahrenheit(0)
  expect(temp).toBe(32)
})

// Test for promise based async function
test("Should add two numbers!", (done) => {
  add(2,3).then((sum) => {
    expect(sum).toBe(5)
    done()
  })
})

// Test for async function using async await
// This would yield the same result as above but using the async/await syntax 
test("Should add two numbers (async/await)!", async () => {
  const sum = await add(10,15)
  expect(sum).toBe(25)
})

// DEPRECATED CODE FOR LEARNING

// done argument is called after everything is completed
// Thus unless and until done is called, jest wont make an assertion
// test("Async test demo!", (done) => {
//   setTimeout(() => {
//     expect(1).toBe(2)
//     done()
//   }, 2000)
// })

// In such a case, jest doesn't know the async nature of the test function and thus the test passes
// test("Async test demo!", () => {
//   setTimeout(() => {
//     expect(1).toBe(2)
//   }, 2000)
// })

// An empty test case like so would pass as it doesn't throw any error
// test("Hello World!", () => {
// })

// Following test case is going to fail.
// test("This should fail!", () => {
//   throw new Error("Failure!")
// })