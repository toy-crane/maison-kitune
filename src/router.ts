import express from "express";
import { Request, Response } from "express";

const router = express.Router();

// query paramter에서 socketId를 가져와서 session에 넣어주는 미들웨어
router.use((req: Request, res: Response, next) => {
  if (req.session && req.query.socketId) {
    req.session.socketId = req.query.socketId;
  }
  next();
});

router.get("/github", (req, res) => {
  res.send("github");
});
router.get("/google", (req, res) => {
  res.send("google");
});

export default router;
