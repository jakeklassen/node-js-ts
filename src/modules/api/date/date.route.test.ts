import { build } from "#app/app.ts";
import { expect } from "expect";
import { testClient } from "hono/testing";
import { describe, it } from "node:test";

const client = testClient(build());

void describe("/api", function () {
  void it("should use current date if date param is not provided", async () => {
    const response = await client.api.$get();
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(typeof body.unix).toBe("number");
    expect(typeof body.utc).toBe("string");
  });
});

void describe("/api/:date", function () {
  void it("should handle 2015-12-25", async () => {
    const date = "2015-12-25";

    const response = await client.api[":date"].$get({ param: { date } });
    const body = await response.json();

    // `/api/:date` answers with a date payload or an error, so Hono infers a
    // union; narrowing here fails loudly instead of asserting on `undefined`.
    if ("error" in body) throw new Error(`unexpected error: ${body.error}`);

    expect(response.status).toBe(200);
    expect(body.unix).toBe(1451001600000);
    expect(body.utc).toBe(new Date(date).toUTCString());
  });

  void it("should handle 1451001600000", async () => {
    const date = "1451001600000";

    const response = await client.api[":date"].$get({ param: { date } });
    const body = await response.json();

    if ("error" in body) throw new Error(`unexpected error: ${body.error}`);

    expect(response.status).toBe(200);
    expect(body.unix).toBe(1451001600000);
    expect(body.utc).toBe(new Date(Number(date)).toUTCString());
  });

  void it("should error on bad input", async () => {
    const response = await client.api[":date"].$get({
      param: { date: "nope" },
    });
    const body = await response.json();

    expect(response.status).toBe(200);
    expect("error" in body ? body.error : null).toBe("Invalid date");
  });
});
