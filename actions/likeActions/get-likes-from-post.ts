"use server";

import { likesRepository } from "@/repositories/likes";
import { postRepository } from "@/repositories/post";
import { verifyLogin } from "@/utils/manage-login";

export const getLikesFromPostAction = async () => {
  const posts = await postRepository.getPosts();
  if (typeof posts === "string") return;

  const postIds = posts.map((p) => p.id);
  const user = await verifyLogin();
  const { sub } = user.payload;
  if (!sub) return;
  const likes = await likesRepository.getLikesOnPost(postIds, sub);

  return likes;
};
