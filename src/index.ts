import "./env";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import session from "express-session";
import schema from "./schema";
import passport from "passport";
import { createContext } from "./context";
import router from "./router";
import passportInit from "./passport/passport.init";

const ORIGIN = process.env.ORIGIN;
const PORT = process.env.PORT;

const server = new ApolloServer({ schema, context: createContext });

const app = express();
app.use(
  session({
    secret: process.env.SESSION_SECRET || "SECRET",
    resave: false,
    saveUninitialized: true,
  })
);
app.use("/", router);

// passport 관련 초기화
app.use(passport.initialize());
passportInit();

server.applyMiddleware({ app });

app.listen({ url: ORIGIN, port: PORT }, () =>
  console.log(`🚀 Server ready at ${ORIGIN}:${PORT}${server.graphqlPath}`)
);
