import "./env";
import { GraphQLServer } from "graphql-yoga";
import session from "express-session";
import { resolvers, typeDefs } from "./schema";
import passport from "passport";
import { createContext } from "./context";
import router from "./router";
import passportInit from "./passport/passport.init";
import env from "./env";
import { authenticateJWT } from "./passport/jwt";

const server = new GraphQLServer({
  typeDefs,
  resolvers,
  context: createContext,
});

// express 미들웨어 순서 중요!
// passport 관련 초기화
passportInit();
server.express.use(passport.initialize());
// jwt 인증 미들웨어 
server.express.use(authenticateJWT);

// session 초기화
server.express.use(
  session({
    secret: env.session_secret,
    resave: false,
    saveUninitialized: true,
  })
);

// router 추가
server.express.use("/", router);

// Graphql Yoga 실행
server.start(
  {
    playground: "/playground",
  },
  () => console.log("Server is running on localhost:4000")
);
