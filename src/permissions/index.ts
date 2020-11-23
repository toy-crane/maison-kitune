import { shield } from "graphql-shield";
import { isAuthenticated } from "./rules";

export const permissions = shield(
  {
    Query: {
      getMe: isAuthenticated,
    },
    Mutation: {},
  },
  { allowExternalErrors: true }
);
