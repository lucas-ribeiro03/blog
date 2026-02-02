"use server";

import { drizzleDb } from "@/db";
import { categoriesTable } from "@/db/schemas";
import { postRepository } from "@/repositories/post";
import { verifyLogin } from "@/utils/manage-login";
import { generateUniqueSlug } from "@/utils/slug-generator";
import { eq } from "drizzle-orm";
import { revalidateTag } from "next/cache";
import { v4 as uuidv4 } from "uuid";
import z from "zod";
import fs from "fs";
import path from "path";

const postSchema = z.object({
  title: z.string().min(1),
  excerpt: z.string().min(1).max(300),
  content: z.string().min(50),
  category: z.string().min(1),
  coverImage: z.instanceof(File),
});

export default async function createPostAction(formData: FormData) {
  const validatedObjects = postSchema.safeParse({
    title: formData.get("title")?.toString().trim(),
    excerpt: formData.get("excerpt")?.toString().trim(),
    content: formData.get("content")?.toString().trim(),
    category: formData.get("category")?.toString().trim(),
    coverImage: formData.get("coverImage") as File,
  });

  if (!validatedObjects.success) {
    return {
      success: false,
      message: "Erro na validação do formulário",
    };
  }

  const { title, excerpt, content, coverImage, category } =
    validatedObjects.data;

  if (!coverImage) {
    return;
  }

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

  if (!coverImage) {
    return {
      success: false,
      message: "Imagem de capa não enviada",
    };
  }

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

  await postRepository.createPost({
    title,
    excerpt,
    content,
    coverImage: imageUrl,
    authorId: authorId.payload.sub,
    id: uuidv4(),
    slug: generateUniqueSlug(title),
    categoryId,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  });

  revalidateTag("posts", "max");
  revalidateTag("post", "max");
}
