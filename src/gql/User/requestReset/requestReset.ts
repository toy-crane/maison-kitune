import { IResolvers } from "graphql-tools";
import { Context } from "../../../context";
import createRandomToken from "../../../utils/auth/createSecret";
import { sendResetPasswordEmail } from "../../../utils/mail/sendMail";

const mutation: IResolvers = {
  Mutation: {
    requestReset: async (_, __, ctx: Context) => {
      const { prisma, user } = ctx;
      console.log(ctx);
      if (!user) {
        throw new Error("Wrong Email");
      }
      const userId = user.id;
      const resetToken = createRandomToken();
      // 1시간 유효기간 설정
      const resetTokenExpiry = Date.now() + 3600000;
      await prisma.user.update({
        where: { id: userId },
        data: {
          resetToken,
          resetTokenExpiry,
        },
      });
      const origin = process.env.ORIGIN;
      const resetUrl = `${origin}/reset-password/?token=${resetToken}`;
      sendResetPasswordEmail(resetUrl, user.email);
      return true;
    },
  },
};

export default mutation;
