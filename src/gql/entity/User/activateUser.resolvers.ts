import { Resolvers } from "../../../types/resolvers-types";

const resolver: Resolvers = {
  Mutation: {
    activateUser: async (_, { mobile, name }, { prisma, user }) => {
      if (user) {
        const { id } = user;
        const updatedUser = prisma.user.update({
          where: {
            id,
          },
          data: {
            name,
            mobile,
            isActive: true,
          },
        });
        return updatedUser;
      } else {
        throw new Error("User Does Not Exists");
      }
    },
  },
};

export default resolver;
