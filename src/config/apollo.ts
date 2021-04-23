import { Config } from "apollo-server";
import { schema } from "../schema";
import { permissions } from "../permissions";
import { applyMiddleware } from "graphql-middleware";
import { createContext } from "../context";

const config: Config = {
  schema: applyMiddleware(schema, permissions),
  context: createContext,
  playground: {
    settings: {
      "request.credentials": "include",
    },
  },
};

export default config;
