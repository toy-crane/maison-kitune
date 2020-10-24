import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { UserPersonalData } from "./gql/User/user";
import getUser from "./utils/auth/getUser";

export const prisma = new PrismaClient();
export interface Context {
  prisma: PrismaClient;
  req: Request;
  res: Response;
  user: UserPersonalData;
}

export async function createContext(
  req: Request,
  res: Response
): Promise<Context> {
  const context = { prisma, req, res, user: await getUser(req, res) };
  return context;
}
