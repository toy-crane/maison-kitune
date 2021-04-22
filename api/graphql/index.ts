import { schema } from "../../src/schema";
import { permissions } from "../../src/permissions";
import { createContext } from "../../src/context";
import { applyMiddleware } from "graphql-middleware";
import { ApolloServer } from "apollo-server-micro";
import microCors from "micro-cors";
import env from "../../src/env";

// apollo server 초기화
const server = new ApolloServer({
  // graphql shield 적용
  schema: applyMiddleware(schema, permissions),
  context: createContext,
});

// cors 설정 추가
const cors = microCors({
  origin: [env.client_url],
  credentials: true,
});

const handler = server.createHandler({ path: "/api/graphql" });
export default cors((req, res) =>
  req.method === "OPTIONS" ? res.end() : handler(req, res)
);
