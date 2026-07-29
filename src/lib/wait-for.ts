/**
 * Wait for `ms` milliseconds
 */
export const waitFor = (ms = 1_000): Promise<void> =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
