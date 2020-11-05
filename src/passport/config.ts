import env from "../env";

const providers = ["google", "github"];
const callbacks = providers.map((provider) => {
  return env.node_env === "production"
    ? `https://react-auth-twitter.herokuapp.com/${provider}/callback`
    : `http://localhost:4000/${provider}/callback`;
});
const [googleCallbackURL, githubCallbackURL] = callbacks;

export { googleCallbackURL, githubCallbackURL };
