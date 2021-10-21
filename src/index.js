import { sum } from "./sum.js";

/**
 * Wait for `ms` milliseconds
 * @param {number} ms
 * @returns {Promise<void>}
 */
const waitFor = (ms = 1_000) =>
  new Promise((resolve) => setTimeout(resolve, ms));

await (void console.log("waiting...") || waitFor());

console.log(sum(1, 2, 3, 4));
