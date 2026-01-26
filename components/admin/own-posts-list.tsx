"use client";

import { PostCard } from "@/components/post-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Plus, FileText, Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import { Post } from "@/model/post";
import { useState } from "react";
import { ConfirmationDialog } from "../confirmation-dialog";

type OwnPostsListProps = {
  posts: Post[];
} & React.ComponentProps<"div">;

export const OwnPostsList = ({
  posts,
  className,
  ...props
}: OwnPostsListProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [postId, setPostId] = useState<string>("");

  return (
    <div className={`space-y-8 ${className || ""}`} {...props}>
      {/* Header Section */}
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
            <div key={post.id} className="relative group">
              <PostCard post={post} className="h-full" />

              {/* Admin Actions - Only visible on hover */}
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-1 z-10">
                <Link href={`/admin/posts/update/${post.id}`}>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="h-8 w-8 p-0 bg-slate-100 dark:bg-slate-800 hover:bg-blue-100 dark:hover:bg-blue-900 border border-slate-300 dark:border-slate-600"
                    title="Editar post"
                    aria-label="Editar post"
                  >
                    <Edit
                      className="h-4 w-4 text-blue-600 dark:text-blue-400"
                      aria-hidden="true"
                    />
                  </Button>
                </Link>
                <Button
                  size="sm"
                  variant="destructive"
                  className="h-8 w-8 p-0"
                  title="Excluir post"
                  aria-label="Excluir post"
                  onClick={() => {
                    setIsDialogOpen(true);
                    setPostId(post.id);
                  }}
                >
                  <Trash2 className="h-4 w-4" aria-hidden="true" />
                </Button>
              </div>
            </div>
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
            <Button className="bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
              <Link href="/admin/posts/new" className="flex items-center gap-2">
                <Plus className="h-4 w-4" aria-hidden="true" />
                Criar Primeiro Post
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
      <ConfirmationDialog
        isDialogOpen={isDialogOpen}
        closeDialog={() => setIsDialogOpen(false)}
        id={postId}
      />
    </div>
  );
};
