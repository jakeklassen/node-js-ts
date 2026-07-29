/**
 * Sum a list of numbers
 */
export const sum = (...numbers: readonly number[]) =>
  numbers.reduce((total, number) => total + number, 0);
