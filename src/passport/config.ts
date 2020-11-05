import { ExtractJwt } from "passport-jwt";
import env from "../env";
const providers = ["google", "github"];

const callbacks = providers.map((provider) => {
  return process.env.NODE_ENV === "production"
    ? `https://react-auth-twitter.herokuapp.com/${provider}/callback`
    : `https://localhost:5000/${provider}/callback`;
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
};

const JWT_CONFIG = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: env.jwt_secret,
};

export { GOOGLE_CONFIG, GITHUB_CONFIG, JWT_CONFIG };
