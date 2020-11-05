import { config } from "dotenv";
import { resolve } from "path";
config({ path: resolve(__dirname, ".env") });

export default {
  port: process.env.PORT || 4000,
  jwt_secret: process.env.JWT_SECRET || "",
  nodemailer_user: process.env.NODEMAILER_USER || "",
  nodemailer_password: process.env.NODEMAILER_PASSWORD || "",
  origin: process.env.ORIGIN || "",
  client_url: process.env.CLIENT_URL || "",
  session_secret: process.env.SESSION_SECRET || "",
  google_client_id: process.env.GOOGLE_CLIENT_ID || "",
  google_secret: process.env.GOOGLE_SECRET || "",
  github_client_id: process.env.GITHUB_CLIENT_ID || "",
  github_secret: process.env.GITHUB_SECRET || "",
};
