import passport from "passport";

const githubAuth = passport.authenticate("github", { scope: ["user:email"] });
const githubController = (req: any, res: any) => {
  console.log(req.user);
  const user = {
    name: req.user.username,
    photo: req.user.photos[0].value,
    email: req.user.emails[0].value,
  };
  const socketId = req.session.socketId;
  console.log({ socketId, user });
  res.end();
};

export { githubAuth, githubController };
