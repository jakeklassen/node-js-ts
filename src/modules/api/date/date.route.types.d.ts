import { FastifySchema, RouteOptions } from "fastify";
import { IncomingMessage, Server, ServerResponse } from "http";

export type GetDateRouteOptions = RouteOptions<
  Server,
  IncomingMessage,
  ServerResponse,
  { Params: { date: string } },
  unknown,
  FastifySchema
>;
