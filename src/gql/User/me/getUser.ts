import { IResolvers } from "graphql-tools";
import { Context } from "../../../context";

const query: IResolvers = {
  Query: {
    me: async (_, __, ctx: Context) => {
      const { user } = ctx;
      console.log(user);
      return user;
    },
  },
};

export default query;
