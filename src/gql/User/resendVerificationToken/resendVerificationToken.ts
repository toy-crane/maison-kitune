import { IResolvers } from "graphql-tools";
import { Context } from "../../../context";
import env from "../../../env";
import createRandomToken from "../../../utils/auth/createSecret";
import { sendActivateAccountEmail } from "../../../utils/mail/sendMail";
const query: IResolvers = {
  Mutation: {
    resendVerificationToken: async (_, { email }, ctx: Context) => {
      const { prisma } = ctx;
      const users = await prisma.user.findMany({
        where: {
          email,
          isActive: false,
        },
      });
      if (!users.length) {
        throw Error("잘못된 이메일입니다.");
      }

      const clientUrl = env.client_url;
      const verificationToken = createRandomToken();
      await prisma.verificationToken.create({
        data: {
          verificationToken,
          user: {
            connect: {
              id: users[0].id,
            },
          },
        },
      });
      const activateUrl = `${clientUrl}/activate-account/?verificationToken=${verificationToken}`;
      try {
        sendActivateAccountEmail(activateUrl, users[0].email);
      } catch (e) {
        console.log(e);
        throw Error("이메일 발송에 실패했습니다.");
      }
      return true;
    },
  },
};

export default query;
