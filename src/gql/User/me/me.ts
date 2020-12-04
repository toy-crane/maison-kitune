import { IResolvers } from "graphql-tools";
import { prisma } from '../../../context';

const query: IResolvers = {
  Query: {
    me: async (_, __, {user, prisma}) => {
      await prisma.profile.findOne({
        
      })
      return user;
    },
  },
};

export default query;
