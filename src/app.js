import {
  getDateNullRouteOptions,
  getDateRouteOptions,
} from "#app/modules/api/date/date.route.js";
import Ajv from "ajv";

/**
 * App factory
 * @param {object} opts
 * @param {import("fastify").FastifyInstance} opts.instance
 */
export const build = ({ instance: app }) => {
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
