import { makeExecutableSchema } from "@graphql-tools/schema";
import * as path from "path";
import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";
import { loadFilesSync } from "@graphql-tools/load-files";

const allTypes = loadFilesSync(path.join(__dirname, "/gql/**/*.gql"));
const allResolvers = loadFilesSync(path.join(__dirname, "/gql/**/*.ts"));

const typeDefs = mergeTypeDefs(allTypes);
const resolvers = mergeResolvers(allResolvers);
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
export { schema };
