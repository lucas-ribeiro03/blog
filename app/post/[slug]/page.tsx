import { postRepository } from "@/repositories/post";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { SinglePost } from "@/components/single-post";
import { Navbar } from "@/components/navbar";
import { drizzleDb } from "@/db";
import { eq } from "drizzle-orm";
import { categoriesTable } from "@/db/schemas";

type PostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await postRepository.getPostBySlug(slug);

  if (typeof post === "string") {
    return {
      title: "Post não encontrado",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await postRepository.getPostBySlug(slug);

  if (typeof post === "string") notFound();
  const category = await drizzleDb.query.categories.findFirst({
    where: eq(categoriesTable.id, post.categoryId),
  });

  if (!category) return;

  // Por padrão, usuário não está logado
  const isLoggedIn = true;

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950">
      <Navbar isLoggedIn={isLoggedIn} />
      <main className="container mx-auto px-4 py-12">
        <SinglePost post={post} category={category.name} />
      </main>
    </div>
  );
}
