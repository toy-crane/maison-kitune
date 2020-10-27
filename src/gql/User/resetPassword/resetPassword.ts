import { IResolvers } from "graphql-tools";
import { Context } from "../../../context";
import * as bcrypt from "bcryptjs";
import createJWT from "../../../utils/auth/createJWT";

const mutation: IResolvers = {
  Mutation: {
    resetPassword: async (
      _,
      { password, confirmPassword, resetToken },
      ctx: Context
    ) => {
      const { prisma } = ctx;
      if (password !== confirmPassword) {
        throw Error("비밀번호가 일치하지 않습니다.");
      }
      const user = await prisma.user.findMany({
        where: {
          resetToken,
          resetTokenExpiry: {
            gte: Date.now() - 3600000,
          },
        },
      });
      if (!user) {
        throw Error("reset token이 잘못되었거나 유효기간이 초과되었습니다.");
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const updatedUser = await prisma.user.update({
        where: { id: user[0].id },
        data: { password: hashedPassword },
      });
      const token = createJWT(updatedUser.id, updatedUser.email);
      return { user: updatedUser, token };
    },
  },
};

export default mutation;
