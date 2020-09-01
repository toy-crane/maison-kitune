import { IResolvers } from "graphql-tools";
import { Context } from "../../../context";

const mutation: IResolvers = {
  Mutation: {
    signUp: async (_, { name, username, email, password }, ctx: Context) => {
      const { prisma } = ctx;
      try {
        const user = await prisma.user.create({
          data: {
            name,
            username,
            email,
            password,
          },
        });
        return {
          user,
          token: 1234,
        };
      } catch (err) {
        console.log(err);
        return;
      }
    },
  },
};

export default mutation;
