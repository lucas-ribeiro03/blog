"use server";

import { postRepository } from "@/repositories/post";

export const deletePostAction = async (id: string) => {
  await postRepository.deletePost(id);
};
