import { IResolvers } from "graphql-tools";

const query: IResolvers = {
  Query: {
    getMe: async (_, __, ctx) => {
      const { user } = ctx;
      return user;
    },
  },
};

export default query;
