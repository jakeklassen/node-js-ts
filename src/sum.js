/**
 * Sum a list of numbers
 * @param  {...number} numbers
 */
export const sum = (...numbers) =>
  numbers.reduce((total, number) => total + number, 0);
