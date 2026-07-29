import { dateRoutes } from "#app/modules/api/date/date.route.ts";
import { Hono } from "hono";
import { logger } from "hono/logger";

/**
 * App factory
 */
export const build = ({
  logger: enableLogger = false,
}: Readonly<{ logger?: boolean }> = {}) => {
  const app = new Hono();

  // Middleware only applies to routes registered after it, so this has to come
  // before `app.route`.
  if (enableLogger) {
    app.use(logger());
  }

  // Returned directly from `.route()` so the merged route types survive — the
  // typed test client depends on them.
  return app.route("/api", dateRoutes);
};
