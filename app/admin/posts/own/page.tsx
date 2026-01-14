import { postRepository } from "@/repositories/post";
import { verifyLogin } from "@/utils/manage-login";
import { Suspense } from "react";
import { PostCard } from "@/components/post-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Plus, FileText } from "lucide-react";
import Link from "next/link";

export const GetOwnPosts = async () => {
  const user = await verifyLogin();
  const userId = user.payload.sub;
  if (!userId) throw new Error("Usuário não encontrado");
  const posts = await postRepository.getPostByAuthor(userId);

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold bg-linear-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
          Meus Posts
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Gerencie todos os seus artigos publicados
        </p>

        {/* Stats Cards */}
        <div className="block max-w-2xs gap-4 mx-auto mt-8">
          <Card className="bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800">
            <CardContent className="p-4 text-center">
              <FileText
                className="h-8 w-8 mx-auto mb-2 text-blue-600 dark:text-blue-400"
                aria-hidden="true"
              />
              <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                {posts.length}
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Posts Publicados
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex justify-center">
        <Button className="bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
          <Link href="/admin/posts/new" className="flex items-center gap-2">
            <Plus className="h-5 w-5" aria-hidden="true" />
            Criar Novo Post
          </Link>
        </Button>
      </div>

      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              category={post.category || "Sem categoria"}
              author={post.author || "Autor"}
              className="h-full"
            />
          ))}
        </div>
      ) : (
        <Card className="bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800">
          <CardContent className="p-12 text-center">
            <FileText
              className="h-16 w-16 mx-auto mb-4 text-slate-400 dark:text-slate-600"
              aria-hidden="true"
            />
            <CardTitle className="text-xl mb-2 text-slate-900 dark:text-slate-100">
              Nenhum post encontrado
            </CardTitle>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Você ainda não publicou nenhum artigo. Que tal criar o primeiro?
            </p>
            <Button
              asChild
              className="bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
            >
              <Link
                href="/admin/posts/create"
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" aria-hidden="true" />
                Criar Primeiro Post
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default async function OwnPostsPage() {
  return (
    <main className="container mx-auto px-4 py-12">
      <Suspense
        fallback={
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <div className="h-10 bg-slate-800 rounded-lg animate-pulse max-w-md mx-auto"></div>
              <div className="h-6 bg-slate-800 rounded animate-pulse max-w-lg mx-auto"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-24 bg-slate-800 rounded-lg animate-pulse"
                ></div>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="h-80 bg-slate-800 rounded-lg animate-pulse"
                ></div>
              ))}
            </div>
          </div>
        }
      >
        <GetOwnPosts />
      </Suspense>
    </main>
  );
}
