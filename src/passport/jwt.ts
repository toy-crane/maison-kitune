import passport from "passport";
import { Response, Request, NextFunction } from "express";
import { UserPersonalData } from "../types/types";
import env from "../env";

const JWT_CONFIG = {
  jwtFromRequest: function (req) {
    let token = null;
    if (req && req.cookies) {
      token = req.cookies["token"];
    }
    return token;
  },
  secretOrKey: env.jwt_secret,
};

const authenticateJWT = (req: Request, res: Response, next: NextFunction) =>
  passport.authenticate(
    "jwt",
    { session: false },
    (err, user: UserPersonalData) => {
      if (user) {
        req.user = user;
      } else {
        console.log(err);
      }
      next();
    }
  )(req, res, next);

export { authenticateJWT, JWT_CONFIG };
