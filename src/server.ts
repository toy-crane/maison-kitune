import "./env";
import cookieParser from "cookie-parser";
import passport from "passport";
import router from "./router";
import passportInit from "./passport/passport.init";
import env from "./env";
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
// router 추가
app.use("/", router);
// cors option 추가
const corsOptions = {
  origin: [env.client_url],
  credentials: true,
};
app.use(cors(corsOptions));

export default app;
