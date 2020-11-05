import passport from "passport";
import { Strategy as JWTStrategy, VerifiedCallback } from "passport-jwt";
import { Strategy as GithubStrategy } from "passport-github2";
import { prisma } from "../context";
import { GITHUB_CONFIG, JWT_CONFIG } from "./config";

export default () => {
  // session에서 user를 사용하도록 함
  passport.serializeUser((user, cb) => cb(null, user));
  passport.deserializeUser((obj, cb) => cb(null, obj));
  // Oauth에서 사용하는 콜백
  const OauthCallback = (
    accessToken: String,
    refreshToken: String,
    profile: any,
    cb: any
  ) => cb(null, profile);
  // JWT에서 사용하는 콜백
  const jwtCallback: VerifiedCallback = async (payload, cb) => {
    try {
      const user = await prisma.user.findOne({
        where: { id: payload.id },
      });
      if (user) {
        return cb(null, user);
      } else {
        return cb(null, false);
      }
    } catch (err) {
      return cb(err, false);
    }
  };

  passport.use(new GithubStrategy(GITHUB_CONFIG, OauthCallback));
  passport.use(new JWTStrategy(JWT_CONFIG, jwtCallback));
};
