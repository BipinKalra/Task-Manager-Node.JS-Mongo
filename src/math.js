// Temporary file for having random functions to make jest testcases

const calculateTip = (total, tipPercent = 0.25) => total + (total * tipPercent)

module.exports = {
  calculateTip
}