import { rule } from "graphql-shield";
import { Context } from "../types/context-types";
import { AuthenticationError } from "apollo-server";

export const isAuthenticated = rule({ cache: "contextual" })(
  async (_, __, ctx: Context, ___) => {
    if (ctx.user) {
      return true;
    }
    return new AuthenticationError("인증이 반드시 필요한 접근입니다.");
  }
);
