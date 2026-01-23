"use server";

import { getLikesFromPost } from "@/lib/queries/public";

export const getLikesFromPostAction = async (postId: string) => {
  const likes = await getLikesFromPost(postId)

  return likes;
};
