import express from "express";
import { githubAuth, githubController } from "./passport/github";
import { googleAuth, googleController } from "./passport/google";

const router = express.Router();

router.get("/github", githubAuth);
router.get("/github/callback", githubAuth, githubController);
router.get("/google", googleAuth);
router.get("/google/callback", googleAuth, googleController);

export default router;
