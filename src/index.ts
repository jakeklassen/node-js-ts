import { build } from "#app/app.ts";
import { serve } from "@hono/node-server";
import getPort from "get-port";

const app = build({ logger: true });

// An unset PORT and an empty PORT both mean "pick a free port" — the truthiness
// check this replaces treated "" as a value and produced port 0.
const portEnv = process.env.PORT;
const port =
  portEnv !== undefined && portEnv !== ""
    ? Math.trunc(Number(portEnv))
    : await getPort();

serve({ fetch: app.fetch, port }, (info) => {
  console.log(`Server listening on http://localhost:${info.port} 🚀`);
});
