import { UserGetPayload } from "@prisma/client";

// prisma에서 User Model 가져오기
export type UserModel = UserGetPayload<{}>;
