import { PrismaClient } from "@prisma/client";
import { Context } from "./types/context-types";
import { Request, Response } from "express";
import { UserModel } from "./types/models-types";

export const prisma = new PrismaClient();

// JWT 미들웨어를 통해서 저장된 decodedUser를 return한다.
function getUser(req: Request): UserModel | null {
  return req.decodedUser;
}

export function createContext({
  req,
  res,
}: {
  req: Request;
  res: Response;
}): Context {
  const context = {
    prisma,
    req: req,
    res: res,
    user: getUser(req),
  };
  return context;
}
