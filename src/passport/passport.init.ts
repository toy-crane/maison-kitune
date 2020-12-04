import passport from "passport";
import { Strategy as JWTStrategy, VerifiedCallback } from "passport-jwt";
import { Strategy as GithubStrategy } from "passport-github2";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { prisma } from "../context";
import { GITHUB_CONFIG } from "./github";
import { GOOGLE_CONFIG } from "./google";
import { JWT_CONFIG } from "./jwt";

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
    const user = await prisma.user.findUnique({
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

export default () => {
  passport.serializeUser((user, cb) => cb(null, user));
  passport.deserializeUser((obj, cb) => cb(null, obj));
  passport.use(new GithubStrategy(GITHUB_CONFIG, OauthCallback));
  passport.use(new GoogleStrategy(GOOGLE_CONFIG, OauthCallback));
  passport.use(new JWTStrategy(JWT_CONFIG, jwtCallback));
};
