import "./env";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import session from "express-session";
import schema from "./schema";
import passport from "passport";
import { createContext } from "./context";
import router from "./router";
import passportInit from "./passport/passport.init";
import env from "./env";

const ORIGIN = env.origin;
const PORT = env.port;

const server = new ApolloServer({ schema, context: createContext });

// 미들 웨어 순서 중요함.
const app = express();

// passport 관련 초기화
passportInit();
app.use(passport.initialize());
// session 초기화
app.use(
  session({
    secret: env.session_secret,
    resave: false,
    saveUninitialized: true,
  })
);
// router 추가
app.use("/", router);

server.applyMiddleware({ app });

app.listen({ url: ORIGIN, port: PORT }, () =>
  console.log(`🚀 Server ready at ${ORIGIN}:${PORT}${server.graphqlPath}`)
);
