import {
  getDateNullRouteOptions,
  getDateRouteOptions,
} from "#app/modules/api/date/date.route.js";
import Ajv from "ajv";
import fastify from "fastify";

/**
 * @param {object} opts
 * @param {Parameters<import("fastify").fastify>[0]} opts.fastifyServerOptions
 */
export const build = ({ fastifyServerOptions }) => {
  const app = fastify(fastifyServerOptions);

  app.route(getDateRouteOptions);
  app.route(getDateNullRouteOptions);

  const ajv = new Ajv({
    removeAdditional: false,
    useDefaults: true,
    coerceTypes: true,
    allErrors: true,
  });

  app.setValidatorCompiler(({ schema }) => ajv.compile(schema));

  return app;
};
