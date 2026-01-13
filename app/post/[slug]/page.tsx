import { postRepository } from "@/repositories/post";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { SinglePost } from "@/components/single-post";
import { Navbar } from "@/components/navbar";
import { drizzleDb } from "@/db";
import { eq } from "drizzle-orm";
import { categoriesTable } from "@/db/schemas";
import { getPost } from "@/lib/queries/public";
import { Suspense } from "react";

type PostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

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

export const PostPageInner = async ({ params }: PostPageProps) => {
  const { slug } = await params;
  const post = await getPost(slug);
  if (typeof post !== "string")
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950">
        <Navbar />
        <main className="container mx-auto px-4 py-12">
          <SinglePost post={post} category={post.category || ""} />
        </main>
      </div>
    );
};

export default async function PostPage({ params }: PostPageProps) {
  return (
    <Suspense fallback={<p>Carregando...</p>}>
      <PostPageInner params={params} />
    </Suspense>
  );
}
