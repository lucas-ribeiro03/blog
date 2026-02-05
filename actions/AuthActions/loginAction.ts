"use server";

import { createLoginSession } from "@/utils/manage-login";
import { verifyPassword } from "@/utils/verifyPassword";
import z from "zod";

const loginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

type ActionStateProps = {
  success: boolean;
  message: string;
};

export async function loginUserAction(
  prevState: ActionStateProps,
  formData: FormData,
) {
  try {
    const validatedFields = loginSchema.safeParse({
      username: formData.get("username"),
      password: formData.get("password"),
    });

    if (!validatedFields.success) {
      return {
        success: false,
        message: "Dados inválidos",
      };
    }

    const { username, password } = validatedFields.data;

    const verify = await verifyPassword(password, username);
    if (typeof verify === "string") {
      return {
        success: false,
        message: verify,
      };
    }

    if (!verify) {
      return {
        success: false,
        message: "Senha incorreta",
      };
    }

    const id = verify.id;
    await createLoginSession({ role: verify.role, username, sub: id });
    return {
      success: true,
      message: "Login realizado",
    };
  } catch (e) {
    console.log("Erro ao criar sessão", e);
    return {
      success: false,
      message: "Erro inesperado. Tente novamente mais tarde",
    };
  }
}
