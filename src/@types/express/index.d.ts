import { UserModel } from "../models-types";

// express Request에 decodedUser 추가
declare global {
  namespace Express {
    interface Request {
      decodedUser: UserModel | null;
      jwtError: string | null;
    }
  }
}
