import * as jwt from "jsonwebtoken";
import env from "../../env";

const JWT_SECRET = env.jwt_secret;
export default (id: number, email: string): string => {
  return jwt.sign({ id, email }, JWT_SECRET, { expiresIn: env.jwt_max_age });
};
