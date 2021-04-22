import "./env";
import cookieParser from "cookie-parser";
import passport from "passport";
import router from "./router";
import passportInit from "./passport/passport.init";
import env from "./env";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import cors from "cors";
import config from "./config";

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
const server = new ApolloServer(config);

// apollo server에 express 연결
// apollo server cors 옵션 disable시켜야 express의 cors 옵션이 동작함
server.applyMiddleware({ app, cors: false, path: "/api/graphql" });

// express 실행
app.listen({ port: 5000 }, () =>
  console.log(`🚀 Server ready at http://localhost:5000${server.graphqlPath}`)
);
