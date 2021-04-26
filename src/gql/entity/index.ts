import path from "path";
import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeResolvers } from "@graphql-tools/merge";

// build 시, javascript, typescript를 모두 포함하기 위해 아래와 같이 추가
const resolversArray = loadFilesSync([
  path.join(__dirname, "/**/*.resolvers.ts"),
  path.join(__dirname, "/**/*.resolvers.js"),
]);
const resolvers = mergeResolvers(resolversArray);
export default resolvers;
