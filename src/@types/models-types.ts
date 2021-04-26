import { UserGetPayload } from "prisma";

// prisma에서 User Model 가져오기
export type UserModel = UserGetPayload<{}>;
