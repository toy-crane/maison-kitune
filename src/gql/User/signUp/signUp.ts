import { IResolvers } from "graphql-tools";
import * as bcrypt from "bcryptjs";
import { Context } from "../../../context";
import createRandomToken from "../../../utils/auth/createSecret";
import { sendActivateAccountEmail } from "../../../utils/mail/sendMail";
import env from "../../../env";

const mutation: IResolvers = {
  Mutation: {
    signUp: async (
      _,
      { name, email, password, confirmPassword },
      ctx: Context
    ) => {
      const { prisma } = ctx;
      if (password !== confirmPassword) {
        throw new Error("비밀번호가 잘못되었습니다.");
      }
      const hasSameEMail = await prisma.user.findOne({
        where: {
          email,
        },
      });
      if (hasSameEMail) {
        return new Error("이미 존재하는 이메일입니다.");
      } else {
        try {
          const hashedPassword = await bcrypt.hash(password, 10);
          const user = await prisma.user.create({
            data: {
              name,
              email,
              password: hashedPassword,
              isActive: false,
            },
          });
          const clientUrl = env.client_url;
          const verificationToken = createRandomToken();
          await prisma.verificationToken.create({
            data: {
              verificationToken,
              user: {
                connect: {
                  id: user.id,
                },
              },
            },
          });
          const activateUrl = `${clientUrl}/confirm-verification/?verificationToken=${verificationToken}`;
          try {
            sendActivateAccountEmail(activateUrl, user.email);
          } catch (e) {
            console.log(e);
            throw Error("이메일 발송에 실패했습니다.");
          }
          return {
            user,
          };
        } catch (err) {
          throw Error(err);
        }
      }
    },
  },
};

export default mutation;
