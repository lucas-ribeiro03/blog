"use server";

import { drizzleDb } from "@/db";
import { categoriesTable } from "@/db/schemas";
import { postRepository } from "@/repositories/post";
import { eq } from "drizzle-orm";
import z from "zod";
import { generateUniqueSlug } from "@/utils/slug-generator";
import { verifyLogin } from "@/utils/manage-login";
import { Post } from "@/model/post";
import { revalidateTag } from "next/cache";

const postSchema = z.object({
  title: z.string().min(1),
  excerpt: z.string().min(1).max(300),
  content: z.string().min(50),
  coverImageUrl: z.string().optional(),
  category: z.string().min(1),
});

export const updatePostAction = async (post: Post, formData: FormData) => {
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
      message: "Erro na validação do formulário",
    };
  }

  const { title, excerpt, content, coverImageUrl, category } =
    validatedObjects.data;

  const authorId = await verifyLogin();

  if (!authorId.payload) {
    return {
      success: false,
      message: "Você precisa estar logado para criar um post",
    };
  }

  if (!authorId.payload.sub) {
    return {
      success: false,
      message: "Você precisa estar logado para criar um post",
    };
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

  await postRepository.updatePost({
    title,
    excerpt,
    content,
    coverImage: coverImageUrl ? coverImageUrl : post.coverImage,
    authorId: post.authorId,
    id: post.id,
    slug: title === post.title ? post.slug : generateUniqueSlug(title),
    categoryId,
    updatedAt: Date.now(),
    createdAt: post.createdAt,
  });

  revalidateTag("posts", "max");
  revalidateTag("post", "max");
};
