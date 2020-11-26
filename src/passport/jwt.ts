import passport from "passport";
import { Response, Request, NextFunction } from "express";
import { UserModel } from "../types/models-types";
import env from "../env";
import { ExtractJwt } from "passport-jwt";

const JWT_CONFIG = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: env.jwt_secret,
  ignoreExpiration: false,
  jsonWebTokenOptions: {
    maxAge: env.jwt_max_age,
  },
};

// express에서 사용하는 미들웨어
const authenticateJWT = (req: Request, res: Response, next: NextFunction) =>
  passport.authenticate("jwt", (err, user: UserModel, info, status) => {
    if (user) {
      req.decodedUser = user;
    } else if (info && info.name) {
      req.jwtError = info.name;
    }
    next();
  })(req, res, next);

export { authenticateJWT, JWT_CONFIG };
