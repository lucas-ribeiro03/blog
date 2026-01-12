"use server";

import { drizzleDb } from "@/db";
import { categoriesTable } from "@/db/schemas";
import { postRepository } from "@/repositories/post";
import { verifyLogin } from "@/utils/manage-login";
import { generateUniqueSlug } from "@/utils/slug-generator";
import { eq } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";
import z from "zod";

const postSchema = z.object({
  title: z.string().min(1),
  excerpt: z.string().min(1).max(300),
  content: z.string().min(50),
  coverImageUrl: z.string().min(1),
  category: z.string().min(1),
});

export default async function createPostAction(formData: FormData) {
  const validatedObjects = postSchema.safeParse({
    title: formData.get("title")?.toString().trim(),
    excerpt: formData.get("excerpt")?.toString().trim(),
    content: formData.get("content")?.toString().trim(),
    coverImageUrl: formData.get("coverImageUrl")?.toString().trim(),
    category: formData.get("category")?.toString().trim(),
  });

  if (!validatedObjects.success) {
    return {
      success: false,
      message: validatedObjects,
    };
  }

  const { title, excerpt, content, coverImageUrl, category } =
    validatedObjects.data;

  if (!coverImageUrl) {
    return {
      success: false,
      message: "Imagem de capa não enviada",
    };
  }

  const authorId = await verifyLogin();

  if (!authorId.payload) {
    return {
      error: "erro",
    };
  }

  if (!authorId.payload.sub) {
    return "BURRO";
  }

  const getCategory = await drizzleDb.query.categories.findFirst({
    where: eq(categoriesTable.name, category),
  });

  if (!getCategory)
    return {
      success: false,
      message: "Categoria não existe",
    };

  const categoryId = getCategory.id;

  await postRepository.createPost({
    title,
    excerpt,
    content,
    coverImage: coverImageUrl,
    authorId: authorId.payload.sub,
    id: uuidv4(),
    slug: generateUniqueSlug(title),
    categoryId,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  });

  return "OK";
}
