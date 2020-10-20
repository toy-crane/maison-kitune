import { authenticateJWT } from "../../passport/jwt";
import { Request, Response } from "express";
import { UserPersonalData } from "../../gql/User/user";

export default async (
  req: Request,
  res: Response
): Promise<UserPersonalData> => {
  try {
    return await authenticateJWT(req, res);
  } catch (e) {
    throw new Error(e);
  }
};
