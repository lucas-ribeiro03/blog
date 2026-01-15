import { JWTPayload, JWTVerifyResult, SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type JwtPayload = {
  sub: string;
  username: string;
  role: string;
};

type VerifyLoginReturn = Promise<{
  isLogged: boolean;
  payload: JWTPayload;
}>;

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

export const verifyLogin = async (): VerifyLoginReturn => {
  const cookieStore = await cookies();
  const token = cookieStore.get("loginSession")?.value;
  if (!token) throw new Error("Usuário não está logado");

  try {
    const jwtPayload = await jwtVerify(token, jwtEncodeKey, {
      algorithms: ["HS256"],
    });

    if (!jwtPayload) {
      throw new Error("Erro na autenticação do usuário");
    }

    const { payload } = jwtPayload;

    return { isLogged: true, payload };
  } catch (e) {
    console.log(e);
    throw new Error("Erro inesperado, tente novamente mais tarde");
  }
};
