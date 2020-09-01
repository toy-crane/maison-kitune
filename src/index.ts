import "./env";
import { ApolloServer } from "apollo-server";
import schema from "./schema";
import { createContext } from "./context";

const PORT = process.env.PORT;
const server = new ApolloServer({ schema, context: createContext });

server.listen({ port: PORT }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
