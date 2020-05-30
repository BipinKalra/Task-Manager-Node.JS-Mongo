module.exports = {
  setApiKey () {},
  send () {}
}

// These are mock functions that actually mock the behaviour of actual functions from the npm module for our jest test cases
// These functions are run wherever they are called instead og the original functions in the npm module
// Thus in this case, sendgrid doesn't continue to send random mails every time the test suite is run