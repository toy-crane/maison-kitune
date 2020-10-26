import "./env";
import { ApolloServer } from "apollo-server";
import schema from "./schema";
import passport from "passport";
import { createContext } from "./context";

const ORIGIN = process.env.ORIGIN;
const PORT = process.env.PORT;
passport.initialize();
const server = new ApolloServer({ schema, context: createContext });

server.listen({ url: ORIGIN, port: PORT }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
