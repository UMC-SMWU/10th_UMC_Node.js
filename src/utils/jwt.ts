import crypto from "crypto";

interface JwtPayload {
  id?: number;
  userId?: number;
  sub?: string | number;
  exp?: number;
}

const getJwtSecret = () => process.env.JWT_SECRET ?? "umc-jwt-secret";

const decodeBase64Url = (value: string) =>
  Buffer.from(value, "base64url").toString("utf8");

export const verifyJwt = (token: string): JwtPayload => {
  const [encodedHeader, encodedPayload, signature] = token.split(".");

  if (!encodedHeader || !encodedPayload || !signature) {
    throw new Error("Invalid token");
  }

  const expectedSignature = crypto
    .createHmac("sha256", getJwtSecret())
    .update(`${encodedHeader}.${encodedPayload}`)
    .digest("base64url");

  if (signature !== expectedSignature) {
    throw new Error("Invalid token signature");
  }

  const payload = JSON.parse(decodeBase64Url(encodedPayload)) as JwtPayload;

  if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
    throw new Error("Expired token");
  }

  return payload;
};

export const getUserIdFromJwtPayload = (payload: JwtPayload): number => {
  const userId = payload.userId ?? payload.id ?? payload.sub;
  const parsedUserId =
    typeof userId === "string" ? Number.parseInt(userId, 10) : userId;

  if (!parsedUserId || Number.isNaN(parsedUserId)) {
    throw new Error("Token does not contain user id");
  }

  return parsedUserId;
};
