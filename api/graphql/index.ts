import { schema } from "../../src/schema";
import { permissions } from "../../src/permissions";
import { createContext } from "../../src/context";
import { applyMiddleware } from "graphql-middleware";
import { ApolloServer } from "apollo-server-micro";

// apollo server 초기화
const server = new ApolloServer({
  // graphql shield 적용
  schema: applyMiddleware(schema, permissions),
  context: createContext,
});

export default new ApolloServer({ schema }).createHandler({
  path: "/api/graphql",
});
