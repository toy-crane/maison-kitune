import express from "express";
import { githubAuth, githubController } from "./passport/github";
import { googleAuth, googleController } from "./passport/google";

const router = express.Router();

router.get("/api/github", githubAuth);
router.get("/api/github/callback", githubAuth, githubController);
router.get("/api/google", googleAuth);
router.get("/api/google/callback", googleAuth, googleController);
router.get("/api/health-check", function (_, res) {
  res.send("I`m find");
});

export default router;
