import * as jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;
export default (id: number, email: string): string => {
  return jwt.sign({ id, email }, JWT_SECRET, { expiresIn: "3d" });
};
