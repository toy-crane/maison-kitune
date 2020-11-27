import { rule } from "graphql-shield";
import { AuthenticationError, ApolloError } from "apollo-server";

export const isAuthenticated = rule({ cache: "contextual" })(
  async (_, __, { user, req }, ___) => {
    if (user) {
      return true;
    }
    const jwtError = req.jwtError;
    if (jwtError === "TokenExpiredError") {
      return new AuthenticationError("Token 유효기간 만료");
    } else if (jwtError === "JsonWebTokenError") {
      return new ApolloError(
        "잘못된 ACCESS TOKEN입니다.",
        "INVALID_ACCESS_TOKEN"
      );
    }
    return new AuthenticationError("인증이 반드시 필요한 접근입니다.");
  }
);
