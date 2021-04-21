import { PrismaClient } from "@prisma/client";
import { Context } from "./types/context-types";
import { Request, Response } from "express";
import { UserModel } from "./types/models-types";
import jwt from "jsonwebtoken";
import env from "./env";

export const prisma = new PrismaClient();

function getUser(req: Request): UserModel | null {
  const header = req.headers.authorization || "";
  if (header) {
    const token = header.replace("Bearer ", "");
    const decoded = jwt.verify(token, env.jwt_secret);
    return decoded;
  } else {
    return null;
  }
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
