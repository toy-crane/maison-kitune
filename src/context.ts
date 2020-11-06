import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { UserPersonalData } from "./gql/User/user";

export const prisma = new PrismaClient();
export interface Context {
  prisma: PrismaClient;
  req: Request;
  res: Response;
  user: UserPersonalData;
}

export async function createContext(
  { request: req }: any,
  res: Response
): Promise<Context> {
  const context = {
    prisma,
    req,
    res,
    user: req.user,
  };
  return context;
}
