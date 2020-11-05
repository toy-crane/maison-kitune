import passport from "passport";
import env from "../env";
import { githubCallbackURL } from "./config";

const GITHUB_CONFIG = {
  clientID: env.github_client_id,
  clientSecret: env.github_secret,
  callbackURL: githubCallbackURL,
  scope: ["user:email"],
};

const githubAuth = passport.authenticate("github", { scope: ["user:email"] });
const githubController = (req: any, res: any) => {
  const user = {
    name: req.user.username,
    photo: req.user.photos[0].value,
    email: req.user.emails[0].value,
  };
  const socketId = req.session.socketId;
  console.log({ socketId, user });
  res.end();
};

export { githubAuth, githubController, GITHUB_CONFIG };
