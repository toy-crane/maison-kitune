import { Resolvers } from "../../../types/resolvers-types";

const resolver: Resolvers = {
  Mutation: {
    createAuthToken: async (_, __, ctx) => {
      return "test";
    },
  },
};

export default resolver;
