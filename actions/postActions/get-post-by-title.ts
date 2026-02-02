"use server";

import { postRepository } from "@/repositories/post";

export const getPostByTitle = async (title: string) => {
  const post = await postRepository.getPostByTitle(title);

  return post;
};
