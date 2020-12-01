import passport from "passport";
import env from "../env";
import { googleCallbackURL } from "./config";
import { prisma } from "../context";
import createRandomToken from "../utils/auth/createSecret";

const GOOGLE_CONFIG = {
  clientID: env.google_client_id,
  clientSecret: env.google_secret,
  callbackURL: googleCallbackURL,
};

const googleAuth = passport.authenticate("google", {
  scope: ["email", "profile"],
});
const googleController = async (req: any, res: any) => {
  const email = req.user.emails[0].value;
  const photo = req.user.photos[0].value;
  const googleId = req.user.id;
  let user;
  const userExists = await prisma.user.findOne({
    where: {
      email,
    },
  });
  const refreshToken = createRandomToken();
  if (userExists) {
    // 로그인 시 refresh token 신규 발급
    user = userExists;
    await prisma.user.update({
      where: { id: user.id },
      data: {
        refreshToken,
      },
    });
  } else {
    try {
      // 회원 가입 시, User 생성
      user = await prisma.user.create({
        data: {
          email,
          refreshToken,
          isActive: false,
          profile: {
            create: {
              avatar: photo,
              githubUrl: "none",
            },
          },
        },
      });
    } catch (e) {
      res.status(500).json({
        error: e.message,
      });
    }
  }
  res.cookie("refreshToken", refreshToken, { httpOnly: true });
  // 처음 요청한 페이지로 redirect
  res.redirect(302, env.client_url);
  res.end();
};

export { googleAuth, googleController, GOOGLE_CONFIG };
