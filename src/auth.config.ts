import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import {
  Strategy as GoogleStrategy,
  type Profile,
} from "passport-google-oauth20";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";

import { prisma } from "./db.config";

dotenv.config();

const jwtSecret = process.env.JWT_SECRET;

if (!jwtSecret) {
  throw new Error("JWT_SECRET is not defined");
}

export interface TokenUser {
  id: number;
  email: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export const generateAccessToken = (user: TokenUser): string => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    jwtSecret,
    { expiresIn: "1h" },
  );
};

export const generateRefreshToken = (user: { id: number }): string => {
  return jwt.sign(
    {
      id: user.id,
    },
    jwtSecret,
    { expiresIn: "14d" },
  );
};

export const googleVerify = async (profile: Profile) => {
  const email = profile.emails?.[0]?.value;

  if (!email) {
    throw new Error("Google profile email is missing");
  }

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  const user =
    existingUser ??
    (await prisma.user.create({
      data: {
        email,
        name: profile.displayName || email.split("@")[0],
        gender: "",
        birth: new Date("1970-01-01"),
        address: "",
        phoneNumber: "",
        nickname: profile.displayName || null,
      },
    }));

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    nickname: user.nickname,
  };
};

export const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.PASSPORT_GOOGLE_CLIENT_ID!,
    clientSecret: process.env.PASSPORT_GOOGLE_CLIENT_SECRET!,
    callbackURL: "http://localhost:3000/oauth2/callback/google",
  },
  async (_accessToken, _refreshToken, profile, done) => {
    try {
      const user = await googleVerify(profile);
      const tokens: AuthTokens = {
        accessToken: generateAccessToken(user),
        refreshToken: generateRefreshToken(user),
      };

      done(null, tokens);
    } catch (error) {
      done(error);
    }
  },
);

export const jwtStrategy = new JwtStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwtSecret,
  },
  async (payload, done) => {
    try {
      const user = await prisma.user.findUnique({
        where: { id: payload.id },
      });

      if (!user) {
        done(null, false);
        return;
      }

      done(null, user);
    } catch (error) {
      done(error, false);
    }
  },
);
