import { UserGetPayload } from "@prisma/client";

export type UserPersonalData = UserGetPayload<{
  select: { email: true; name: true; id: true };
}>;
