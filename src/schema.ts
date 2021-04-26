import { makeExecutableSchema } from "@graphql-tools/schema";
import resolvers from "./gql/entity";
import typeDefs from "./gql/types";

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
export { schema };
