import passport from "passport";
import env from "../env";
import { googleCallbackURL } from "./config";
import { prisma } from "../context";
import createJWT from "../utils/auth/createJWT";

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
  let user, token;
  const userExists = await prisma.user.findOne({
    where: {
      email,
    },
  });
  if (userExists) {
    if (userExists.googleId !== googleId) {
      res.status(500).json({
        error: "이미 다른 소셜 로그인으로 회원 가입이 되어있는 이메일입니다.",
      });
    } else {
      user = userExists;
      token = createJWT(user.id, user.email);
    }
  } else {
    try {
      user = await prisma.user.create({
        data: {
          email,
          googleId,
          isActive: false,
          profile: {
            create: {
              avatar: photo,
            },
          },
        },
      });
      token = createJWT(user.id, user.email);
    } catch (e) {
      res.status(500).json({
        error: e.message,
      });
    }
  }
  res.cookie("token", token, { httpOnly: true });
  res.end();
};

export { googleAuth, googleController, GOOGLE_CONFIG };
