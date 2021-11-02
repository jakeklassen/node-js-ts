import { suite } from "uvu";
import expect from "expect";
import { build } from "#app/app.js";

const app = build({ fastifyServerOptions: { logger: false } });

const apiSuite = suite("/api");

apiSuite("should handle 2015-12-25", async () => {
  const dateParam = "2015-12-25";

  const response = await app.inject({
    method: "GET",
    url: `/api/${dateParam}`,
    headers: {
      "content-type": "application/json",
    },
  });

  /**
   * @type {{ unix:number, utc:string }}
   */
  const body = response.json();

  expect(response.statusCode).toBe(200);
  expect(body.unix).toBe(1451001600000);
  expect(body.utc).toBe(new Date(dateParam).toUTCString());
});

apiSuite("should handle 1451001600000", async () => {
  const dateParam = 1451001600000;

  const response = await app.inject({
    method: "GET",
    url: `/api/${dateParam}`,
    headers: {
      "content-type": "application/json",
    },
  });

  /**
   * @type {{ unix:number, utc:string }}
   */
  const body = response.json();

  expect(response.statusCode).toBe(200);
  expect(body.unix).toBe(1451001600000);
  expect(body.utc).toBe(new Date(dateParam).toUTCString());
});

apiSuite("should error on bad input", async () => {
  const dateParam = "nope";

  const response = await app.inject({
    method: "GET",
    url: `/api/${dateParam}`,
    headers: {
      "content-type": "application/json",
    },
  });

  /**
   * @type {{ error: string }}
   */
  const body = response.json();

  expect(response.statusCode).toBe(200);
  expect(body.error).toBe("Invalid date");
});

apiSuite("should use current date if data param is not provided", async () => {
  const response = await app.inject({
    method: "GET",
    url: `/api`,
    headers: {
      "content-type": "application/json",
    },
  });

  /**
   * @type {{ unix:number, utc:string }}
   */
  const body = response.json();

  expect(typeof body.unix).toBe("number");
  expect(typeof body.utc).toBe("string");
});

apiSuite.run();
