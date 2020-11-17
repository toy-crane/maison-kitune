import passport from "passport";
import env from "../env";
import { githubCallbackURL } from "./config";
import { prisma } from "../context";
import createJWT from "../utils/auth/createJWT";
import createRandomToken from "../utils/auth/createSecret";

const GITHUB_CONFIG = {
  clientID: env.github_client_id,
  clientSecret: env.github_secret,
  callbackURL: githubCallbackURL,
  scope: ["user:email"],
};

const githubAuth = passport.authenticate("github", {
  scope: ["user:email"],
});
const githubController = async (req: any, res: any) => {
  const githubId = req.user.id;
  const photo = req.user.photos[0].value;
  const email = req.user.emails[0].value;
  let user, token;
  const userExists = await prisma.user.findOne({
    where: {
      email,
    },
  });
  if (userExists) {
    if (userExists.githubId !== githubId) {
      res.status(500).json({
        error: "이미 다른 소셜 로그인으로 회원 가입이 되어있는 이메일입니다.",
      });
    } else {
      user = userExists;
      token = createJWT(user.id, user.email);
    }
  } else {
    try {
      const refreshToken = createRandomToken();
      user = await prisma.user.create({
        data: {
          email,
          githubId,
          isActive: false,
          refreshToken,
          profile: {
            create: {
              avatar: photo,
            },
          },
        },
      });
      res.cookie("refreshToken", refreshToken, { httpOnly: true });
      // 처음 요청한 페이지로 redirect
      res.redirect(302, env.client_url);
      res.end();
    } catch (e) {
      res.status(500).json({
        error: e.message,
      });
      res.end();
    }
  }
};

export { githubAuth, githubController, GITHUB_CONFIG };
