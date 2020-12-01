import { Resolvers } from "../../../types/resolvers-types";
import { AuthenticationError } from "apollo-server";

const resolver: Resolvers = {
  Mutation: {
    activateUser: async (_, { mobile, name }, { prisma, user }) => {
      if (user) {
        const { isActive, id } = user;
        if (isActive) {
          throw new AuthenticationError("비활성화된 고객이 아닙니다.");
        }
        const updatedUser = prisma.user.update({
          where: {
            id,
          },
          data: {
            name,
            mobile,
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
