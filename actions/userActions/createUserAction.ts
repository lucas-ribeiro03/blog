"use server";

import { verifyUsername } from "@/utils/verifyUsername";
import { userRepository } from "@/repositories/users";
import z from "zod";

type ActionStateProps = {
  success: boolean;
  message: string;
};

const registerSchema = z.object({
  name: z.string(),
  lastName: z.string(),
  username: z.string(),
  password: z.string(),
});

export default async function createUserAction(
  prevState: ActionStateProps,
  formData: FormData,
) {
  try {
    const validatedFields = registerSchema.safeParse({
      name: formData.get("name")?.toString().trim(),
      lastName: formData.get("last_name")?.toString().trim(),
      username: formData.get("username")?.toString().trim(),
      password: formData.get("password")?.toString().trim(),
    });

    if (!validatedFields.success)
      return {
        success: false,
        message: "Dados inválidos",
      };

    const { name, lastName, username, password } = validatedFields.data;

    const verify = await verifyUsername(username);
    if (!verify)
      return {
        success: false,
        message: "Nome de usuário já existe",
      };

    await userRepository.createUser(name, lastName, username, password);

    return {
      success: true,
      message: "Login realizado",
    };
  } catch (e) {
    console.log("Erro ao criar usuário", e);
    return {
      success: false,
      message: "Erro: " + e,
    };
  }
}
