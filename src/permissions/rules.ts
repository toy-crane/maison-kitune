import { rule } from "graphql-shield";
import { AuthenticationError } from "apollo-server";

export const isAuthenticated = rule({ cache: "contextual" })(
  async (_, __, { user, req }, ___) => {
    if (user) {
      return true;
    }
    const jwtError = req.jwtError;
    if (jwtError === "TokenExpiredError") {
      return new AuthenticationError("Token 유효기간 만료");
    } else if (jwtError === "JsonWebTokenError") {
      return new AuthenticationError("잘못된 토큰이 입력되었습니다.");
    }
    return new AuthenticationError("인증이 반드시 필요한 접근입니다.");
  }
);
