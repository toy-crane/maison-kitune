import passport from "passport";
import { Response } from "express";
import { UserPersonalData } from "../gql/User/user";

export const authenticateJWT = (
  originReq: any,
  res: Response
): Promise<UserPersonalData> => {
  const { req } = originReq;
  return new Promise((resolve, reject) => {
    passport.authenticate(
      "jwt",
      { session: false },
      (err, user: UserPersonalData) => {
        if (err) {
          reject(new Error(err));
        }
        resolve(user);
      }
    )(req, res);
  });
};
