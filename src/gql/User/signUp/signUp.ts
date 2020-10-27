import { IResolvers } from "graphql-tools";
import * as bcrypt from "bcryptjs";
import { Context } from "../../../context";
import createJWT from "../../../utils/auth/createJWT";

const mutation: IResolvers = {
  Mutation: {
    signUp: async (
      _,
      { name, username, email, password, confirmPassword },
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
      const hasSameUsername = await prisma.user.findOne({
        where: {
          username,
        },
      });

      if (hasSameEMail) {
        return new Error("이미 존재하는 이메일입니다.");
      } else if (hasSameUsername) {
        return new Error("이미 존재하는 유저 이름입니다.");
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
        }
      }
    },
  },
};

export default mutation;
