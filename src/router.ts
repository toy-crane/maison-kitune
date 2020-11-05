import express from "express";
import { Request, Response } from "express";
import { githubAuth, githubController } from "./passport/github";
import { googleAuth, googleController } from "./passport/google";

const router = express.Router();

// query paramter에서 socketId를 가져와서 session에 넣어주는 미들웨어
router.use((req: Request, res: Response, next) => {
  if (req.session && req.query.socketId) {
    req.session.socketId = req.query.socketId;
  }
  next();
});

router.get("/github", githubAuth);
router.get("/github/callback", githubAuth, githubController);
router.get("/google", googleAuth);
router.get("/google/callback", googleAuth, googleController);

export default router;
