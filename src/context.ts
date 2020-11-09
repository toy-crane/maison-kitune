import { PrismaClient } from "@prisma/client";
import e from "cors";
import { Request, Response } from "express";
import { UserPersonalData } from "./types/types";

export const prisma = new PrismaClient();
export interface Context {
  prisma: PrismaClient;
  req: Request;
  res: Response;
  user: UserPersonalData | null;
}

function getUser(req: any) {
  // socket과 일반 graphql간에 request type이 달라서 분기처리 해야함.
  if (req.request && req.request.user) {
    return req.request.user;
  } else {
    return null;
  }
}

export async function createContext(
  req: Request,
  res: Response
): Promise<Context> {
  const context = {
    prisma,
    req,
    res,
    user: getUser(req),
  };
  return context;
}
