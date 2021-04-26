import { makeExecutableSchema } from "@graphql-tools/schema";
import * as path from "path";
import { mergeResolvers } from "@graphql-tools/merge";
import typeDefs from "./gql/types";
import { loadFilesSync } from "@graphql-tools/load-files";

const allResolvers = loadFilesSync(path.join(__dirname, "/gql/entity/**/*.ts"));
const resolvers = mergeResolvers(allResolvers);
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
export { schema };
