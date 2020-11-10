import "./env";
import { GraphQLServer } from "graphql-yoga";
import cookieParser from "cookie-parser";
import { resolvers, typeDefs } from "./schema";
import passport from "passport";
import { createContext } from "./context";
import router from "./router";
import passportInit from "./passport/passport.init";
import { authenticateJWT } from "./passport/jwt";
import env from "./env";

const server = new GraphQLServer({
  typeDefs,
  resolvers,
  context: createContext,
});

// express 미들웨어 순서 중요!
// passport 관련 초기화
passportInit();
server.express.use(passport.initialize());
// request에 req.cookies 만들어주는 미들웨어
server.express.use(cookieParser());
// request에 req.user 만들어주는 jwt 인증 미들웨어
server.express.use(authenticateJWT);
// router 추가
server.express.use("/", router);

const corsOptions = {
  origin: [env.client_url],
  credentials: true,
};

// Graphql Yoga 실행
server.start(
  {
    playground: "/playground",
    endpoint: "/graphql",
    cors: corsOptions,
  },
  () => console.log("Server is running on localhost:4000")
);
