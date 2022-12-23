import { build } from "#app/app.js";
import getPort from "get-port";

const app = build({
  fastifyServerOptions: {
    logger: true,
  },
});

const port = process.env.PORT ? parseInt(process.env.PORT) : await getPort();

await app
  .listen({
    port,
  })
  .then(() => {
    console.log(`Server listening on http://localhost:${port} 🚀`);
  });
