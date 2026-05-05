import "dotenv/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "./generated/prisma/index.js";

const adapter = new PrismaMariaDb(
  "mysql://root:1234@localhost:3306/umc_10th_mission5"
);

export const prisma = new PrismaClient({
  adapter,
  log: ["query", "info", "error", "warn"],
});