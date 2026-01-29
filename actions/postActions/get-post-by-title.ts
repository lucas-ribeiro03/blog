"use server";

import { postRepository } from "@/repositories/post";

export const getPostByTitle = async (title: string) => {
  if (!title) {
    // return { success: false, message: "Insira o título da publicação" };
  }

  const post = await postRepository.getPostByTitle(title);

  return post;
};
