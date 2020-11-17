import { PrismaClient } from "@prisma/client";
import { Context } from "./types/context-types";
import { ContextParameters } from "graphql-yoga/dist/types";
import { Request } from "express";
import { UserModel } from "./types/models-types";

export const prisma = new PrismaClient();

// JWT 미들웨어를 통해서 저장된 decodedUser를 return한다.
function getUser(req: Request): UserModel | null {
  return req.decodedUser;
}

export function createContext(req: ContextParameters): Context {
  // graphql yoga req에서 request, response만 꺼냄
  const context = {
    prisma,
    req: req.request,
    res: req.response,
    user: getUser(req.request),
  };
  return context;
}
