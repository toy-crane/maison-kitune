import "./env";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import session from "express-session";
import cors from "cors";
import schema from "./schema";
import passport from "passport";
import { createContext } from "./context";
import router from "./router";

const ORIGIN = process.env.ORIGIN;
const PORT = process.env.PORT;

passport.initialize();
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
server.applyMiddleware({ app });

app.listen({ url: ORIGIN, port: PORT }, () =>
  console.log(`🚀 Server ready at ${ORIGIN}:${PORT}${server.graphqlPath}`)
);
