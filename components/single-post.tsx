"use client";

import { Post } from "@/model/post";
import Image from "next/image";
import { useState } from "react";
import { Likes } from "./likes";

type SinglePostProps = {
  post: Post;
  category: string;
} & React.ComponentProps<"article">;

export const SinglePost = ({
  post,
  className,
  category,
  ...props
}: SinglePostProps) => {
  //TO DO  const [likes, setLikes] = useState(post.likes);
  const [isLiked, setIsLiked] = useState(false);

  // const handleLike = () => {
  //   if (isLiked) {
  //     setLikes((prev) => prev - 1);
  //     setIsLiked(false);
  //   } else {
  //     setLikes((prev) => prev + 1);
  //     setIsLiked(true);
  //   }
  // };

  const formatDate = (rawDate: number) => {
    const date = new Date(rawDate);
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(date);
  };

  return (
    <article
      className={`max-w-4xl mx-auto space-y-8 ${className || ""}`}
      {...props}
    >
      {/* Categoria e Data */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <span className="text-sm font-medium px-3 py-1.5 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
          {category}
        </span>
        <time
          dateTime={String(post.createdAt)}
          className="text-sm text-slate-600 dark:text-slate-400"
        >
          {formatDate(post.createdAt)}
        </time>
      </div>

      {/* Título */}
      <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 leading-tight">
        {post.title}
      </h1>

      {/* Excerto */}
      <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
        {post.excerpt}
      </p>

      {/* Imagem da Capa */}
      <div className="relative w-full h-96 rounded-lg overflow-hidden">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Conteúdo */}
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <div className="text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
          {post.content}
        </div>
      </div>

      {/* Botão de Curtir */}
      <div className="flex items-center gap-4 pt-6 border-t border-slate-200 dark:border-slate-800">

          <Likes post={post}/>
      
      </div>
    </article>
  );
};
