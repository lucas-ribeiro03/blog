import Link from "next/link";

/**
 * Navbar para a seção de administração.
 * Contém apenas uma logo centralizada que leva para a página inicial.
 */
export const AdminNavbar = () => {
  return (
    <nav className="w-full h-20 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
      <div className="container mx-auto h-16 flex items-center justify-center">
        <Link
          href="/"
          className="flex items-center gap-2 text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-500 transition-colors"
          aria-label="Voltar para a página inicial"
        >
          <span className="text-5xl p-6 font-bold bg-linear-to-r bg-clip-text from-blue-500 to-purple-500 text-transparent hover:scale-110 transition">
            Blog
          </span>
        </Link>
      </div>
    </nav>
  );
};
