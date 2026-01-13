import { Navbar } from "@/components/navbar";
import { PopularCategories } from "@/components/popular-categories";
import { Newsletter } from "@/components/newsletter";
import { verifyLogin } from "@/utils/manage-login";
import { PostList } from "@/components/post-list";

export default async function Home() {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950">
      <Navbar />

      <main className="container mx-auto px-4 py-12">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4 bg-linear-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
            Bem-vindo ao Blog
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            Descubra artigos incríveis sobre tecnologia, design e muito mais
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Coluna Esquerda - Posts */}
          <div className="lg:col-span-2 space-y-6">
            <PostList />
          </div>

          {/* Coluna Direita - Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <PopularCategories />
            <Newsletter />
          </div>
        </div>
      </main>
    </div>
  );
}
