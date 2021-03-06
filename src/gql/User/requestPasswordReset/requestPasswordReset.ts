import { IResolvers } from "graphql-tools";
import { Context } from "../../../context";
import env from "../../../env";
import createRandomToken from "../../../utils/auth/createSecret";
import { sendResetPasswordEmail } from "../../../utils/mail/sendMail";

const mutation: IResolvers = {
  Mutation: {
    requestPasswordReset: async (_, { email }, ctx: Context) => {
      const { prisma } = ctx;
      const user = await prisma.user.findOne({
        where: { email },
        select: { email: true, name: true, id: true },
      });
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
      const clientUrl = env.client_url;
      const resetUrl = `${clientUrl}/reset-password/?resetToken=${resetToken}`;
      sendResetPasswordEmail(resetUrl, user.email);
      return { email };
    },
  },
};

export default mutation;
