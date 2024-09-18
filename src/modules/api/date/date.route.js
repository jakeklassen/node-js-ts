/**
 * Route handler for `/api`
 * @type {import("fastify").RouteOptions}
 */
export const getDateNullRouteOptions = {
  method: "GET",
  url: "/api",
  handler(_request, reply) {
    const date = new Date();

    const response = {
      unix: Math.floor(date.getTime()),
      utc: date.toUTCString(),
    };

    reply.send(response);
  },
};

/**
 * Route handler of `/api/:date`
 * From what I can tell Fastify's router does not have optional params.
 * @type {import("#app/modules/api/date/date.route.types.js").GetDateRouteOptions}
 */
export const getDateRouteOptions = {
  method: "GET",
  url: "/api/:date",
  schema: {
    params: {
      type: "object",
      properties: {
        date: {
          type: ["string", "null"],
        },
      },
    },
  },
  handler(request, reply) {
    let date = new Date(request.params.date);

    // If the date is invalid, try as a timestamp
    if (date.toJSON() === null) {
      date = new Date(parseInt(request.params.date, 10));
    }

    if (date.toJSON() === null && request.params.date != null) {
      reply.send({
        error: "Invalid date",
      });

      return;
    }

    const response = {
      unix: Math.floor(date.getTime()),
      utc: date.toString() !== "Invalid Date" ? date.toUTCString() : null,
    };

    reply.send(response);
  },
};
