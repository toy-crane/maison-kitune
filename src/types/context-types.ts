import { PrismaClient } from "@prisma/client";
import Cookies from "cookies";
import { Request, Response } from "express";
import { UserModel } from "./models-types";

export interface Context {
  prisma: PrismaClient;
  req: Request;
  res: Response;
  user: UserModel | null;
  cookies: Cookies;
}
