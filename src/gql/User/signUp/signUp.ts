import { IResolvers } from "graphql-tools";
import * as bcrypt from "bcryptjs";
import { Context } from "../../../context";
import createJWT from "../../../utils/auth/createJWT";

const mutation: IResolvers = {
  Mutation: {
    signUp: async (_, { name, username, email, password }, ctx: Context) => {
      const { prisma } = ctx;
      const hasSameEMail = await prisma.user.findOne({
        where: {
          email,
        },
      });
      const hasSameUsername = await prisma.user.findOne({
        where: {
          username,
        },
      });

      if (hasSameEMail) {
        return new Error("Email Already exists");
      } else if (hasSameUsername) {
        return new Error("username Already exists");
      } else {
        try {
          const hashedPassword = await bcrypt.hash(password, 10);
          const user = await prisma.user.create({
            data: {
              name,
              username,
              email,
              password: hashedPassword,
            },
          });
          const token = createJWT(user.id, email);
          return {
            user,
            token,
          };
        } catch (err) {
          throw Error(err);
          return;
        }
      }
    },
  },
};

export default mutation;
