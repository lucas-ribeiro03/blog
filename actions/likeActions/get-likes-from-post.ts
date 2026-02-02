"use server";

import { likesRepository } from "@/repositories/likes";

export const getLikesFromPostAction = async (postId: string) => {
  const likes = await likesRepository.getLikesOnPost(postId);

  return likes;
};
