import { ExtractJwt } from "passport-jwt";
import env from "../env";
const providers = ["google", "github"];

const callbacks = providers.map((provider) => {
  return env.node_env === "production"
    ? `https://react-auth-twitter.herokuapp.com/${provider}/callback`
    : `http://localhost:4000/${provider}/callback`;
});
const [googleURL, githubURL] = callbacks;

const GOOGLE_CONFIG = {
  clientID: env.google_client_id,
  clientSecret: env.google_secret,
  callbackURL: googleURL,
};

const GITHUB_CONFIG = {
  clientID: env.github_client_id,
  clientSecret: env.github_secret,
  callbackURL: githubURL,
  scope: ["user:email"],
};

const JWT_CONFIG = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: env.jwt_secret,
};

export { GOOGLE_CONFIG, GITHUB_CONFIG, JWT_CONFIG };
