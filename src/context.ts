import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { Context } from "./types/context-types";

export const prisma = new PrismaClient();

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
