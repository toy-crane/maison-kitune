import { IResolvers } from "graphql-tools";

const resolvers: IResolvers = {
  Query: {
    hello: (_: void, { name }) => `${name} 안녕하세요`,
  },
};

export default resolvers;
