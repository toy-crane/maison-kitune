import { ExtractJwt } from "passport-jwt";

const providers = ["google", "github"];

const callbacks = providers.map((provider) => {
  return process.env.NODE_ENV === "production"
    ? `https://react-auth-twitter.herokuapp.com/${provider}/callback`
    : `https://localhost:5000/${provider}/callback`;
});

const [googleURL, githubURL] = callbacks;

const GOOGLE_CONFIG = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_SECRET,
  callbackURL: googleURL,
};

const GITHUB_CONFIG = {
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_SECRET,
  callbackURL: githubURL,
};

const JWT_CONFIG = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

export { GOOGLE_CONFIG, GITHUB_CONFIG, JWT_CONFIG };
