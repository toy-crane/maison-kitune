import env from "../src/env";
import cookieParser from "cookie-parser";
import passport from "passport";
import router from "../src/router";
import passportInit from "../src/passport/passport.init";
import { authenticateJWT } from "../src/passport/jwt";
import express from "express";
import cors from "cors";

// express server 초기화
const app = express();

// express 미들웨어 순서 중요!
// passport 관련 초기화
passportInit();
app.use(passport.initialize());
// request에 req.cookies 만들어주는 미들웨어
app.use(cookieParser());
// request에 req.decodedUser 만들어주는 jwt 인증 미들웨어
app.use(authenticateJWT);
// router 추가
app.use("/", router);
// cors option 추가
const corsOptions = {
  origin: [env.client_url],
  credentials: true,
};
app.use(cors(corsOptions));

export default app;
