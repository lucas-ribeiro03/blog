"use server";

import { likesRepository } from "@/repositories/likes";
import { verifyLogin } from "@/utils/manage-login";
import { revalidateTag } from "next/cache";

export const likeAction = async (postId: string) => {
  const user = await verifyLogin();
  if (!user)
    return {
      error: true,
      message: "Usuário não está logado",
    };

  const userId = user.payload.sub;
  if (!userId) {
    return {
      error: true,
      message: "Erro ao curtir o post",
    };
  }

  try {
    await likesRepository.like(userId, postId);
  } catch (e) {
    console.log(e);
    return {
      error: true,
      message: "Erro ao curtir o post, tente novamente mais tarde",
    };
  }
};
