import { Request } from "express";

export interface AuthUser {
  id: number;
}

export interface AuthRequest extends Request {
  user?: AuthUser;
}
