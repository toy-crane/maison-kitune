import { IResolvers } from "graphql-tools";
import { Context } from "../../../context";
import createJWT from "../../../utils/auth/createJWT";

const mutation: IResolvers = {
  Mutation: {
    confirmVerificationToken: async (
      _,
      { email, verificationToken },
      ctx: Context
    ) => {
      const { prisma } = ctx;
      const user = await prisma.user.findOne({
        where: {
          email,
        },
      });
      if (!user) {
        throw Error("잘못된 유저 정보입니다.");
      }
      const tokens = await prisma.verificationToken.findMany({
        where: {
          verificationToken,
          user: {
            id: user.id,
          },
        },
      });

      if (!tokens.length) {
        throw Error("잘못된 토큰입니다.");
      }

      const token = createJWT(user.id, user.email);
      return { user, token };
    },
  },
};

export default mutation;
