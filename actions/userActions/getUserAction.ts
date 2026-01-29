"use server";

import { userRepository } from "@/repositories/users";
import { verifyLogin } from "@/utils/manage-login";

export const getUserAction = async () => {
  const getUser = await verifyLogin();
  const { sub } = getUser.payload;
  const user = userRepository.getUserById(sub ?? "");
  if (typeof user === "string") throw new Error(user);
  if (!user) throw new Error("Erro ao buscar informações do usuário");

  return user;
};
