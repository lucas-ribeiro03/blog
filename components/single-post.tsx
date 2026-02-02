"use client";

import { Post } from "@/model/post";
import Image from "next/image";
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

      <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 leading-tight">
        {post.title}
      </h1>

      <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
        {post.excerpt}
      </p>

      <div className="relative w-full h-96 rounded-lg overflow-hidden">
        <Image
          src={post.coverImage}
          alt={post.title}
          className="object-cover w-auto h-auto"
          width={0}
          height={0}
          priority
          unoptimized
        />
      </div>

      <div className="prose prose-slate dark:prose-invert max-w-none">
        <div className="text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
          {post.content}
        </div>
      </div>

      <div className="flex items-center gap-4 pt-6 border-t border-slate-200 dark:border-slate-800">
        <Likes post={post} />
      </div>
    </article>
  );
};
