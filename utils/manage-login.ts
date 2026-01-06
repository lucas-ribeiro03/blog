import { SignJWT } from "jose";
import { cookies } from "next/headers";

type JwtPayload = {
  sub: string;
  username: string;
  role: string;
};

const jwtEncodeKey = new TextEncoder().encode(process.env.JWT_SECRET);

export const signJwt = async (jwtPayload: JwtPayload) => {
  return new SignJWT(jwtPayload)
    .setProtectedHeader({
      alg: "HS256",
      typ: "JWT",
    })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(jwtEncodeKey);
};

export const createLoginSession = async (userInfo: JwtPayload) => {
  const loginSession = await signJwt(userInfo);
  const cookieStore = await cookies();
  cookieStore.set("loginSession", loginSession, {
    expires: new Date(Date.now() + 604800 * 1000),
    httpOnly: true,
    sameSite: "strict",
    secure: true,
  });
};
