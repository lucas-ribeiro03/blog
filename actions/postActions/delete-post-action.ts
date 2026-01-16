"use server";

import { postRepository } from "@/repositories/post";
import { revalidateTag } from "next/cache";

export const deletePostAction = async (id: string) => {
  await postRepository.deletePost(id);
  revalidateTag("posts", "max");
  revalidateTag("post", "max");
};
