"use server";

import { getLikesFromUser } from "@/lib/queries/public";
import { verifyLogin } from "@/utils/manage-login";

export const getLikesAction = async (postId: string) => {
  const user = await verifyLogin();
  const userId = user.payload.sub;

  if (!userId) throw new Error('Usuário não logado');

  const getLike = await getLikesFromUser(postId, userId)
  return getLike
};
