import { ApolloServer } from "apollo-server-micro";
import microCors from "micro-cors";
import env from "../../src/env";
import ApolloConfig from "../../src/config";

// apollo server 초기화
const server = new ApolloServer(ApolloConfig);

// cors 설정 추가
const cors = microCors({
  allowCredentials: true,
  origin: env.client_url,
});

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
