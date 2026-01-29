"use server";

import { userRepository } from "@/repositories/users";
import { verifyLogin } from "@/utils/manage-login";
import z from "zod";

const userSchema = z.object({
  name: z.string().min(1),
  lastName: z.string().min(1),
  username: z.string().min(1),
});
export const updateUserAction = async (formData: FormData) => {
  const validatedFields = userSchema.safeParse({
    name: formData.get("name")?.toString().trim(),
    lastName: formData.get("last_name")?.toString().trim(),
    username: formData.get("username")?.toString().trim(),
  });

  if (!validatedFields.success)
    return {
      success: false,
      message: "Dados inválidos",
    };

  const { name, lastName, username } = validatedFields.data;

  if (!name || !lastName || !username)
    return {
      success: false,
      message: "Preencha todos os campos",
    };

  const user = await verifyLogin();
  if (!user || typeof user === "string")
    return {
      success: false,
      message: "Usuário não está logado",
    };

  const { sub } = user.payload;
  if (!sub) throw new Error("Erro inesperado, tente novamente mais tarde");
  await userRepository.updateUser(sub);
  return {
    success: true,
    message: "ok",
  };
};
