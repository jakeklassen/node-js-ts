/**
 * Wait for `ms` milliseconds
 * @param {number} ms
 * @returns {Promise<void>}
 */
export const waitFor = (ms = 1_000) =>
  new Promise((resolve) => setTimeout(resolve, ms));
