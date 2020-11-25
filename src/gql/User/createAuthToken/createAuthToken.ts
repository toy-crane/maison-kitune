import { ApolloError } from "apollo-server";
import { Resolvers } from "../../../types/resolvers-types";
import createJWT from "../../../utils/auth/createJWT";
import createRandomToken from "../../../utils/auth/createSecret";

const resolver: Resolvers = {
  Mutation: {
    createAuthToken: async (_, __, { req, res, prisma }) => {
      const refreshToken = req.cookies["refreshToken"];
      if (!refreshToken) {
        throw Error("refresh token이 없습니다.");
      }
      const user = await prisma.user.findOne({
        where: {
          refreshToken,
        },
      });

      if (!user) {
        throw new ApolloError(
          "유효하지 않은 refresh token입니다.",
          "INVALID_REFRESH_TOKEN"
        );
      }
      // 새로운 refresh Token을 생성
      const newRefreshToken = createRandomToken();
      // 새로운 토큰을 set-cookie한다.
      res.cookie("refreshToken", newRefreshToken, { httpOnly: true });
      // 새로운 토큰 DB에 저장
      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          refreshToken: newRefreshToken,
        },
      });
      const accessToken = createJWT(user.id, user.email);

      return {
        token: accessToken,
      };
    },
  },
};

export default resolver;
