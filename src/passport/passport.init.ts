import passport from "passport";
import { Strategy as GithubStrategy } from "passport-github2";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { GITHUB_CONFIG } from "./github";
import { GOOGLE_CONFIG } from "./google";

// Oauth에서 사용하는 콜백
const OauthCallback = (_: String, __: String, profile: any, cb: any) =>
  cb(null, profile);

export default () => {
  passport.serializeUser((user, cb) => cb(null, user));
  passport.deserializeUser((obj: any, cb) => cb(null, obj));
  passport.use(new GithubStrategy(GITHUB_CONFIG, OauthCallback));
  passport.use(new GoogleStrategy(GOOGLE_CONFIG, OauthCallback));
};
