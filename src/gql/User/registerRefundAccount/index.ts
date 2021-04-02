import { Resolvers } from "types/resolvers-types";

const resolver: Resolvers = {
  Mutation: {
    registerRefundAccount: async (
      _,
      { bankCode: RBankCode, bankAccount: RBankAccount },
      { prisma, user }
    ) => {
      if (user) {
        const { id } = user;
        const updatedUser = prisma.user.update({
          where: {
            id,
          },
          data: {
            RBankCode,
            RBankAccount,
            status: "ACCOUNT_REGISTERED",
          },
        });
        return updatedUser;
      } else {
        throw new Error("User Does Not Exists");
      }
    },
  },
};

export default resolver;
