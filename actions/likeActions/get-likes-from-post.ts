"use server";

import { drizzleDb } from "@/db";
import { likesTable } from "@/db/schemas";
import { likesRepository } from "@/repositories/likes";
import { verifyLogin } from "@/utils/manage-login";
import { eq } from "drizzle-orm";

export const getLikesFromPostAction = async (postId: string) => {
  const likes = await likesRepository.getLikesOnPost(postId);

  return likes;
};
