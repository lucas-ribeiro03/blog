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
import path from "path";
import fs from "fs";

const postSchema = z.object({
  title: z.string().min(1),
  excerpt: z.string().min(1).max(300),
  content: z.string().min(50),
  coverImage: z.instanceof(File),
  category: z.string().min(1),
});

export const updatePostAction = async (post: Post, formData: FormData) => {
  console.log(formData.get("coverImage") as File);
  const validatedObjects = postSchema.safeParse({
    title: formData.get("title")?.toString().trim(),
    excerpt: formData.get("excerpt")?.toString().trim(),
    content: formData.get("content")?.toString().trim(),
    coverImage: formData.get("coverImage") as File,
    category: formData.get("category")?.toString().trim(),
  });

  if (!validatedObjects.success) {
    console.log("ERRO", validatedObjects.error);
    return {
      success: false,
      message: "Erro na validação do formulário",
    };
  }

  const { title, excerpt, content, coverImage, category } =
    validatedObjects.data;

  const bytes = await coverImage.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const uploadDir = path.join(process.cwd(), "public/uploads");
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const fileName = `${Date.now()}-${coverImage.name}`;
  const filePath = path.join(uploadDir, fileName.toLowerCase());
  fs.writeFileSync(filePath, buffer);

  const imageUrl = `/uploads/${fileName}`;
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
    coverImage: imageUrl,
    authorId: post.authorId,
    id: post.id,
    slug: title === post.title ? post.slug : generateUniqueSlug(title),
    categoryId,
    updatedAt: Date.now(),
    createdAt: post.createdAt,
  });

  revalidateTag(`post-${post.slug}`, "max");
};
