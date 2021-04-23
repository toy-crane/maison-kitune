import { config } from "dotenv";
import path from "path";

config();
if (process.env.NODE_ENV === "production") {
  config({ path: path.join(__dirname, "../../.env.production") });
} else if (process.env.NODE_ENV === "development") {
  config({ path: path.join(__dirname, "../../.env.development") });
} else if (process.env.NODE_ENV === "local") {
  config({ path: path.join(__dirname, "../../.env.local") });
} else {
  throw new Error("NODE_ENV 환경 변수가 없습니다.");
}

export default {
  node_env: process.env.NODE_ENV || "develop",
  port: process.env.PORT || 4000,
  jwt_secret: process.env.JWT_SECRET || "",
  nodemailer_user: process.env.NODEMAILER_USER || "",
  nodemailer_password: process.env.NODEMAILER_PASSWORD || "",
  origin: process.env.ORIGIN || "",
  client_url: process.env.CLIENT_URL || "",
  session_secret: process.env.SESSION_SECRET || "SESSION_SECRET",
  google_client_id: process.env.GOOGLE_CLIENT_ID || "",
  google_secret: process.env.GOOGLE_SECRET || "",
  github_client_id: process.env.GITHUB_CLIENT_ID || "",
  github_secret: process.env.GITHUB_SECRET || "",
  jwt_max_age: process.env.JWT_MAX_AGE || "",
};
