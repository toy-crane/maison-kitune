import { PrismaClient } from "@prisma/client";
import { Context } from "./types/context-types";
import { ContextParameters } from "graphql-yoga/dist/types";
import { Request } from "express";
import { UserModel } from "./types/models-types";

export const prisma = new PrismaClient();

async function getUser(req: Request): Promise<UserModel | null> {
  // header에 포함되어 있는 토큰을 기반으로 request에 user를 넣어준다.
  return req.decodedUser;
}

export async function createContext(req: ContextParameters): Promise<Context> {
  // graphql yoga req에서 request만 꺼냄
  const context = {
    prisma,
    req: req.request,
    res: req.response,
    user: await getUser(req.request),
  };
  return context;
}
