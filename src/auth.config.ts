import dotenv from "dotenv";
import { Strategy as GoogleStrategy, Profile } from "passport-google-oauth20";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

dotenv.config();

const prisma = new PrismaClient();

export const generateAccessToken = (user: { id: number; email: string }) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.JWT_SECRET!,
    {
      expiresIn: "1h",
    },
  );
};

export const generateRefreshToken = (user: { id: number }) => {
  return jwt.sign(
    {
      id: user.id,
    },
    process.env.JWT_SECRET!,
    {
      expiresIn: "14d",
    },
  );
};

const googleVerify = async (profile: Profile) => {
  const email = profile.emails?.[0]?.value;

  if (!email) {
    throw new Error("Google 프로필에서 이메일을 가져올 수 없습니다.");
  }

  let user = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (!user) {
    user = await prisma.user.create({
      data: {
        email,
        name: profile.displayName,
      },
    });
  }

  return {
    id: user.id,
    email: user.email!,
    name: user.name,
  };
};

export const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.PASSPORT_GOOGLE_CLIENT_ID!,
    clientSecret: process.env.PASSPORT_GOOGLE_CLIENT_SECRET!,
    callbackURL: "http://localhost:3000/oauth2/callback/google",
    scope: ["email", "profile"],
  },
  async (_accessToken, _refreshToken, profile: Profile, cb) => {
    try {
      const user = await googleVerify(profile);

      const tokens = {
        accessToken: generateAccessToken(user),
        refreshToken: generateRefreshToken(user),
      };

      return cb(null, tokens);
    } catch (err) {
      return cb(err as Error);
    }
  },
);
