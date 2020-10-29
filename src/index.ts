import "./env";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import schema from "./schema";
import passport from "passport";
import { createContext } from "./context";

const ORIGIN = process.env.ORIGIN;
const PORT = process.env.PORT;
passport.initialize();
const server = new ApolloServer({ schema, context: createContext });

const app = express();
server.applyMiddleware({ app });

app.listen({ url: ORIGIN, port: PORT }, () =>
  console.log(`🚀 Server ready at ${ORIGIN}:${PORT}${server.graphqlPath}`)
);
