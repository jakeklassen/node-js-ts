import fastify from "fastify";
import Ajv from "ajv";

const app = fastify({ logger: true });

app.get(
  "/:date",
  {
    schema: {
      params: {
        date: {
          type: ["string", "null"],
        },
      },
    },
  },
  async (request, _reply) => {
    let date = new Date(request.params.date);

    // If the date is invalid, try as a timestamp
    if (date.toJSON() === null) {
      date = new Date(parseInt(request.params.date, 10));
    }

    // TODO: Is this normal? When not present it becomes a string 🤔
    if (request.params.date === "undefined") {
      date = new Date();
    }

    return { message: "o hai 👋" };
  },
);

const ajv = new Ajv({
  removeAdditional: false,
  useDefaults: true,
  coerceTypes: true,
  allErrors: true,
});

app.setValidatorCompiler(({ schema }) => ajv.compile(schema));

const port = process.env.PORT || 3000;

await app.listen(port).then(() => {
  console.log(`Server listening on http://localhost:${port} 🚀`);
});
