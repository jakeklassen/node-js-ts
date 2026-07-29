import { Hono } from "hono";

// Routes are chained rather than registered as separate statements so Hono can
// infer the response types. That inference is what gives `testClient` a fully
// typed client in the tests — registering them separately erases it.
export const dateRoutes = new Hono()
  /**
   * Route handler for `/api`
   */
  .get("/", (c) => {
    const date = new Date();

    return c.json({
      unix: Math.floor(date.getTime()),
      utc: date.toUTCString(),
    });
  })
  /**
   * Route handler of `/api/:date`
   * Hono's router does not have optional params either, so the bare `/` route
   * above covers the no-param case.
   */
  .get("/:date", (c) => {
    const dateParam = c.req.param("date");

    let date = new Date(dateParam);

    // If the date is invalid, try as a timestamp
    if (date.toJSON() === null) {
      date = new Date(Math.trunc(Number(dateParam)));
    }

    if (date.toJSON() === null) {
      return c.json({
        error: "Invalid date",
      });
    }

    return c.json({
      unix: Math.floor(date.getTime()),
      utc: date.toString() === "Invalid Date" ? null : date.toUTCString(),
    });
  });
