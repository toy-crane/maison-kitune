import passport from "passport";
import { Response, Request, NextFunction } from "express";
import { UserPersonalData } from "../gql/User/user";
import { ExtractJwt } from "passport-jwt";
import env from "../env";

const JWT_CONFIG = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: env.jwt_secret,
};

const authenticateJWT = (req: Request, res: Response, next: NextFunction) =>
  passport.authenticate(
    "jwt",
    { session: false },
    (err, user: UserPersonalData) => {
      if (user) {
        req.user = user;
      }
      next();
    }
  )(req, res, next);

export { authenticateJWT, JWT_CONFIG };
