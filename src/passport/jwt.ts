import passport from "passport";
import { Response } from "express";
import { Strategy as JWTStrategy, VerifiedCallback } from "passport-jwt";
import { prisma } from "../context";
import { UserPersonalData } from "../gql/User/user";
import { JWT_CONFIG } from "./config";

const verifyUser: VerifiedCallback = async (payload, done) => {
  try {
    const user = await prisma.user.findOne({
      where: { id: payload.id },
    });
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (err) {
    return done(err, false);
  }
};

passport.use(new JWTStrategy(JWT_CONFIG, verifyUser));
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
