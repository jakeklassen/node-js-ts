import { build } from "#app/app.js";

const app = build({
  fastifyServerOptions: {
    logger: true,
  },
});

const port = parseInt(process.env.PORT ?? "3000");

await app
  .listen({
    port,
  })
  .then(() => {
    console.log(`Server listening on http://localhost:${port} 🚀`);
  });
