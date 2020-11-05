import passport from "passport";
import { Response } from "express";
import { UserPersonalData } from "../gql/User/user";
import { ExtractJwt } from "passport-jwt";
import env from "../env";

const JWT_CONFIG = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: env.jwt_secret,
};

const authenticateJWT = (
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

export { authenticateJWT, JWT_CONFIG };
