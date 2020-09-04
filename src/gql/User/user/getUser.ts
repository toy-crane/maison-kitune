import { IResolvers } from "graphql-tools";
import { Context } from "../../../context";

const query: IResolvers = {
  Query: {
    user: async (_, { id }, ctx: Context) => {
      const { prisma } = ctx;
      const user = await prisma.user.findOne({
        where: {
          id,
        },
      });
      return user;
    },
  },
};

export default query;
