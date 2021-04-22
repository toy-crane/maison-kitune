import "./env";
import cookieParser from "cookie-parser";
import { schema } from "./schema";
import passport from "passport";
import router from "./router";
import passportInit from "./passport/passport.init";
import env from "./env";
import { permissions } from "./permissions";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import cors from "cors";
import { createContext } from "./context";
import { applyMiddleware } from "graphql-middleware";

// express server 초기화
const app = express();

// express 미들웨어 순서 중요!
// passport 관련 초기화
passportInit();
app.use(passport.initialize());
// request에 req.cookies 만들어주는 미들웨어
app.use(cookieParser());
// router 추가
app.use("/", router);
// cors option 추가
const corsOptions = {
  origin: [env.client_url],
  credentials: true,
};
app.use(cors(corsOptions));

// apollo server 초기화
const server = new ApolloServer({
  // graphql shield 적용
  schema: applyMiddleware(schema, permissions),
  context: createContext,
});

// apollo server에 express 연결
// apollo server cors 옵션 disable시켜야 express의 cors 옵션이 동작함
server.applyMiddleware({ app, cors: false });

// express 실행
app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
