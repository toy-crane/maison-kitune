import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { Context } from "./types/context-types";
import { ContextParameters } from "graphql-yoga/dist/types";

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
  req: ContextParameters,
  res: Response
): Promise<Context> {
  // graphql yoga req에서 request만 꺼냄
  const context = {
    prisma,
    req: req.request,
    res,
    user: getUser(req),
  };
  return context;
}
