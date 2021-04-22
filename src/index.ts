import "./env";
import { ApolloServer } from "apollo-server-express";
import ApolloConfig from "./config";
import app from "./server";

// apollo server 초기화
const server = new ApolloServer(ApolloConfig);
// apollo server에 express 연결
// apollo server cors 옵션 disable시켜야 express의 cors 옵션이 동작함
server.applyMiddleware({ app, cors: false, path: "/api/graphql" });

// express 실행
app.listen({ port: 5000 }, () =>
  console.log(`🚀 Server ready at http://localhost:5000${server.graphqlPath}`)
);
