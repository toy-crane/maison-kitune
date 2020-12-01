import { shield, not } from "graphql-shield";
import { isAuthenticated, isActivated } from "./rules";

export const permissions = shield(
  {
    Query: {
      me: isAuthenticated,
    },
    Mutation: {
      activateUser: not(isActivated),
    },
  },
  { allowExternalErrors: true }
);
