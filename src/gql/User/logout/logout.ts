import { Resolvers } from "../../../types/resolvers-types";
import { ApolloError } from "apollo-server";

const resolver: Resolvers = {
  Mutation: {
    logout: async (_, __, { req, prisma }) => {
      const refreshToken = req.cookies["refreshToken"];
      if (!refreshToken) {
        throw Error("refresh token이 없습니다.");
      }
      try {
        await prisma.user.update({
          where: {
            refreshToken,
          },
          data: {
            refreshToken: null,
          },
        });
      } catch {
        throw new ApolloError(
          "유효하지 않은 refresh token입니다.",
          "INVALID_REFRESH_TOKEN"
        );
      }

      return true;
    },
  },
};

export default resolver;
