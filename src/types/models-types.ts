import { UserGetPayload } from "@prisma/client";

export type UserModel = UserGetPayload<{
  select: { email: true; name: true; id: true };
}>;
