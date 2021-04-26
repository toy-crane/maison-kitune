import { Resolvers } from "../../../@types/resolvers-types";

const query: Resolvers = {
  Query: {
    me: async (_, __, { user, prisma }) => {
      const profile = await prisma.profile.findUnique({
        where: {
          userId: user.id,
        },
      });
      return {
        user,
        profile,
      };
    },
  },
};

export default query;
