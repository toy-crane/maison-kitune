import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import Cookies from "cookies";
import jwt from "jsonwebtoken";
import env from "./env";

export const prisma = new PrismaClient();

async function getUser(req: Request) {
  console.log(req.headers.cookie);
  const header = req.headers.authorization || "";
  if (header) {
    const token = header.replace("Bearer ", "");
    const decoded: any = jwt.verify(token, env.jwt_secret);
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });
    return user;
  } else {
    return null;
  }
}

export async function createContext({
  req,
  res,
}: {
  req: Request;
  res: Response;
}) {
  const context = {
    prisma,
    req: req,
    res: res,
    user: await getUser(req),
    cookies: new Cookies(req, res),
  };
  return context;
}
