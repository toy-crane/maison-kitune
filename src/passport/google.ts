import passport from "passport";
import env from "../env";
import { googleCallbackURL } from "./config";

const GOOGLE_CONFIG = {
  clientID: env.google_client_id,
  clientSecret: env.google_secret,
  callbackURL: googleCallbackURL,
};

const googleAuth = passport.authenticate("google", {
  scope: ["email", "profile"],
});
const googleController = (req: any, res: any) => {
  const user = {
    name: req.user.displayName,
    photo: req.user.photos[0].value.replace(/sz=50/gi, "sz=250"),
    email: req.user.emails[0].value,
  };
  const socketId = req.session.socketId;
  console.log({ socketId, user });
  res.end();
};

export { googleAuth, googleController, GOOGLE_CONFIG };
