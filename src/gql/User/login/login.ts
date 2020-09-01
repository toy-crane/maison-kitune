import { IResolvers } from "graphql-tools";
import { Context } from "../../../context";
import * as bcrypt from "bcryptjs";
import createJWT from "../../../utils/auth/createJWT";

const mutation: IResolvers = {
  Mutation: {
    login: async (_, { email, password }, ctx: Context) => {
      const { prisma } = ctx;
      const user = await prisma.user.findOne({
        where: {
          email,
        },
      });
      if (!user) {
        throw new Error("Wrong password or Email");
      }

      if (!user.password) {
        throw new Error("Facebook or Google Client does not has Password");
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        throw new Error("Wrong password or Email");
      }
      const token = createJWT(user.id, user.email);
      return { token, user };
    },
  },
};

export default mutation;
