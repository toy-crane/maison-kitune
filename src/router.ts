import express from "express";

const router = express.Router();

// Routes that are triggered on the client
router.get("/github", (req, res) => {
  res.send("github");
});
router.get("/google", (req, res) => {
  res.send("google");
});

export default router;
