import passport from "passport";
import env from "../env";
import { githubCallbackURL } from "./config";
import { prisma } from "../context";
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
  let user;
  const userExists = await prisma.user.findOne({
    where: {
      email,
    },
  });
  const refreshToken = createRandomToken();
  if (userExists) {
    if (userExists.githubId !== githubId) {
      res.status(500).json({
        error: "이미 다른 소셜 로그인으로 회원 가입이 되어있는 이메일입니다.",
      });
    } else {
      // 로그인 시, refresh token 신규 생성
      user = userExists;
      await prisma.user.update({
        where: { id: user.id },
        data: {
          refreshToken,
        },
      });
    }
  } else {
    try {
      // 회원 가입 시, 유저 생성
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
    } catch (e) {
      res.status(500).json({
        error: e.message,
      });
      res.end();
    }
  }
  res.cookie("refreshToken", refreshToken, { httpOnly: true });
  // 처음 요청한 페이지로 redirect
  res.redirect(302, `${env.client_url}/activate`);
  res.end();
};

export { githubAuth, githubController, GITHUB_CONFIG };
