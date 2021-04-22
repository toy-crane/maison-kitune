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
  // playground에서 cookie 보내는 설정
  playground: {
    settings: {
      "request.credentials": "include",
    },
  },
});

// cors 설정 추가
const cors = microCors({});

export default cors((req, res) => {
  if (req.method === "OPTIONS") {
    res.end();
    return false;
  }
  return server.createHandler({
    path: "/api/graphql",
  })(req, res);
});

export const config = {
  api: {
    bodyParser: false,
  },
};
