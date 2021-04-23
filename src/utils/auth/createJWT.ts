import * as jwt from "jsonwebtoken";
import { env } from "../../config";

export default (id: number, email: string): string => {
  const JWT_SECRET = env.jwt_secret;
  return jwt.sign({ id, email }, JWT_SECRET, { expiresIn: env.jwt_max_age });
};
