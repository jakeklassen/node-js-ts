/**
 * Sum a list of numbers
 * @param  {...number} numbers
 */
const sum = (...numbers) =>
  numbers.reduce((total, number) => total + number, 0);

module.exports = sum;
